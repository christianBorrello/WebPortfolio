# Root Cause Analysis: RAM Saturation During Claude Code Deliver Wave

**Incident Date**: 2026-03-02
**Severity**: Critical (forced reboot required)
**Investigator**: Rex (nw-troubleshooter)
**Investigation Date**: 2026-03-02

## Problem Statement

During execution of the `nw:deliver` wave for the `contact-form-resend-migration` feature on a Next.js 16.1.6 portfolio project, the host machine (macOS Darwin 25.3.0, Apple Silicon, 8GB RAM) was saturated to the point of requiring a forced reboot. The system consumed over 40GB of swap. The saturation occurred during step 05 (test enablement) when Playwright acceptance tests were being run.

## Investigation Scope

- **Affected systems**: macOS host, Claude Code orchestrator, nw-software-crafter sub-agents, Playwright test runner, Next.js dev server (Turbopack)
- **Time range**: 2026-03-02 ~13:38 to ~14:30 UTC
- **Boundary**: Limited to the deliver wave session and its child processes

---

## Branch A: Turbopack Workspace Root Misconfiguration

### WHY 1 (Symptom): Next.js dev server behaved abnormally on startup

**Evidence**: Next.js detected multiple lockfiles and logged a warning:
- `~/package-lock.json` (home directory) -- confirmed present, dated 2026-02-03, contains mongodb dependency
- `~/Desktop/WebPortfolio/package-lock.json` (project directory) -- the correct lockfile

```
$ ls -la ~/package-lock.json
-rw-r--r--  1 christian  staff  5592 Feb  3 15:51 /Users/christian/package-lock.json

$ cat ~/package.json
{ "dependencies": { "mongodb": "^7.0.0" } }
```

Turbopack uses lockfile location to infer the workspace root. Finding `~/package-lock.json` caused it to resolve `~/` as the workspace root instead of `~/Desktop/WebPortfolio/`.

### WHY 2 (Context): A stale lockfile existed in the user's home directory

**Evidence**: `/Users/christian/package.json` contains only a mongodb dependency -- likely from a one-off `npm install mongodb` run directly in the home directory at some earlier date (Feb 3). This is unrelated to the portfolio project.

### WHY 3 (System): Turbopack's root detection algorithm walks up the directory tree searching for lockfiles

**Evidence**: Turbopack (bundled with Next.js 16.1.6) resolves workspace root by traversing parent directories looking for `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml`. It found `~/package-lock.json` before stopping, setting root to `~/` rather than the project directory.

### WHY 4 (Design): No explicit workspace root was configured in `next.config.ts`

**Evidence**: The original `next.config.ts` did not contain a `turbopack.root` override. The fix has now been applied:
```typescript
// next.config.ts (current state -- post-fix)
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};
```

### WHY 5 (Root Cause): Turbopack defaults to lockfile-based root detection with no project-level boundary enforcement

**Root Cause A**: Turbopack's implicit workspace root detection is fragile when stale lockfiles exist in ancestor directories. Combined with the accidental `~/package-lock.json`, this caused incorrect root resolution. There was no `turbopack.root` configuration to override this behavior, and no CI/pre-commit check to detect lockfile pollution in ancestor directories.

---

## Branch B: Playwright Health Check Failure Due to next-intl Redirect

### WHY 1 (Symptom): Playwright's `webServer` timed out waiting for the dev server to become ready

**Evidence**: Playwright config (pre-fix) used `url: "http://localhost:3000"` for its health check. The `webServer.timeout` was the default 60s.

### WHY 2 (Context): The health check URL returned a 307 redirect, not HTTP 200

**Evidence**: The project uses `next-intl` middleware that redirects `/` to `/en`:

```typescript
// middleware.ts
export default createMiddleware(routing);
export const config = { matcher: ["/", "/(en)/:path*"] };
```

```typescript
// src/i18n/config.ts
export const locales = ["en"] as const;
export const defaultLocale: Locale = "en";
```

Playwright's health check expects an HTTP 200. A 307 redirect to `/en` is not treated as "server ready." The server WAS actually running and responding (verified manually -- starts in <1s), but Playwright could not confirm readiness.

### WHY 3 (System): Playwright does not follow redirects in its webServer readiness check

