# Test Scenarios -- Sistema Centralizzato di Task Tracking
# WebPortfolio -- Developer Tooling
# Wave: DISTILL -- 2026-03-03

---

## Panoramica

Scenari totali: 36
- Walking skeleton (no @skip, implementare per primi): 3
- Schema validation (@skip): 11
- Convention validation (@skip): 14
- Claude behavior (@skip, specifica documentale): 20

Rapporto scenari errore/edge: 14 su 36 (~39%) coprono casi di errore, condizioni limite o vincoli di integrita'.

---

## Struttura File

| File Feature | File Steps | Ambito | Tag |
|---|---|---|---|
| task-tracking-schema.feature | task-tracking-schema.steps.ts | Schema TASKS.yaml | @task-tracking @schema |
| task-tracking-claude-md.feature | task-tracking-claude-md.steps.ts | Istruzioni CLAUDE.md | @task-tracking @convention |
| task-tracking-behavior.feature | task-tracking-behavior.steps.ts | Comportamento Claude Code | @task-tracking @claude-behavior |

---

## Copertura per User Story

| User Story | Scenari Schema | Scenari Convention | Scenari Behavior | Totale |
|---|---|---|---|---|
| US-006 Creazione TASKS.yaml | 3 (walking skeleton + enum) | -- | -- | 3 |
| US-007 Istruzioni CLAUDE.md | -- | 15 (walking skeleton + regole) | -- | 15 |
| US-001 Lettura contesto | -- | 1 (regola lettura) | 3 (sessione, assenza, vuoto) | 4 |
| US-002 Rilevamento task | -- | 2 (conferma creazione) | 5 (implicita, esplicita, conferma, rifiuto, no-auto) | 7 |
| US-003 Aggiornamento stato | -- | 3 (conferma stato, transizioni) | 6 (in-progress, conferma, done, blocked, rifiuto, transizioni) | 9 |
| US-004 Archiviazione | -- | 1 (regola archiviazione) | 4 (archivio auto, creazione, append-only, campi) | 5 |
| US-005 Consultazione stato | 3 (ordinamento, no-done, puntatore) | 1 (ordinamento) | -- | 4 |

---

## Ordine di Implementazione

### Fase 0: Walking Skeleton (3 scenari, no @skip)

Questi scenari validano che i file esistano e siano strutturalmente corretti. Devono passare prima di qualsiasi altro lavoro.

| File | Scenario | Tag |
|---|---|---|
| task-tracking-schema.feature | TASKS.yaml esiste con metadati header e lista task | @walking-skeleton |
| task-tracking-schema.feature | Ogni task ha tutti i campi obbligatori compilati | @walking-skeleton |
| task-tracking-claude-md.feature | CLAUDE.md contiene la sezione Task Tracker con regole e sottosezioni | @walking-skeleton |

### Fase 1: Validazione Schema (@skip, abilitare uno alla volta)

| File | Scenario | Tag |
|---|---|---|
| task-tracking-schema.feature | I valori di status sono solo quelli ammessi | @schema @skip |
| task-tracking-schema.feature | I valori di priority sono solo quelli ammessi | @schema @skip |
| task-tracking-schema.feature | I valori di wave sono solo quelli ammessi | @schema @skip |
| task-tracking-schema.feature | Gli id dei task sono univoci | @schema @skip |
| task-tracking-schema.feature | Gli id seguono il formato task-NNN | @schema @skip |
| task-tracking-schema.feature | I task sono ordinati per priorita' decrescente | @schema @skip |
| task-tracking-schema.feature | Dentro la stessa priorita' i task urgenti appaiono prima | @schema @skip |
| task-tracking-schema.feature | Il campo refs e' una lista | @schema @skip |
| task-tracking-schema.feature | completed_at compilato solo per task done | @schema @skip |
| task-tracking-schema.feature | notes e' null o stringa non vuota | @schema @skip |
| task-tracking-schema.feature | Nessun task con status done nel file attivo | @schema @skip |
| task-tracking-schema.feature | Il file e' un puntatore | @schema @skip |

### Fase 2: Validazione Convention (@skip, abilitare uno alla volta)

| File | Scenario | Tag |
|---|---|---|
| task-tracking-claude-md.feature | La prima regola richiede la lettura di TASKS.yaml | @convention @skip |
| task-tracking-claude-md.feature | Formato conferma creazione task | @convention @skip |
| task-tracking-claude-md.feature | Formato conferma cambio stato | @convention @skip |
| task-tracking-claude-md.feature | Formato conferma completamento | @convention @skip |
| task-tracking-claude-md.feature | Conferma obbligatoria per ogni operazione | @convention @skip |
| task-tracking-claude-md.feature | Lingua contenuti e campi | @convention @skip |
| task-tracking-claude-md.feature | Tutti i valori status elencati | @convention @skip |
| task-tracking-claude-md.feature | Transizioni di stato valide | @convention @skip |
| task-tracking-claude-md.feature | Tutti i valori wave elencati | @convention @skip |
| task-tracking-claude-md.feature | Convenzione archiviazione | @convention @skip |
| task-tracking-claude-md.feature | Comportamento file assente | @convention @skip |
| task-tracking-claude-md.feature | Ordinamento per priorita' | @convention @skip |
| task-tracking-claude-md.feature | TASKS.yaml come puntatore | @convention @skip |

### Fase 3: Specifiche Comportamentali (@skip, documentazione contratto)

Tutti i 20 scenari in task-tracking-behavior.feature sono marcati @claude-behavior @skip. Non sono eseguibili in CI ma servono come specifica del contratto comportamentale. La validazione avviene manualmente durante le sessioni con Claude Code.

---

## Tag Strategy

| Tag | Significato | Eseguibile in CI |
|---|---|---|
| @task-tracking | Tutti gli scenari di questo feature | Si (quelli senza @skip) |
| @schema | Validazione struttura TASKS.yaml | Si |
| @convention | Validazione contenuto CLAUDE.md | Si |
| @claude-behavior | Contratto comportamentale Claude Code | No (tutti @skip) |
| @walking-skeleton | Primi scenari da far passare | Si |
| @skip | Scenario non ancora abilitato | -- |

---

## Driving Ports

I test di accettazione interagiscono con il sistema attraverso:

| Driving Port | Meccanismo Test | File |
|---|---|---|
| Filesystem (TASKS.yaml) | node:fs + js-yaml per parse e validazione schema | task-tracking-schema.steps.ts |
| Filesystem (CLAUDE.md) | node:fs per lettura e ricerca testo | task-tracking-claude-md.steps.ts |
| Comportamento Claude Code | Non testabile -- specifica documentale | task-tracking-behavior.steps.ts |

Nessun componente interno viene acceduto direttamente. I test osservano i file come li osserverebbe Christian nell'IDE.

---

## Mandate Compliance Evidence

### CM-A: Driving Port Usage

```
task-tracking-schema.steps.ts: import * as fs from "node:fs"
task-tracking-schema.steps.ts: import * as yaml from "js-yaml"
task-tracking-claude-md.steps.ts: import * as fs from "node:fs"
```

Tutti i test operano attraverso il filesystem (driving port). Nessun accesso a componenti interni.

### CM-B: Zero Technical Terms in .feature Files

I file .feature contengono solo linguaggio di dominio in italiano. Nessun riferimento a API, HTTP, database, funzioni o classi.

### CM-C: Walking Skeleton + Focused Scenario Count

- Walking skeleton: 3 scenari
- Scenari focalizzati schema: 11
- Scenari focalizzati convention: 14
- Scenari comportamentali (documentazione): 20
- Totale: 36 scenari (48 se contati per step)
