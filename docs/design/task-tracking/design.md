# Design -- Sistema Centralizzato di Task Tracking

Wave: DESIGN -- 2026-03-03
Tipo: Infrastructure (developer tooling)
Autore: Morgan (solution-architect)

---

## 1. Panoramica

Tre artefatti da creare/modificare:

| Artefatto | Path | Operazione |
|---|---|---|
| TASKS.yaml | `/TASKS.yaml` | Creare |
| CLAUDE.md | `/CLAUDE.md` | Creare (sezione Task Tracker) |
| File archivio | `/docs/archive/tasks-YYYY.yaml` | Creare al primo completamento |

Nessun codice applicativo. Nessuna dipendenza. Nessun componente runtime.

---

## 2. Schema Definitivo TASKS.yaml

### 2.1 Struttura completa

```yaml
# TASKS.yaml -- Tracker centralizzato dei task per WebPortfolio
# Gestito da Claude Code con conferma di Christian.
# Contenuti in italiano. Campi e valori enum in inglese.
# Ordinato per priorita' decrescente: high > normal > low.
# Puntatore: titolo + status + refs. Non duplicare roadmap.

schema_version: "1.0"
last_updated: "2026-03-03T14:00:00Z"
updated_by: "claude-code"       # "claude-code" | "christian"

tasks:
  # --- high ---
  - id: task-003
    title: "Correggere bug form contatto con caratteri speciali nel campo nome"
    status: in-progress
    priority: high
    wave: deliver
    created: "2026-03-03"
    updated: "2026-03-03"
    context: "Segnalato durante test manuale: i caratteri accentati nel nome causano encoding errato nell'email"
    refs:
      - src/app/api/contact/route.ts
    completed_at: null
    notes: null

  # --- normal ---
  - id: task-004
    title: "Valutare aggiunta dark mode toggle"
    status: open
    priority: normal
    wave: brainstorm
    created: "2026-03-03"
    updated: "2026-03-03"
    context: "Idea emersa durante review del design. Da valutare se aggiunge valore reale."
    refs: []
    completed_at: null
    notes: null

  # --- low ---
  - id: task-002
    title: "Aggiungere versione tedesca del portfolio"
    status: open
    priority: low
    wave: brainstorm
    created: "2026-03-03"
    updated: "2026-03-03"
    context: "Possibile espansione dopo il completamento della localizzazione italiana"
    refs:
      - docs/feature/italian-localization/
    completed_at: null
    notes: null
```

### 2.2 Definizione dei campi

| Campo | Tipo | Obbligatorio | Descrizione |
|---|---|---|---|
| `id` | `string` | Si | Formato `task-NNN`. Auto-incrementale (max esistente + 1). |
| `title` | `string` | Si | Una frase concisa in italiano. Max ~80 caratteri. |
| `status` | `enum` | Si | Vedi sezione 2.3. |
| `priority` | `enum` | Si | `high` / `normal` / `low`. |
| `wave` | `enum` | Si | Vedi sezione 2.4. |
| `created` | `date` | Si | Formato ISO 8601: `YYYY-MM-DD`. |
| `updated` | `date` | Si | Formato ISO 8601: `YYYY-MM-DD`. Aggiornato ad ogni modifica. |
| `context` | `string` | Si | Come/perche' e' nato il task. In italiano, linguaggio naturale. |
| `refs` | `list[string]` | No | Path relativi alla root. Lista vuota `[]` se assenti. |
| `completed_at` | `date/null` | No | Compilato solo quando status diventa `done`. |
| `notes` | `string/null` | No | Note aggiuntive in italiano (motivo blocco, decisioni, etc.). |

### 2.3 Valori status e transizioni valide

**Valori**: `open`, `in-progress`, `blocked`, `done`, `cancelled`

**Transizioni**:

```
open ---------> in-progress
open ---------> cancelled

in-progress --> done
in-progress --> blocked

blocked ------> in-progress
blocked ------> cancelled
```

Transizioni non elencate sopra sono invalide. Ogni transizione richiede conferma di Christian.

Il completamento (`done`) attiva automaticamente l'archiviazione (senza seconda conferma).

**Task cancellati**: I task con status `cancelled` restano in TASKS.yaml come documentazione della decisione. Non vengono archiviati. Se un task e' stato creato per errore, usare `cancelled` con una nota nel campo `notes` che spiega il motivo. Per rimuovere completamente un task (errore grave), richiedere conferma esplicita di Christian e usare git per il rollback.

