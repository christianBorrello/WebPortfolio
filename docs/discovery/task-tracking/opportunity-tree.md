# Albero delle Opportunita': Sistema Centralizzato di Task Tracking

## Outcome Desiderato

Un singolo file nel repository che fornisca visibilita' immediata su tutti i task del progetto, gestibile in autonomia da Claude Code e consultabile da Christian come revisore.

---

## Domanda Aperta 1: Formato del File

### Opzioni Analizzate

#### YAML

```yaml
tasks:
  - id: task-001
    title: Aggiungere dark mode toggle
    status: in-progress
    wave: deliver
    created: 2026-03-03
    context: "Emerso dalla sessione di review del design"
    refs:
      - docs/design/adrs/adr-008-dark-mode.md
```

**Pro**:
- Coerente con il progetto (ADR-003 ha gia' scelto YAML per i contenuti)
- Struttura gerarchica nativa -- ideale per task con campi multipli
- Parse affidabile e non ambiguo (a differenza di Markdown che richiede convenzioni)
- Claude Code gestisce YAML senza problemi (lo fa gia' per roadmap.yaml e execution-log.yaml)
- Validabile con schema (opzionale, ma possibile)

**Contro**:
- Meno leggibile del Markdown per testo lungo
- Le stringhe multilinea richiedono `|` o `>`
- Meno "friendly" per apertura rapida nell'IDE rispetto a Markdown rendered

#### Markdown Strutturato

```markdown
## task-001: Aggiungere dark mode toggle
- **Status**: in-progress
- **Wave**: deliver
- **Creato**: 2026-03-03
- **Contesto**: Emerso dalla sessione di review del design
- **Refs**: [ADR-008](docs/design/adrs/adr-008-dark-mode.md)
```

**Pro**:
- Leggibilita' umana superiore (rendering nell'IDE con preview)
- Familiare a qualsiasi sviluppatore
- Supporta formattazione inline (bold, link)

**Contro**:
- Parse piu' fragile (dipende da convenzioni di heading/bullet)
- Nessuno schema formale -- errori silenziosi
- Ambiguita' strutturale (cosa succede se manca un campo?)
- Claude Code dovrebbe fare parse con regex/pattern matching anziche' con un parser YAML

#### Formato Ibrido: Markdown con Frontmatter YAML

```markdown
---
tasks:
  - id: task-001
    title: Aggiungere dark mode toggle
    status: in-progress
    wave: deliver
---

# Task Tracker - WebPortfolio

Ultimo aggiornamento: 2026-03-03

## In Corso
- **task-001**: Aggiungere dark mode toggle (wave: deliver)

## Completati (ultimi 5)
- **task-000**: Contact form migration (completato 2026-03-03)
```

**Pro**:
- I dati strutturati vivono nel frontmatter YAML (parseabili)
- La parte Markdown serve come "dashboard" leggibile
- Claude Code lavora sul frontmatter; la sezione Markdown viene rigenerata automaticamente

**Contro**:
- Duplicazione: le stesse informazioni appaiono in YAML e in Markdown
- Complessita' maggiore di un singolo formato
- Rischio di disallineamento tra le due sezioni

### Raccomandazione: YAML Puro

**Motivazione**: La coerenza con le scelte esistenti del progetto (ADR-003, roadmap.yaml, execution-log.yaml) e' il fattore decisivo. YAML offre parse affidabile e non ambiguo. La leggibilita' umana e' "sufficiente" per un file consultato nell'IDE -- non serve rendering Markdown.

---

## Domanda Aperta 2: Posizione nel Repository

### Opzioni Analizzate

| Posizione | Pro | Contro |
|---|---|---|
| Root: `TASKS.yaml` | Massima visibilita'; convenzione simile a README, TODO | Inquina la root con un file in piu' |
| Root: `BACKLOG.yaml` | Nome esplicito sul contenuto | Meno intuitivo; "backlog" suggerisce solo task futuri |
| `docs/TASKS.yaml` | Coerente con la struttura docs/ esistente | Nascosto dentro docs/; meno scopribile |
| `.claude/TASKS.yaml` | Vicino alla configurazione Claude | Troppo nascosto; l'utente non lo cerca li' |

### Raccomandazione: `TASKS.yaml` nella Root

**Motivazione**:
- Massima scopribilita': sia Claude Code che Christian lo trovano immediatamente
- Segue la convenzione dei file di progetto nella root (come README.md, .env.example)
- Il nome `TASKS` e' autoesplicativo
- CLAUDE.md puo' istruire Claude Code a cercare `TASKS.yaml` come prima cosa

---

## Domanda Aperta 3: Riconoscimento dei Task Impliciti

### Il Problema

L'utente non dice sempre "crea un task". Puo' dire:
- "Prima o poi dovremmo aggiungere il dark mode"
- "Il form di contatto ha un bug con i caratteri speciali"
- "Sarebbe bello avere anche una versione tedesca"

### Decisione: Conferma Obbligatoria (CONFERMATA)

**Stato**: Decisione confermata dall'utente.

Claude Code deve **sempre chiedere conferma** prima di registrare un task implicito. Non registra mai automaticamente.

Le istruzioni in CLAUDE.md dovrebbero contenere:

1. **Trigger di riconoscimento**: Parole/pattern che indicano un task implicito
   - Intenzioni future: "dovremmo", "sarebbe bello", "prima o poi", "in futuro"
   - Segnalazioni di problemi: "bug", "non funziona", "errore", "problema con"
   - Richieste dirette: "aggiungi", "crea", "implementa", "modifica"

2. **Protocollo di conferma**: Claude Code NON crea task silenziosamente. Chiede **sempre** conferma:
   > "Ho rilevato una possibile intenzione: [descrizione]. Vuoi che lo registri come task in TASKS.yaml?"

3. **Nessuna eccezione**: Anche i task espliciti richiedono conferma. Claude Code non modifica mai TASKS.yaml senza il consenso dell'utente per la creazione di nuovi task.

### Valutazione del Rischio

L'assunzione A6 (score 49) e' la piu' rischiosa. Il riconoscimento ha due failure modes:
- **Falso positivo**: Mitigato completamente dal protocollo di conferma obbligatoria
- **Falso negativo**: Claude Code non rileva un'intenzione reale -- accettabile in v1, l'utente puo' creare task esplicitamente

---

## Domanda Aperta 4: Granularita' dei Task

### Definizione Proposta

Un "task" e' qualsiasi unita' di lavoro che:
1. Richiede almeno una sessione Claude Code per essere completata
2. Produce un cambiamento osservabile nel repository (codice, documentazione, configurazione)
3. Puo' essere descritta in una frase

### Cosa NON e' un Task

- Un singolo bugfix di una riga (troppo piccolo -- e' un commit, non un task)
- Un'epica intera come "riscrivere il frontend" (troppo grande -- va decomposta)
- Un'osservazione senza azione ("il sito si carica lento" senza decisione di ottimizzare)

### Relazione con le Wave nWave

Il campo `wave` nel task indica la fase corrente del flusso nWave:

```yaml
wave_values:
  - brainstorm    # Ideazione, idea brief
  - discover      # Ricerca, validazione del problema
  - discuss       # Requisiti, user stories
  - design        # Architettura, ADR
  - devops        # CI/CD, infrastruttura
  - distill       # Preparazione al delivery, test scenarios
  - deliver       # Implementazione, coding
  - done          # Completato
  - skipped       # Wave saltata per questo task
```

Non tutti i task passano per tutte le wave. Un bugfix puo' andare direttamente a `deliver`. Una feature complessa passa per tutte.

---

## Domanda Aperta 5: Storicizzazione

### Strategia Proposta: Archivio con Soglia

1. I task con status `done` restano in `TASKS.yaml` per **30 giorni** dalla data di completamento
2. Dopo 30 giorni, vengono spostati in `docs/archive/tasks-YYYY.yaml`
3. Il file di archivio e' append-only e non viene mai modificato
4. Il file principale resta snello (idealmente <50 task attivi + recenti)

### Alternativa Considerata: Nessuna Archiviazione

Lasciare tutti i task nel file principale. Pro: semplicita'. Contro: il file cresce indefinitamente e diventa meno leggibile.

### Raccomandazione

Iniziare senza archiviazione (YAGNI). Aggiungere l'archiviazione quando il file supera i 50 task. Questo evita di costruire infrastruttura inutile per un file che potrebbe restare piccolo per mesi.

---

## Domanda Aperta 6: Priorita' e Ordinamento

### Strategia Proposta: Priorita' Implicita + Esplicita

```yaml
tasks:
  # I task sono ordinati per priorita' decrescente.
  # Il primo task della lista e' quello su cui lavorare ora.

  - id: task-003
    title: Fix bug form contatto con caratteri speciali
    status: in-progress
    priority: high     # high | normal | low
    # ...

  - id: task-002
    title: Aggiungere dark mode
    status: open
    priority: normal
    # ...
```

**Due livelli di ordinamento**:
1. **Priorita' esplicita**: `high`, `normal`, `low` -- assegnata dall'utente o da Claude Code
2. **Posizione nella lista**: L'ordine fisico nel file indica la priorita' relativa tra task della stessa categoria

Questo e' intenzionalmente semplice. Non serve un sistema di scoring numerico per un progetto con un solo sviluppatore.

---

## Domanda Aperta 7: Collegamento alla Documentazione

### Decisione: Path Relativi come Semplici Puntatori (CONFERMATA)

**Stato**: Decisione confermata dall'utente. Il task in TASKS.yaml e' un **semplice riferimento** (puntatore) alla documentazione, non una duplicazione dei contenuti. Non deve contenere una roadmap completa.

```yaml
refs:
  - docs/design/adrs/adr-006-resend-over-formspree.md
  - docs/feature/contact-form-resend-migration/roadmap.yaml
  - docs/evolution/2026-03-03-contact-form-resend-migration.md
```

- I path sono relativi alla root del progetto
- Seguono la struttura `docs/` esistente
- Rimangono validi finche' il file referenziato non viene rinominato/spostato
- Claude Code puo' verificare l'esistenza dei file referenziati
- **Principio chiave**: TASKS.yaml dice *cosa* e *in che stato*; i file referenziati dicono *come* e *nel dettaglio*

---

## Scoring delle Opportunita'

| Opportunita' | Importanza | Soddisfazione Attuale | Opportunita' Score |
|---|---|---|---|
| Vista unica su tutti i task | 10 | 1 | 19 (10 + 10 - 1) |
| Aggiornamento automatico da Claude Code | 9 | 2 | 16 (9 + 9 - 2) |
| Riconoscimento task impliciti | 7 | 0 | 14 (7 + 7 - 0) |
| Archiviazione task completati | 5 | 3 | 7 (5 + 5 - 3) |
| Prioritizzazione task | 6 | 4 | 8 (6 + 6 - 4) |

**Top 3 opportunita' (score >8)**:
1. Vista unica su tutti i task (19)
2. Aggiornamento automatico da Claude Code (16)
3. Riconoscimento task impliciti (14)

---

## Gate G2: Valutazione

| Criterio | Target | Risultato | Stato |
|---|---|---|---|
| Opportunita' identificate | 5+ | 5 | PASS |
| Top score >8 | Si | 19 (vista unica) | PASS |
| Copertura job-step | >80% | 7/7 domande aperte coperte | PASS |
| Allineamento team | Confermato | N/A (solo developer) | PASS |

**Decisione G2**: PROCEED -- Le opportunita' sono chiare e priorizzate. La ricerca sulle 7 domande aperte ha prodotto raccomandazioni concrete.
