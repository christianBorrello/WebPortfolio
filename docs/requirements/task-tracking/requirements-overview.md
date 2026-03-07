# Requirements Overview -- Sistema Centralizzato di Task Tracking

Wave: DISCUSS -- 2026-03-03
Feature Type: Infrastructure (developer tooling)

---

## Riepilogo

Un singolo file `TASKS.yaml` nella root del repository WebPortfolio fornisce
visibilita' centralizzata su tutti i task del progetto. Claude Code lo gestisce
con conferma obbligatoria per ogni operazione. Christian lo consulta nell'IDE.
I task completati vengono archiviati.

---

## Attori

| Attore | Ruolo | Interazione |
|---|---|---|
| Claude Code | Gestore primario | Legge, propone creazione/modifica, scrive con conferma |
| Christian | Revisore e decisore | Consulta nell'IDE, approva ogni operazione |

---

## User Stories

| ID | Titolo | Priorita' | Effort | Scenari | Dipendenze |
|---|---|---|---|---|---|
| US-006 | Creazione TASKS.yaml iniziale | High | 1 sessione | 4 | Nessuna |
| US-007 | Istruzioni CLAUDE.md | High | 1 sessione | 5 | Nessuna |
| US-001 | Lettura contesto inizio sessione | High | 1 sessione | 3 | US-006, US-007 |
| US-002 | Rilevamento e registrazione task | High | 1-2 sessioni | 5 | US-001 |
| US-003 | Aggiornamento stato con conferma | Normal | 1 sessione | 5 | US-001, US-002 |
| US-004 | Archiviazione task completati | Normal | 1 sessione | 5 | US-003 |
| US-005 | Consultazione stato progetto | Normal | 1 sessione | 5 | US-004 |

**Totale**: 7 user stories, 32 scenari UAT, ~7-8 sessioni stimate

---

## Decisioni Chiave (Consolidate)

| # | Decisione | Scelta | Fonte |
|---|---|---|---|
| D1 | Formato | YAML puro (TASKS.yaml nella root) | Discovery |
| D2 | Lingua | Italiano per contenuti, inglese per campi/enum | Discovery |
| D3 | Conferma | Obbligatoria per OGNI operazione (creazione e stato) | DISCUSS |
| D4 | Tono | Asciutto e diretto | DISCUSS |
| D5 | Archiviazione | Attiva in v1, docs/archive/tasks-YYYY.yaml | DISCUSS (aggiornamento) |
| D6 | Granularita' | 1+ sessione, cambiamento osservabile, una frase | Discovery |
| D7 | Priorita' | 3 livelli + ordine fisico | Discovery |
| D8 | Collegamento docs | Path relativi come puntatori | Discovery |

---

## Requisiti Non Funzionali (NFR)

| NFR | Requisito | Metrica |
|-----|-----------|---------|
| Performance | Lettura e parse di TASKS.yaml | < 100ms con < 50 task |
| Scalabilita' | Numero massimo task attivi gestibili | Target < 50 task per leggibilita' |
| Scansione visiva | Tempo per capire il quadro d'insieme | < 30 secondi con < 10 task attivi |
| Integrita' dati | Validazione YAML dopo ogni scrittura | Il file deve essere YAML valido dopo ogni operazione |
| Portabilita' | Riferimenti a file nel progetto | Solo path relativi alla root |

---

## Schema del File (Versione Finale)

```yaml
# TASKS.yaml -- Tracker centralizzato dei task per WebPortfolio
# Gestito da Claude Code con conferma di Christian.
# Contenuti in italiano. Campi e valori enum in inglese.
# Ordinato per priorita' decrescente.
# Puntatore: titolo + status + refs. Non duplicare roadmap.

schema_version: "1.0"
last_updated: "2026-03-03T14:00:00Z"
updated_by: "claude-code"

tasks:
  - id: task-NNN
    title: "Descrizione concisa in italiano"
    status: open             # open | in-progress | blocked | done | cancelled
    priority: normal         # high | normal | low
    wave: brainstorm         # brainstorm | discover | discuss | design | devops | distill | deliver | done | skipped
    created: "YYYY-MM-DD"
    updated: "YYYY-MM-DD"
    context: "Come/perche' e' nato il task, in italiano"
    refs:                    # opzionale
      - path/relativo/alla/root
    completed_at: null       # opzionale, data di completamento
    notes: null              # opzionale, note aggiuntive in italiano
```

---

## Protocollo di Conferma (Versione Finale)

### Creazione task
```
Claude Code: Nuovo task rilevato: "[titolo]". Registro?
Christian: Si / No
Claude Code (se si): Registrato: task-NNN "[titolo]". Status: open. Priority: normal.
```

### Cambio stato
```
Claude Code: task-NNN "[titolo]" e' [status_attuale]. Aggiorno a [nuovo_status]?
Christian: Si / No
```

### Completamento
```
Claude Code: task-NNN "[titolo]" completato. Segno come done?
Christian: Si
Claude Code: task-NNN archiviato in docs/archive/tasks-YYYY.yaml.
```

---

## Artefatti Prodotti

### Journey Design (docs/ux/task-tracking/)

| File | Contenuto |
|---|---|
| journey-task-tracking-visual.md | Mappa visuale con mockup ASCII, arco emotivo, percorsi di errore |
| journey-task-tracking.yaml | Schema strutturato del journey (attori, step, decisioni, errori) |
| journey-task-tracking.feature | 17 scenari Gherkin per i 3 journey + schema e integrita' |
| shared-artifacts-registry.md | Registro artefatti condivisi, flusso dati, checkpoint |

### Requirements (docs/requirements/task-tracking/)

| File | Contenuto |
|---|---|
| requirements-overview.md | Questo documento |
| US-001 a US-007 | 7 user stories con problema, esempi, UAT, criteri di accettazione |
| dor-validation.md | Validazione Definition of Ready (8 criteri) per tutte le 7 stories |

---

## Handoff alla Wave DESIGN

Questo pacchetto e' pronto per il passaggio al solution-architect (wave DESIGN):

1. **Journey completo**: 3 journey con arco emotivo, mockup, errori
2. **7 user stories**: tutte passano DoR 8/8
3. **32 scenari UAT**: copertura happy path, edge case, errori
4. **Schema validato**: dalla Discovery, confermato nella DISCUSS
5. **Decisioni aggiornate**: archiviazione e conferma per cambi di stato
6. **Grafo dipendenze**: ordine di implementazione suggerito

### Cosa serve al solution-architect

- Definire la struttura esatta del file di archivio (header, metadati)
- Decidere se docs/archive/ necessita di un ADR
- Validare la bozza CLAUDE.md (da solution-testing.md, arricchita con decisioni DISCUSS)
- Definire le transizioni di stato valide come diagramma formale