### 2.4 Valori wave

`brainstorm` | `discover` | `discuss` | `design` | `devops` | `distill` | `deliver` | `done` | `skipped`

- La wave `done` si imposta insieme allo status `done`.
- La wave `skipped` indica che un task ha saltato una wave specifica (es. nessun devops necessario).
- La wave e' indipendente dallo status: un task puo' essere `blocked` in wave `design`.

### 2.5 Metadati header

| Campo | Tipo | Descrizione |
|---|---|---|
| `schema_version` | `string` | Sempre `"1.0"` per ora. |
| `last_updated` | `datetime` | ISO 8601 con timezone: `YYYY-MM-DDTHH:MM:SSZ`. |
| `updated_by` | `string` | `"claude-code"` o `"christian"`. |

### 2.6 Regole di ordinamento

1. **Per priorita' decrescente**: `high` > `normal` > `low`
2. **Dentro la stessa priorita'**: task piu' urgenti prima (status `in-progress` prima di `open`, `blocked` dopo `open`)
3. **Commenti separatori**: `# --- high ---`, `# --- normal ---`, `# --- low ---` prima di ogni blocco
4. L'ordine viene mantenuto ad ogni modifica del file

---

## 3. Istruzioni CLAUDE.md

Blocco di testo esatto da inserire in CLAUDE.md (progetto-livello, `/CLAUDE.md`).

```markdown
## Task Tracker

Il file `TASKS.yaml` nella root e' il tracker centralizzato dei task.

### Regole

1. **Leggi TASKS.yaml all'inizio di ogni sessione** per capire il quadro d'insieme.
2. **Conferma obbligatoria per OGNI operazione**. Non creare task e non cambiare status senza conferma esplicita di Christian.
3. **Formato conferma creazione**: `Nuovo task rilevato: "[titolo]". Registro?`
4. **Formato conferma stato**: `task-NNN "[titolo]" e' [status_attuale]. Aggiorno a [nuovo_status]?`
5. **Formato conferma completamento**: `task-NNN "[titolo]" completato. Segno come done?`
6. **Dopo conferma completamento**: archivia il task in `docs/archive/tasks-YYYY.yaml` (anno corrente). Messaggio: `task-NNN archiviato in docs/archive/tasks-YYYY.yaml.`
7. **Mantieni ordine per priorita'**: high > normal > low. Dentro la stessa priorita', i task piu' urgenti prima.
8. **ID auto-incrementale**: il prossimo id e' `task-NNN` dove NNN = max id esistente + 1.
9. **Aggiorna `last_updated` e `updated_by`** ad ogni modifica.
10. **TASKS.yaml e' un puntatore**: titolo + status + refs. Non duplicare contenuti dei roadmap o altri file.

### Lingua

Contenuti (titoli, contesto, note): **italiano**.
Campi YAML e valori enum (status, priority, wave): **inglese**.

### Status validi

`open` | `in-progress` | `blocked` | `done` | `cancelled`

Transizioni: open -> in-progress | cancelled. in-progress -> done | blocked. blocked -> in-progress | cancelled.

### Wave valide

`brainstorm` | `discover` | `discuss` | `design` | `devops` | `distill` | `deliver` | `done` | `skipped`

### Archiviazione

I task `done` vengono spostati (non copiati) da TASKS.yaml a `docs/archive/tasks-YYYY.yaml`.
Il file di archivio e' append-only: contiene solo la lista `tasks`, senza header (schema_version, last_updated).
Se il file o la directory non esistono, creali.

### Se TASKS.yaml non esiste

Segnala l'assenza. Non creare il file autonomamente.

### Se TASKS.yaml e' malformato

Se il parse YAML fallisce:
1. Segnala l'errore specifico (riga, tipo di errore).
2. Proponi una correzione e chiedi conferma a Christian.
3. Non procedere con nessuna operazione finche' il file non e' valido.
4. Se l'errore non e' chiaro, suggerisci `git diff HEAD~1 TASKS.yaml` per identificare la modifica che ha introdotto il problema.

### Validazione refs

Quando leggi TASKS.yaml a inizio sessione, verifica che i path in `refs` esistano. Se un ref punta a un file inesistente, segnalalo: `task-NNN: ref invalido: path/non/esiste`. Non rimuovere il ref automaticamente.

### Schema version

