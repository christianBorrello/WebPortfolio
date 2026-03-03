import { test, expect } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";

const CLAUDE_MD_PATH = path.resolve("CLAUDE.md");

function loadClaudeMd(): string {
  return fs.readFileSync(CLAUDE_MD_PATH, "utf-8");
}

function extractTaskTrackerSection(content: string): string {
  const sectionStart = content.indexOf("## Task Tracker");
  if (sectionStart === -1) return "";

  const nextH2 = content.indexOf("\n## ", sectionStart + 1);
  return nextH2 === -1
    ? content.slice(sectionStart)
    : content.slice(sectionStart, nextH2);
}

function extractSubsection(section: string, title: string): string {
  const pattern = new RegExp(`### ${title}`, "i");
  const match = section.match(pattern);
  if (!match || match.index === undefined) return "";

  const start = match.index;
  const nextH3 = section.indexOf("\n### ", start + 1);
  return nextH3 === -1
    ? section.slice(start)
    : section.slice(start, nextH3);
}

// -------------------------------------------------------------------
// WALKING SKELETON: la sezione Task Tracker esiste e ha contenuto
// -------------------------------------------------------------------

test.describe("CLAUDE.md -- Walking Skeleton Task Tracker", () => {
  test("CLAUDE.md contiene la sezione Task Tracker con regole e sottosezioni", () => {
    expect(
      fs.existsSync(CLAUDE_MD_PATH),
      "CLAUDE.md non trovato nella root"
    ).toBe(true);

    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);

    expect(
      section.length,
      "sezione '## Task Tracker' non trovata in CLAUDE.md"
    ).toBeGreaterThan(0);

    const numberedRules = section.match(/^\d+\./gm) ?? [];
    expect(
      numberedRules.length,
      `trovate solo ${numberedRules.length} regole numerate, ne servono almeno 10`
    ).toBeGreaterThanOrEqual(10);

    const expectedSubsections = [
      "Regole",
      "Lingua",
      "Status validi",
      "Wave valide",
      "Archiviazione",
    ];

    for (const sub of expectedSubsections) {
      expect(
        section,
        `sottosezione "${sub}" non trovata nella sezione Task Tracker`
      ).toContain(`### ${sub}`);
    }
  });
});

// -------------------------------------------------------------------
// REGOLA LETTURA
// -------------------------------------------------------------------

test.describe("CLAUDE.md -- Regola Lettura", () => {

  test("la prima regola richiede la lettura di TASKS.yaml", () => {
    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);
    const rulesSubsection = extractSubsection(section, "Regole");

    const firstRuleMatch = rulesSubsection.match(/1\.\s+\*\*[^*]+\*\*:?\s*(.+)/);
    expect(
      firstRuleMatch,
      "prima regola numerata non trovata"
    ).toBeTruthy();

    const firstRule = firstRuleMatch![0].toLowerCase();
    expect(
      firstRule,
      "la prima regola non menziona la lettura di TASKS.yaml"
    ).toContain("leggi tasks.yaml");
  });
});

// -------------------------------------------------------------------
// PROTOCOLLO DI CONFERMA
// -------------------------------------------------------------------

test.describe("CLAUDE.md -- Protocollo di Conferma", () => {

  test("le istruzioni definiscono il formato di conferma per creazione task", () => {
    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);

    expect(
      section,
      "formato conferma creazione non trovato"
    ).toContain("Nuovo task rilevato:");
    expect(
      section,
      "domanda 'Registro?' non trovata"
    ).toContain("Registro?");
  });

  test("le istruzioni definiscono il formato di conferma per cambio stato", () => {
    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);

    expect(
      section,
      "formato conferma stato 'Aggiorno a' non trovato"
    ).toContain("Aggiorno a");
  });

  test("le istruzioni definiscono il formato di conferma per completamento", () => {
    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);

    expect(
      section,
      "formato conferma completamento 'Segno come done?' non trovato"
    ).toContain("Segno come done?");
  });
});

// -------------------------------------------------------------------
// REGOLA CONFERMA OBBLIGATORIA
// -------------------------------------------------------------------

test.describe("CLAUDE.md -- Conferma Obbligatoria", () => {

  test("le istruzioni richiedono conferma obbligatoria", () => {
    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);

    const lowerSection = section.toLowerCase();
    expect(
      lowerSection.includes("conferma obbligatoria") ||
        lowerSection.includes("non creare task") ||
        lowerSection.includes("non cambiare status"),
      "nessun riferimento alla conferma obbligatoria trovato"
    ).toBe(true);
  });
});

// -------------------------------------------------------------------
// REGOLE LINGUA
// -------------------------------------------------------------------

