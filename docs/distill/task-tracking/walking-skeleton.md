# Walking Skeleton -- Sistema Centralizzato di Task Tracking
# WebPortfolio -- Developer Tooling
# Wave: DISTILL -- 2026-03-03

---

## Scopo

Il walking skeleton del task tracking valida che i due artefatti fondamentali (TASKS.yaml e CLAUDE.md) esistano e siano strutturalmente conformi allo schema definito nel design. Se il walking skeleton fallisce, i file non sono pronti e nessun altro scenario ha senso.

---

## Scenari Walking Skeleton

Tre scenari senza @skip. Devono passare tutti prima di abilitare qualsiasi altro scenario.

### 1. TASKS.yaml esiste con metadati header e lista task

**File**: `tests/acceptance/task-tracking-schema.feature`
**Cosa dimostra**: Il file TASKS.yaml esiste nella root, e' YAML valido, ha schema_version 1.0, last_updated in ISO 8601, updated_by valido, e una lista tasks non vuota.
**Azione test**: Lettura filesystem con node:fs, parse con js-yaml, asserzioni sui campi header.

### 2. Ogni task ha tutti i campi obbligatori compilati

**File**: `tests/acceptance/task-tracking-schema.feature`
**Cosa dimostra**: Ogni task nella lista ha id (formato task-NNN), title, status, priority, wave, created, updated, context tutti compilati con formati corretti.
**Azione test**: Iterazione sulla lista tasks, validazione pattern e non-vuotezza per ogni campo obbligatorio.

### 3. CLAUDE.md contiene la sezione Task Tracker con regole e sottosezioni

**File**: `tests/acceptance/task-tracking-claude-md.feature`
**Cosa dimostra**: CLAUDE.md esiste, contiene una sezione "## Task Tracker" con almeno 10 regole numerate e tutte le sottosezioni richieste (Regole, Lingua, Status validi, Wave valide, Archiviazione).
**Azione test**: Lettura filesystem, ricerca testo per sezione e sottosezioni, conteggio regole numerate.

---

## Ordine di Esecuzione

```
1. TASKS.yaml esiste con metadati  <-- prerequisito per tutti gli scenari schema
2. Ogni task ha campi obbligatori  <-- prova la conformita' dello schema
3. CLAUDE.md ha sezione completa   <-- prova che le istruzioni sono presenti
```

---

## Cosa Significa "Passato"

Il walking skeleton e' completo quando:

1. TASKS.yaml esiste nella root con schema_version "1.0" e almeno un task
2. Ogni task ha tutti i campi obbligatori in formato corretto
3. CLAUDE.md contiene la sezione "## Task Tracker" con 10+ regole e 5 sottosezioni

Dopo questi 3 scenari, la struttura e' validata. Si procede abilitando uno scenario @skip alla volta dalla Fase 1 (schema validation).

---

## Prerequisiti

Per far passare il walking skeleton, la wave DELIVER deve creare:

1. `/TASKS.yaml` -- file con schema completo e task attivi dalla Discovery
2. `/CLAUDE.md` -- file con sezione "## Task Tracker" e blocco istruzioni dalla sezione 3 del design
3. `/docs/archive/tasks-2026.yaml` -- file con task-000 (done, archiviato)

Questi sono i 3 artefatti definiti nel design (sezione 6).