Se `schema_version` e' diverso da `"1.0"`, segnala l'anomalia e non procedere senza conferma di Christian.
```

### 3.1 Note sul blocco

- Conciso: ~40 righe. Claude Code lo legge ad ogni sessione -- ogni parola in piu' e' overhead.
- Tono imperativo. Nessuna spiegazione, nessun "perche'" -- solo regole operative.
- Le transizioni di stato sono inline per compattezza.
- L'archiviazione e' automatica dopo conferma completamento (nessuna seconda conferma).

---

## 4. Convenzione di Archiviazione

### 4.1 Percorso

```
docs/archive/tasks-YYYY.yaml
```

Dove `YYYY` e' l'anno corrente al momento dell'archiviazione.

### 4.2 Formato del file archivio

```yaml
# Archivio task completati -- WebPortfolio -- 2026
# Append-only. Non modificare i task gia' archiviati.

tasks:
  - id: task-000
    title: "Migrazione contact form da Formspree a Resend"
    status: done
    priority: normal
    wave: done
    created: "2026-03-01"
    updated: "2026-03-03"
    completed_at: "2026-03-03"
    context: "Superamento limiti Formspree (50/mese). Migrato a Resend con API route server-side."
    refs:
      - docs/evolution/2026-03-03-contact-form-resend-migration.md
      - docs/feature/contact-form-resend-migration/
    notes: null
```

### 4.3 Regole

| Regola | Descrizione |
|---|---|
| **Trigger** | Conferma completamento (status -> done). Nessuna seconda conferma. |
| **Operazione** | Sposta (rimuovi da TASKS.yaml, aggiungi in fondo all'archivio). |
| **Append-only** | I task gia' archiviati non vengono mai modificati. |
| **Creazione** | Se `docs/archive/` o `tasks-YYYY.yaml` non esistono, crearli. |
| **Campi preservati** | Tutti i campi originali del task, incluso `completed_at`. |
| **Ordine** | Cronologico per data di archiviazione (append in fondo). |
| **Header** | Solo commento iniziale. Nessun metadato (schema_version, last_updated). |
| **Messaggio** | `task-NNN archiviato in docs/archive/tasks-YYYY.yaml.` |

### 4.4 Quando archiviare

- Alla conferma del completamento (singolo task, immediato)
- Non esiste archiviazione batch o periodica

---

## 5. Roadmap di Implementazione

Ordine basato sul grafo delle dipendenze (dor-validation.md).

### Step 1: Bootstrap (US-006 + US-007) -- parallelizzabili

**US-006: Creare TASKS.yaml**
- Claude Code propone la lista task dalla Discovery a Christian
- Christian conferma/modifica
- Creare `/TASKS.yaml` con task attivi, ordinati per priorita'
- Creare `/docs/archive/tasks-2026.yaml` con task-000 (done)
- AC: file YAML valido, campi obbligatori presenti, ordinamento corretto, task done archiviato

**US-007: Creare sezione Task Tracker in CLAUDE.md**
- Creare `/CLAUDE.md` con il blocco dalla sezione 3 di questo documento
- AC: sezione presente, 10 regole operative, formati conferma, status/wave/transizioni elencati, regola archiviazione

### Step 2: Validazione lettura contesto (US-001)

- Verificare che Claude Code legge TASKS.yaml all'inizio sessione
- Verificare gestione file assente (segnalazione senza creazione)
- Verificare gestione file vuoto (nessun errore)
- AC: contesto acquisito, task in-progress e high priority identificati

### Step 3: Rilevamento e registrazione task (US-002)

- Verificare rilevamento intenzioni implicite ed esplicite
- Verificare formato conferma asciutto
- Verificare rifiuto (nessuna modifica)
- Verificare campi generati (id auto-incrementale, status open, priority normal, wave, context in italiano)
- AC: conferma immediata, formato rispettato, file non modificato senza conferma

### Step 4: Aggiornamento stato (US-003)

- Verificare conferma per ogni transizione di stato
- Verificare transizioni valide (rifiuto di transizioni invalide)
- Verificare aggiornamento campi (updated, status, wave, completed_at, notes per blocked)
- AC: nessun aggiornamento automatico, campi coerenti, transizioni valide rispettate

### Step 5: Archiviazione (US-004)

- Verificare spostamento task done da TASKS.yaml ad archivio
- Verificare creazione file/directory se assenti
- Verificare append-only (task precedenti intatti)
- Verificare messaggio conferma archiviazione
- AC: task rimosso da TASKS.yaml, aggiunto in fondo all'archivio, tutti i campi preservati

### Step 6: Consultazione stato (US-005)

- Verificare ordinamento per priorita' nel file
- Verificare assenza task done in TASKS.yaml (post archiviazione)
- Verificare refs puntano a file esistenti
- Verificare leggibilita' (<30 secondi con <10 task)
- AC: solo task attivi, ordinamento corretto, refs validi

---

## 6. File prodotti/modificati

| Step | File | Operazione |
|---|---|---|
| 1 | `/TASKS.yaml` | Creare |
| 1 | `/CLAUDE.md` | Creare |
| 1 | `/docs/archive/tasks-2026.yaml` | Creare |
| 2-6 | Nessun file aggiuntivo | Validazione comportamentale |

**Totale file di produzione**: 3

---

## 7. Decisioni di Design (ADR-style, inline)

### D1: Nessun schema di validazione formale

**Contesto**: Si potrebbe aggiungere un JSON Schema o un validatore YAML.
**Decisione**: Non necessario. Claude Code e Christian sono gli unici attori. La validazione e' implicita: YAML invalido fallisce al parse, campi mancanti sono visibili.
**Alternativa scartata**: JSON Schema -- overhead sproporzionato per 2 attori e ~10 task.

### D2: Archivio senza metadati header

**Contesto**: Il file di archivio potrebbe avere schema_version e last_updated come TASKS.yaml.
**Decisione**: Solo commento e lista tasks. L'archivio e' append-only e non viene gestito attivamente. Header aggiungerebbe complessita' senza valore.
**Alternativa scartata**: Header completo -- creerebbe un secondo file da mantenere con metadati.

### D3: Commenti separatori di priorita'

**Contesto**: Per migliorare la scansione visiva si possono usare commenti YAML come separatori.
**Decisione**: Usare `# --- high ---`, `# --- normal ---`, `# --- low ---` prima di ogni blocco di priorita'. Migliora la leggibilita' senza costo.
**Alternativa scartata**: Nessun separatore -- la scansione e' meno immediata con molti task.