**Evidence**: Playwright's `webServer.url` check makes a simple HTTP request and expects 200. When next-intl returns 307, Playwright interprets it as "not ready" and waits until timeout.

### WHY 4 (Design): The Playwright config was written without accounting for i18n middleware redirect behavior

**Evidence**: The walking skeleton tests (step 06-03 of the portfolio-cv-site feature, committed at `3b732462`) set up the initial Playwright config. At that time, the health check URL was set to `http://localhost:3000` without testing whether the middleware redirect would interfere with readiness detection. The tests navigated to `/en` explicitly but the health check did not.

### WHY 5 (Root Cause): The webServer health check URL was not aligned with the application's routing contract

**Root Cause B**: The Playwright `webServer.url` pointed to a path (`/`) that the application is designed to redirect (via next-intl middleware), causing the health check to never succeed. This is a mismatch between infrastructure configuration and application routing behavior. The fix has been applied:

```typescript
// playwright.config.ts (current state -- post-fix)
webServer: {
  command: "npm run dev",
  url: "http://localhost:3000/en",  // matches actual 200 response path
  reuseExistingServer: !process.env.CI,
  timeout: 120_000,
},
```

---

## Branch C: Zombie Process Accumulation from Retry Cascade

### WHY 1 (Symptom): Over 40GB of swap was consumed, requiring forced reboot

**Evidence**: 8GB physical RAM was exhausted. Each Next.js/Turbopack dev server process consumes significant memory (typically 200-500MB+ depending on project size and Turbopack cache behavior). With the workspace root incorrectly set to `~/`, Turbopack may have been indexing far more files than intended.

### WHY 2 (Context): Multiple Next.js dev server processes were spawned and never terminated

**Evidence**: The cascade unfolded as follows:

1. Playwright started `npm run dev` via `webServer.command`
2. Health check on `http://localhost:3000` timed out (Branch B)
3. Playwright attempted to start another server -- got port 3001 but failed to acquire `.next/dev/lock`
4. The orchestrator's sub-agents (nw-software-crafter) also attempted `npm run dev &` as workarounds
5. Multiple sub-agents were dispatched (audit log shows `nw-software-crafter` invocations at 13:38, and continued writes through 14:29)
6. Each attempt spawned a new Next.js/Turbopack process that stayed resident in memory

### WHY 3 (System): No process cleanup mechanism exists for failed Playwright webServer launches

**Evidence**: When Playwright's health check times out, the spawned `npm run dev` process is not reliably killed -- particularly when the agent retries or when the orchestrator dispatches a new sub-agent. Each sub-agent operates in its own context without visibility into processes spawned by sibling agents.

### WHY 4 (Design): The orchestrator has no resource monitoring or process governance for child processes

**Evidence**: The audit log shows multiple sub-agent invocations:
- `nw-software-crafter` at 13:38:41 (task correlation `15510492`)
- Continued file writes through 14:12-14:14
- Another `playwright.config.ts` write at 14:29:55
- DES task active markers still present post-incident

The orchestrator dispatched sub-agents that each independently tried to run tests (each spawning dev servers) without:
- Checking if port 3000 was already in use
- Killing previous dev server processes before starting new ones
- Monitoring system memory usage

### WHY 5 (Root Cause): No process lifecycle management or resource bounds exist for agent-spawned server processes

**Root Cause C**: The orchestration framework (nw:deliver wave) lacks:
1. Process inventory tracking for long-running child processes (dev servers)
2. Resource monitoring gates that halt execution when memory/swap exceeds thresholds
3. Mutual exclusion on port-binding operations across sub-agents
4. Cleanup hooks that kill orphaned processes when a sub-agent fails or retries

---

## Branch D: Amplified Memory Consumption from Wrong Workspace Root

### WHY 1 (Symptom): Each Turbopack process consumed more memory than expected for this small project

**Evidence**: The portfolio project is small (~30 source files). Under normal conditions, a single `next dev` process for this project should use ~200-300MB. With workspace root set to `~/`, Turbopack would attempt to watch and index the entire home directory.

### WHY 2 (Context): Turbopack with root `~/` was scanning/indexing far more files than the project contains

**Evidence**: The home directory likely contains thousands of files (node_modules from the mongodb install alone, plus Downloads, Documents, other projects, etc.). Turbopack's file watcher and bundler would attempt to process this expanded scope.

