# Handoff Discovery -> Discuss: Sistema Centralizzato di Task Tracking

## Stato: DISCOVERY COMPLETATA -- Pronto per wave DISCUSS

Data: 2026-03-03

---

## Riepilogo Esecutivo

Il problema e' validato: i task del progetto WebPortfolio sono frammentati tra 47+ file in 12 sottodirectory, senza una vista unica. La soluzione validata e' un singolo file `TASKS.yaml` nella root del repository, in formato YAML, con contenuti in italiano, gestito da Claude Code con conferma obbligatoria dall'utente per la creazione di nuovi task.

---

## Decisioni Consolidate (7 Domande Aperte -> 7 Risposte)

| # | Domanda | Decisione | Documento di riferimento |
|---|---|---|---|
| 1 | Formato del file | **YAML puro** -- coerente con ADR-003, roadmap.yaml, execution-log.yaml | opportunity-tree.md, sezione 1 |
| 2 | Posizione nel repository | **`TASKS.yaml` nella root** -- massima scopribilita' | opportunity-tree.md, sezione 2 |
| 3 | Riconoscimento task impliciti | **Conferma obbligatoria** -- Claude Code chiede sempre prima di creare | opportunity-tree.md, sezione 3 |
| 4 | Granularita' dei task | **1+ sessione, cambiamento osservabile, descrivibile in una frase** | opportunity-tree.md, sezione 4 |
| 5 | Storicizzazione | **Nessuna in v1 (YAGNI)** -- archiviazione a soglia 50 task per v2 | opportunity-tree.md, sezione 5 |
| 6 | Priorita' e ordinamento | **3 livelli (high/normal/low) + ordine fisico** nel file | opportunity-tree.md, sezione 6 |
| 7 | Collegamento alla documentazione | **Path relativi come puntatori** -- nessuna duplicazione di contenuti | opportunity-tree.md, sezione 7 |

---

## 3 Decisioni Confermate dall'Utente

| Decisione | Scelta | Rationale |
|---|---|---|
| Protocollo task impliciti | Conferma obbligatoria dall'utente, sempre | Prevenire falsi positivi; l'utente mantiene il controllo completo su cosa entra nel tracker |
| Lingua del file | Italiano per contenuti (titoli, contesto, note). Inglese per campi e valori enum | Coerenza con il contesto d'uso. Lo sviluppatore e' italiano; i campi tecnici restano in inglese per uniformita' con lo schema YAML |
| Relazione con roadmap.yaml | Semplice puntatore (titolo + status + refs), nessuna duplicazione | Singola fonte di verita': il dettaglio vive nei file referenziati. TASKS.yaml resta snello e non rischia disallineamenti |

---

## Schema del File Validato

```yaml
# TASKS.yaml -- Tracker centralizzato dei task per WebPortfolio
# Gestito da Claude Code, consultato da Christian.
# Contenuti in italiano. Campi e valori enum in inglese.
# Ordinato per priorita' decrescente.
# Questo file e' un PUNTATORE: titolo + status + riferimenti. Non duplicare roadmap.

schema_version: "1.0"
last_updated: "2026-03-03T14:00:00Z"
updated_by: "claude-code"

tasks:
  - id: task-NNN
    title: "Descrizione concisa in italiano"
    status: open             # open | in-progress | blocked | done | cancelled
    priority: normal         # high | normal | low
    wave: brainstorm         # brainstorm | discover | discuss | design | devops | distill | deliver | done
    created: "YYYY-MM-DD"
    updated: "YYYY-MM-DD"
    context: "Come/perche' e' nato il task, in italiano"
    refs:                    # opzionale
      - path/relativo/alla/root
    completed_at: null       # opzionale, data di completamento
    notes: null              # opzionale, note aggiuntive in italiano
```

---

## Bozza Istruzioni CLAUDE.md

Definite in `solution-testing.md`, sezione "Test 3: Istruzioni CLAUDE.md". Punti chiave:

1. Leggere TASKS.yaml all'inizio di ogni sessione
2. Non creare mai task senza conferma dell'utente
3. Aggiornare status e wave durante il lavoro
4. Mantenere ordine per priorita'
5. TASKS.yaml e' un puntatore, non una roadmap
6. Contenuti in italiano

---

## Artefatti della Discovery

| File | Contenuto |
|---|---|
| `docs/discovery/task-tracking/problem-validation.md` | 5 evidenze dal repository, profilo attori, assunzioni con risk scoring |
| `docs/discovery/task-tracking/opportunity-tree.md` | Analisi delle 7 domande aperte con opzioni valutate e raccomandazioni |
| `docs/discovery/task-tracking/solution-testing.md` | Schema YAML, prototipo con 5 task, 5 test di validazione, bozza CLAUDE.md |
| `docs/discovery/task-tracking/lean-canvas.md` | Canvas adattato, valutazione 4 rischi (tutti bassi), decisione GO |
| `docs/discovery/task-tracking/handoff-discuss.md` | Questo documento |

---

## Gate di Discovery: Tutti Superati

| Gate | Criterio | Risultato |
|---|---|---|
| G1 (Problema) | 5+ evidenze, >60% conferma | 5/5 evidenze, 100% conferma |
| G2 (Opportunita') | 5+ opportunita', top >8 | 5 opportunita', top score 19 |
| G3 (Soluzione) | >80% test superati | 5/5 test (100%) |
| G4 (Viabilita') | 4 rischi accettabili | Tutti bassi/trascurabili |

---

## Input Necessari per la Wave DISCUSS

La wave DISCUSS dovra' produrre:

1. **Requisiti formali** per lo schema TASKS.yaml (basati sullo schema validato sopra)
2. **User stories** per i due attori (Claude Code come gestore, Christian come revisore)
3. **Acceptance criteria** per:
   - Creazione del file TASKS.yaml iniziale con i task esistenti
   - Istruzioni in CLAUDE.md per il mantenimento automatico
   - Protocollo di conferma per task impliciti
4. **Definition of Ready** prima del passaggio alla wave DESIGN

---

## Rischi Residui da Monitorare

| Rischio | Livello | Mitigazione |
|---|---|---|
| Claude Code non legge TASKS.yaml spontaneamente | Basso | Istruzioni esplicite in CLAUDE.md |
| Il file cresce oltre la soglia di leggibilita' | Basso | Strategia di archiviazione pianificata per v2 |
| Disallineamento tra TASKS.yaml e stato reale | Medio | Revisione periodica da parte di Christian |
| Il protocollo di conferma crea frizione | Basso | Accettabile come trade-off per il controllo |