test.describe("CLAUDE.md -- Regole Lingua", () => {

  test("la sottosezione Lingua specifica italiano per contenuti e inglese per campi", () => {
    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);
    const linguaSubsection = extractSubsection(section, "Lingua");

    expect(
      linguaSubsection.length,
      "sottosezione Lingua vuota"
    ).toBeGreaterThan(0);

    const lower = linguaSubsection.toLowerCase();
    expect(
      lower.includes("italiano"),
      "sottosezione Lingua non menziona 'italiano'"
    ).toBe(true);
    expect(
      lower.includes("inglese"),
      "sottosezione Lingua non menziona 'inglese'"
    ).toBe(true);
  });
});

// -------------------------------------------------------------------
// STATUS E TRANSIZIONI
// -------------------------------------------------------------------

test.describe("CLAUDE.md -- Status e Transizioni", () => {

  test("la sottosezione Status validi elenca tutti i valori", () => {
    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);
    const statusSubsection = extractSubsection(section, "Status validi");

    const expectedStatuses = ["open", "in-progress", "blocked", "done", "cancelled"];
    for (const status of expectedStatuses) {
      expect(
        statusSubsection,
        `status "${status}" non trovato nella sottosezione Status validi`
      ).toContain(status);
    }
  });

  test("le istruzioni elencano le transizioni di stato valide", () => {
    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);

    const expectedTransitions = [
      ["open", "in-progress"],
      ["open", "cancelled"],
      ["in-progress", "done"],
      ["in-progress", "blocked"],
      ["blocked", "in-progress"],
      ["blocked", "cancelled"],
    ];

    for (const [from, to] of expectedTransitions) {
      const transitionPattern = new RegExp(
        `${from}\\s*->\\s*${to}|${from}\\s*-->\\s*${to}`,
        "i"
      );
      expect(
        transitionPattern.test(section),
        `transizione "${from} -> ${to}" non trovata`
      ).toBe(true);
    }
  });
});

// -------------------------------------------------------------------
// WAVE VALIDE
// -------------------------------------------------------------------

test.describe("CLAUDE.md -- Wave Valide", () => {

  test("la sottosezione Wave valide elenca tutti i valori", () => {
    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);
    const waveSubsection = extractSubsection(section, "Wave valide");

    const expectedWaves = [
      "brainstorm",
      "discover",
      "discuss",
      "design",
      "devops",
      "distill",
      "deliver",
      "done",
      "skipped",
    ];
    for (const wave of expectedWaves) {
      expect(
        waveSubsection,
        `wave "${wave}" non trovata nella sottosezione Wave valide`
      ).toContain(wave);
    }
  });
});

// -------------------------------------------------------------------
// ARCHIVIAZIONE
// -------------------------------------------------------------------

test.describe("CLAUDE.md -- Archiviazione", () => {

  test("la sottosezione Archiviazione definisce la convenzione", () => {
    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);
    const archiveSubsection = extractSubsection(section, "Archiviazione");

    expect(
      archiveSubsection.length,
      "sottosezione Archiviazione vuota"
    ).toBeGreaterThan(0);

    expect(
      archiveSubsection,
      "path archivio 'docs/archive/tasks-YYYY.yaml' non trovato"
    ).toContain("docs/archive/tasks-");

    const lower = archiveSubsection.toLowerCase();
    expect(
      lower.includes("spostati") || lower.includes("append-only") || lower.includes("append only"),
      "nessun riferimento a 'spostati' o 'append-only'"
    ).toBe(true);
  });
});

// -------------------------------------------------------------------
// REGOLA FILE ASSENTE
// -------------------------------------------------------------------

test.describe("CLAUDE.md -- Regola File Assente", () => {

  test("le istruzioni specificano il comportamento quando TASKS.yaml non esiste", () => {
    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);

    expect(
      section,
      "nessun riferimento a 'TASKS.yaml non esiste'"
    ).toContain("TASKS.yaml non esiste");

    const lower = section.toLowerCase();
    expect(
      lower.includes("segnala") || lower.includes("non creare"),
      "nessuna istruzione di segnalare l'assenza senza creare il file"
    ).toBe(true);
  });
});

// -------------------------------------------------------------------
// ORDINAMENTO E PUNTATORE
// -------------------------------------------------------------------

test.describe("CLAUDE.md -- Ordinamento e Puntatore", () => {

  test("le istruzioni specificano l'ordinamento per priorita'", () => {
    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);

    expect(
      section,
      "ordinamento 'high > normal > low' non trovato"
    ).toContain("high > normal > low");
  });

  test("le istruzioni indicano che TASKS.yaml e' un puntatore", () => {
    const content = loadClaudeMd();
    const section = extractTaskTrackerSection(content);

    const lower = section.toLowerCase();
    expect(
      lower.includes("puntatore") || lower.includes("non duplicare"),
      "nessun riferimento a 'puntatore' o 'non duplicare'"
    ).toBe(true);
  });
});