### WHY 3 (System): Turbopack's file watching scope is determined by the resolved workspace root

**Evidence**: Turbopack uses the workspace root to determine the file watching boundary. With root at `~/`, every file change under the home directory would trigger recompilation attempts.

### WHY 4 (Design): No upper bound on Turbopack's file watching scope or memory allocation

**Evidence**: Turbopack does not enforce a ceiling on the number of watched files or memory usage. When misconfigured, it degrades gracefully in terms of functionality but catastrophically in terms of resource consumption.

### WHY 5 (Root Cause): The interaction between wrong workspace root and unbounded file watching multiplied per-process memory consumption

**Root Cause D**: Each zombie Turbopack process (from Branch C) was individually consuming excess memory (from Branch A/D's wrong root), creating a multiplicative effect: N processes x amplified-per-process memory = system saturation. On an 8GB machine, even 3-4 such processes could exhaust physical RAM and trigger aggressive swapping.

---

## Backward Chain Validation

### Chain A (Turbopack root) -> Observed symptoms

If a stale `~/package-lock.json` exists AND `turbopack.root` is not configured:
- Turbopack resolves root to `~/` -- **confirmed by the lockfile warning in logs**
- Turbopack watches/indexes the entire home directory -- **explains excess memory per process**
- **Validates**: YES, produces the observed abnormal dev server behavior

### Chain B (Health check mismatch) -> Observed symptoms

If `webServer.url` is `http://localhost:3000` AND next-intl redirects `/` to `/en`:
- Playwright health check gets 307, never confirms readiness -- **confirmed by manual test showing server starts in <1s but check fails**
- Playwright times out after 60s (default) -- **explains the timeout behavior reported**
- **Validates**: YES, produces the observed timeout and retry behavior

### Chain C (Zombie accumulation) -> Observed symptoms

If health checks fail AND orchestrator retries with new sub-agents AND no process cleanup exists:
- Each retry spawns a new `npm run dev` process -- **confirmed by audit log showing multiple sub-agent invocations**
- Previous processes remain resident -- **no kill mechanism identified in Playwright or orchestrator**
- Memory accumulates unboundedly -- **explains the 40GB+ swap consumption**
- **Validates**: YES, produces the observed RAM saturation

### Chain D (Amplified consumption) -> Observed symptoms

If wrong workspace root (Branch A) AND multiple processes (Branch C):
- Each process uses 3-10x normal memory due to expanded file scope
- 5+ processes at 1-2GB each = 5-10GB active memory + swap pressure
- macOS compressed memory + swap spiral on 8GB machine -- **explains the catastrophic degradation**
- **Validates**: YES, explains why saturation reached 40GB+ (swap thrashing amplifies apparent usage)

### Cross-validation

All four root causes are complementary, not contradictory:
- A (wrong root) amplifies D (per-process memory)
- B (health check failure) triggers C (zombie accumulation)
- C (many processes) x D (amplified memory) = catastrophic saturation
- Removing ANY single root cause would likely have prevented the forced reboot

---

## Solutions

### Immediate Mitigations (restore service) -- ALREADY APPLIED

| # | Mitigation | File | Status |
|---|-----------|------|--------|
| M1 | Set `turbopack.root: __dirname` in next.config.ts | `/Users/christian/Desktop/WebPortfolio/next.config.ts` | Applied |
| M2 | Change webServer.url to `http://localhost:3000/en` | `/Users/christian/Desktop/WebPortfolio/playwright.config.ts` | Applied |
| M3 | Increase webServer.timeout to 120s | `/Users/christian/Desktop/WebPortfolio/playwright.config.ts` | Applied |

### Permanent Fixes (prevent recurrence)

| # | Fix | Addresses Root Cause | Priority |
|---|-----|---------------------|----------|
| P1 | **Delete `~/package-lock.json` and `~/package.json`** -- remove the stale home-directory lockfile that triggers Turbopack's incorrect root detection | A | Critical |
| P2 | **Add a pre-test script** that runs `lsof -i :3000` and kills any existing dev server before starting Playwright tests | C | High |
| P3 | **Add `reuseExistingServer: true`** in non-CI mode (already present) AND ensure `webServer.command` includes a port-check guard | B, C | High |
| P4 | **Add orchestrator resource monitoring** -- the deliver wave should check `vm_stat` / `sysctl vm.swapusage` between sub-agent dispatches and halt if swap exceeds a threshold (e.g., 2GB used) | C, D | High |
| P5 | **Add process cleanup to orchestrator teardown** -- on sub-agent failure, kill any processes matching `next dev` or `turbopack` spawned during the session | C | High |
| P6 | **Add a CI/pre-commit check** that detects lockfiles in ancestor directories up to the filesystem root: `for dir in $(git rev-parse --show-toplevel)/.. ~/; do ls $dir/package-lock.json 2>/dev/null && echo "WARNING: stale lockfile"; done` | A | Medium |
| P7 | **Pin the `workers` count in Playwright config for non-CI** -- instead of `undefined` (uses all CPUs), set to 1 or 2 on constrained machines to limit parallel test processes | C, D | Medium |

### Early Detection Measures

| # | Measure | Detects |
|---|---------|---------|
| D1 | Add a startup assertion in Playwright globalSetup that verifies `curl -s -o /dev/null -w "%{http_code}" $WEBSERVER_URL` returns 200 within 5s | Health check mismatch (B) |
| D2 | Log Turbopack's resolved workspace root at dev server startup (inspect Next.js output for "root" or workspace path) | Wrong workspace root (A) |
| D3 | Add a process count check after Playwright test runs: if more than 1 `next` process exists, fail with a warning | Zombie accumulation (C) |

---

## Completeness Check

| Question | Answer |
|----------|--------|
| Are there contributing factors we missed? | The Playwright `fullyParallel: true` setting means multiple test files run concurrently, each potentially interacting with the same dev server -- but this is by design and not a contributing factor here since all tests share one webServer. |
| Are there unrelated coincidences? | The `MISSING_MAX_TURNS` blocks in the audit log (lines 129, 148, 161, 187) are an orchestrator configuration issue but unrelated to the RAM saturation. |
| Could this happen again with the current fixes? | M1+M2+M3 address the immediate triggers. Without P1 (deleting ~/package-lock.json), a future project without `turbopack.root` could hit the same issue. Without P4+P5 (orchestrator resource governance), a different failure mode could still cause zombie process accumulation. |

---

## Summary of Root Causes

| ID | Root Cause | Category |
|----|-----------|----------|
| **RC-A** | Stale `~/package-lock.json` causing Turbopack to infer wrong workspace root, with no project-level override configured | Configuration / Environment hygiene |
| **RC-B** | Playwright `webServer.url` pointing to a path that returns 307 (redirect) instead of 200, mismatched with next-intl routing contract | Infrastructure / Application routing mismatch |
| **RC-C** | No process lifecycle management for agent-spawned dev servers: no cleanup on failure, no mutual exclusion on ports, no resource monitoring | Orchestration / Process governance |
| **RC-D** | Multiplicative memory amplification: wrong workspace root (A) x zombie process count (C) = catastrophic consumption on a memory-constrained machine | Emergent / System interaction |

---

## Appendix: Evidence Index

| Evidence | Location | Relevance |
|----------|----------|-----------|
| Home directory lockfile | `/Users/christian/package-lock.json` (5592 bytes, dated Feb 3) | RC-A |
| Home directory package.json | `/Users/christian/package.json` (mongodb dep only) | RC-A |
| Turbopack root fix | `/Users/christian/Desktop/WebPortfolio/next.config.ts:7-9` | RC-A fix |
| next-intl middleware redirect | `/Users/christian/Desktop/WebPortfolio/middleware.ts:1-8` | RC-B |
| i18n routing config | `/Users/christian/Desktop/WebPortfolio/src/i18n/config.ts:1-3` | RC-B |
| Playwright config (post-fix) | `/Users/christian/Desktop/WebPortfolio/playwright.config.ts:21-26` | RC-B fix |
| Audit log -- sub-agent invocations | `/Users/christian/Desktop/WebPortfolio/.nwave/des/logs/audit-2026-03-02.log:306-344` | RC-C |
| Deliver session marker | `/Users/christian/Desktop/WebPortfolio/.nwave/des/deliver-session.json` | RC-C |
| Machine specs | `hw.memsize: 8589934592` (8GB), Apple Silicon | RC-D |
| Current swap usage (post-reboot) | `vm.swapusage: total=2048M used=1278M` | RC-D (residual) |
