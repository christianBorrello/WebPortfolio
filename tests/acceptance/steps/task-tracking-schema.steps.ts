import { test, expect } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";
import * as yaml from "js-yaml";

const TASKS_PATH = path.resolve("TASKS.yaml");

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  wave: string;
  created: string;
  updated: string;
  context: string;
  refs?: string[];
  completed_at?: string | null;
  notes?: string | null;
}

interface TasksFile {
  schema_version: string;
  last_updated: string;
  updated_by: string;
  tasks: Task[];
}

const VALID_STATUSES = ["open", "in-progress", "blocked", "done", "cancelled"];
const VALID_PRIORITIES = ["high", "normal", "low"];
const VALID_WAVES = [
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
const PRIORITY_ORDER: Record<string, number> = { high: 0, normal: 1, low: 2 };
const STATUS_URGENCY: Record<string, number> = {
  "in-progress": 0,
  open: 1,
  blocked: 2,
  done: 3,
  cancelled: 4,
};
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ISO_DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
const TASK_ID_PATTERN = /^task-\d+$/;

function loadTasksFile(): TasksFile {
  const content = fs.readFileSync(TASKS_PATH, "utf-8");
  return yaml.load(content) as TasksFile;
}

// -------------------------------------------------------------------
// WALKING SKELETON: struttura base e campi obbligatori
// -------------------------------------------------------------------

test.describe("Schema TASKS.yaml -- Walking Skeleton", () => {
  test("TASKS.yaml esiste con metadati header e lista task", () => {
    expect(fs.existsSync(TASKS_PATH), "TASKS.yaml non trovato nella root").toBe(
      true
    );

    const data = loadTasksFile();

    expect(data.schema_version).toBe("1.0");

    expect(
      data.last_updated,
      "last_updated non e' in formato ISO 8601 con timezone"
    ).toMatch(ISO_DATETIME_PATTERN);

    expect(
      ["claude-code", "christian"],
      "updated_by non e' un valore valido"
    ).toContain(data.updated_by);

    expect(
      Array.isArray(data.tasks),
      "tasks non e' una lista"
    ).toBe(true);
    expect(
      data.tasks.length,
      "tasks e' vuoto -- servono almeno un elemento"
    ).toBeGreaterThan(0);
  });

  test("ogni task ha tutti i campi obbligatori compilati", () => {
    const data = loadTasksFile();

    for (const task of data.tasks) {
      expect(task.id, `task senza id`).toBeTruthy();
      expect(task.id, `id "${task.id}" non segue il formato task-NNN`).toMatch(
        TASK_ID_PATTERN
      );

      expect(task.title, `${task.id}: title vuoto`).toBeTruthy();
      expect(task.title.length, `${task.id}: title troppo corto`).toBeGreaterThan(0);

      expect(
        VALID_STATUSES,
        `${task.id}: status "${task.status}" non valido`
      ).toContain(task.status);

      expect(
        VALID_PRIORITIES,
        `${task.id}: priority "${task.priority}" non valida`
      ).toContain(task.priority);

      expect(
        VALID_WAVES,
        `${task.id}: wave "${task.wave}" non valida`
      ).toContain(task.wave);

      expect(
        task.created,
        `${task.id}: created non e' in formato ISO 8601`
      ).toMatch(ISO_DATE_PATTERN);

      expect(
        task.updated,
        `${task.id}: updated non e' in formato ISO 8601`
      ).toMatch(ISO_DATE_PATTERN);

      expect(task.context, `${task.id}: context vuoto`).toBeTruthy();
      expect(
        task.context.length,
        `${task.id}: context troppo corto`
      ).toBeGreaterThan(0);
    }
  });
});

// -------------------------------------------------------------------
// VALORI ENUM
// -------------------------------------------------------------------

test.describe("Schema TASKS.yaml -- Valori Enum", () => {

  test("i valori di status sono solo quelli ammessi", () => {
    const data = loadTasksFile();
    for (const task of data.tasks) {
      expect(
        VALID_STATUSES,
        `${task.id}: status "${task.status}" non riconosciuto`
      ).toContain(task.status);
    }
  });

  test("i valori di priority sono solo quelli ammessi", () => {
    const data = loadTasksFile();
    for (const task of data.tasks) {
      expect(
        VALID_PRIORITIES,
        `${task.id}: priority "${task.priority}" non riconosciuta`
      ).toContain(task.priority);
    }
  });

  test("i valori di wave sono solo quelli ammessi", () => {
    const data = loadTasksFile();
    for (const task of data.tasks) {
      expect(
        VALID_WAVES,
        `${task.id}: wave "${task.wave}" non riconosciuta`
      ).toContain(task.wave);
    }
  });
});

// -------------------------------------------------------------------
// FORMATO ID
// -------------------------------------------------------------------

test.describe("Schema TASKS.yaml -- Formato ID", () => {

  test("gli id dei task sono univoci", () => {
    const data = loadTasksFile();
    const ids = data.tasks.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(
      uniqueIds.size,
      `id duplicati trovati: ${ids.filter((id, i) => ids.indexOf(id) !== i).join(", ")}`
    ).toBe(ids.length);
  });

  test("gli id seguono il formato task-NNN", () => {
    const data = loadTasksFile();
    for (const task of data.tasks) {
      expect(
        task.id,
        `id "${task.id}" non corrisponde al pattern task-NNN`
      ).toMatch(TASK_ID_PATTERN);
    }
  });
});

// -------------------------------------------------------------------
// ORDINAMENTO
// -------------------------------------------------------------------

test.describe("Schema TASKS.yaml -- Ordinamento", () => {

  test("i task sono ordinati per priorita' decrescente", () => {
    const data = loadTasksFile();
    for (let i = 1; i < data.tasks.length; i++) {
      const prevOrder = PRIORITY_ORDER[data.tasks[i - 1].priority];
      const currOrder = PRIORITY_ORDER[data.tasks[i].priority];
      expect(
        currOrder,
        `${data.tasks[i].id} (${data.tasks[i].priority}) appare dopo ${data.tasks[i - 1].id} (${data.tasks[i - 1].priority}) -- ordine violato`
      ).toBeGreaterThanOrEqual(prevOrder);
    }
  });

  test("dentro la stessa priorita' i task urgenti appaiono prima", () => {
    const data = loadTasksFile();
    const byPriority = new Map<string, Task[]>();
    for (const task of data.tasks) {
      const group = byPriority.get(task.priority) ?? [];
      group.push(task);
      byPriority.set(task.priority, group);
    }

    for (const [priority, tasks] of Array.from(byPriority.entries())) {
      if (tasks.length < 2) continue;
      for (let i = 1; i < tasks.length; i++) {
        const prevUrgency = STATUS_URGENCY[tasks[i - 1].status] ?? 99;
        const currUrgency = STATUS_URGENCY[tasks[i].status] ?? 99;
        expect(
          currUrgency,
          `${tasks[i].id} (${tasks[i].status}) appare dopo ${tasks[i - 1].id} (${tasks[i - 1].status}) nella priorita' ${priority} -- urgenza violata`
        ).toBeGreaterThanOrEqual(prevUrgency);
      }
    }
  });
});

// -------------------------------------------------------------------
// CAMPI OPZIONALI
// -------------------------------------------------------------------

test.describe("Schema TASKS.yaml -- Campi Opzionali", () => {

  test("il campo refs e' una lista", () => {
    const data = loadTasksFile();
    for (const task of data.tasks) {
      expect(
        Array.isArray(task.refs),
        `${task.id}: refs non e' una lista`
      ).toBe(true);
      for (const ref of task.refs ?? []) {
        expect(
          typeof ref,
          `${task.id}: ref non e' una stringa`
        ).toBe("string");
        expect(ref.length, `${task.id}: ref vuoto`).toBeGreaterThan(0);
      }
    }
  });

  test("completed_at e' compilato solo per task done", () => {
    const data = loadTasksFile();
    for (const task of data.tasks) {
      if (task.status === "done") {
        expect(
          task.completed_at,
          `${task.id}: status done ma completed_at non compilato`
        ).toBeTruthy();
        expect(
          task.completed_at,
          `${task.id}: completed_at non e' in formato ISO 8601`
        ).toMatch(ISO_DATE_PATTERN);
      } else {
        expect(
          task.completed_at,
          `${task.id}: status "${task.status}" ma completed_at compilato`
        ).toBeNull();
      }
    }
  });

  test("notes e' null o una stringa non vuota", () => {
    const data = loadTasksFile();
    for (const task of data.tasks) {
      if (task.notes !== null && task.notes !== undefined) {
        expect(
          typeof task.notes,
          `${task.id}: notes non e' una stringa`
        ).toBe("string");
        expect(
          task.notes.length,
          `${task.id}: notes e' una stringa vuota`
        ).toBeGreaterThan(0);
      }
    }
  });
});

// -------------------------------------------------------------------
// INTEGRITA'
// -------------------------------------------------------------------

test.describe("Schema TASKS.yaml -- Integrita'", () => {

  test("nessun task con status done nel file attivo", () => {
    const data = loadTasksFile();
    const doneTasks = data.tasks.filter((t) => t.status === "done");
    expect(
      doneTasks.length,
      `task con status done trovati: ${doneTasks.map((t) => t.id).join(", ")}`
    ).toBe(0);
  });

  test("il file e' un puntatore e non contiene dettagli di roadmap", () => {
    const data = loadTasksFile();
    const roadmapPatterns = [
      /acceptance criter/i,
      /\d+%/,
      /step \d+/i,
      /fase \d+/i,
    ];

    for (const task of data.tasks) {
      for (const pattern of roadmapPatterns) {
        expect(
          pattern.test(task.context),
          `${task.id}: context contiene dettagli di roadmap ("${task.context.substring(0, 50)}...")`
        ).toBe(false);
      }
    }
  });
});