### D4: Archiviazione immediata vs. batch

**Contesto**: Si potrebbe archiviare periodicamente (es. ogni 30 giorni) o alla soglia di 50 task.
**Decisione**: Archiviazione immediata alla conferma del completamento. Riduce il rumore subito. E' la preferenza esplicita di Christian.
**Alternativa scartata**: Archiviazione batch -- task done restano come rumore fino all'archiviazione.

### D5: CLAUDE.md a livello progetto vs. globale

**Contesto**: Le istruzioni Task Tracker potrebbero andare nel CLAUDE.md globale (`~/.claude/CLAUDE.md`).
**Decisione**: CLAUDE.md a livello progetto (`/CLAUDE.md`). Il task tracker e' specifico di WebPortfolio, non e' una regola globale. CLAUDE.md di progetto non esiste ancora -- va creato.
**Alternativa scartata**: CLAUDE.md globale -- inquina la configurazione globale con logica progetto-specifica.

---

## 8. Rischi e Mitigazioni

| Rischio | Probabilita' | Impatto | Mitigazione |
|---|---|---|---|
| Claude Code non legge TASKS.yaml | Bassa | Alto | Prima regola in CLAUDE.md. Christian puo' chiedere esplicitamente. |
| Creazione task senza conferma | Bassa | Medio | Regola esplicita + protocollo non negoziabile. Rollback via git. |
| YAML corrotto dopo edit | Bassa | Alto | Git come rete di sicurezza. File piccolo, errori visibili. |
| Disallineamento stato | Media | Medio | Conferma per ogni cambio stato. Review periodica di Christian. |
| Frizione da conferma | Bassa | Basso | Accettabile. Christian lo preferisce esplicitamente. |
| Edit concorrenti | Molto bassa | Alto | Assunzione: singolo editor attivo (Claude Code o Christian, mai in parallelo). Ogni modifica e' preceduta da lettura fresca. Git come rete di sicurezza per conflitti. |

---

## 9. Handoff alla Wave DISTILL

Questo documento e' il blueprint di implementazione. Contiene:

1. Schema YAML definitivo con tutti i campi, tipi, enum, ordinamento
2. Blocco testuale esatto per CLAUDE.md (copia-incolla)
3. Formato e regole dell'archivio
4. Roadmap in 6 step mappata alle 7 user stories
5. Transizioni di stato valide
6. 5 decisioni di design con alternative scartate

**Prossimo passo**: l'acceptance-designer (wave DISTILL) definisce i criteri di accettazione eseguibili per ogni step. Il software-crafter (wave DELIVER) crea i 3 file.
