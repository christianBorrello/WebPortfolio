# Registro Artefatti Condivisi -- Task Tracking

Wave: DISCUSS -- 2026-03-03

---

## Artefatti Primari

### TASKS.yaml

| Attributo | Valore |
|---|---|
| Posizione | Root del repository |
| Formato | YAML puro, schema versione 1.0 |
| Lingua contenuti | Italiano |
| Lingua campi/enum | Inglese |
| Produttore | Claude Code (con conferma di Christian) |
| Consumatori | Claude Code (inizio sessione), Christian (consultazione IDE) |
| Fonte di verita' per | Lista task attivi, status, priorita', wave |
| Non contiene | Step dettagliati, acceptance criteria, roadmap |

**Campi del singolo task:**

| Campo | Tipo | Obbligatorio | Produttore | Consumatori |
|---|---|---|---|---|
| id | string (task-NNN) | Si | Claude Code | Claude Code, Christian |
| title | string (italiano) | Si | Claude Code | Christian (scansione visiva) |
| status | enum | Si | Claude Code (con conferma) | Christian (filtro visivo) |
| priority | enum | Si | Claude Code (con conferma) | Christian (ordine di lettura) |
| wave | enum | Si | Claude Code | Christian (progresso) |
| created | date ISO 8601 | Si | Claude Code | Christian |
| updated | date ISO 8601 | Si | Claude Code | Christian |
| context | string (italiano) | Si | Claude Code | Christian (comprensione) |
| refs | list[string] | No | Claude Code | Christian (navigazione) |
| completed_at | date/null | No | Claude Code | Archiviazione |
| notes | string/null | No | Claude Code | Christian |

### docs/archive/tasks-YYYY.yaml

| Attributo | Valore |
|---|---|
| Posizione | docs/archive/tasks-YYYY.yaml (un file per anno) |
| Formato | YAML puro, stesso schema di TASKS.yaml |
| Produttore | Claude Code (automatico dopo conferma completamento) |
| Consumatori | Christian (consultazione storica) |
| Fonte di verita' per | Task completati archiviati |
| Modalita' scrittura | Append-only (non modificare task gia' archiviati) |

### CLAUDE.md (sezione Task Tracker)

| Attributo | Valore |
|---|---|
| Posizione | Root del repository |
| Formato | Markdown |
| Produttore | Christian (una tantum, poi incrementale) |
| Consumatore | Claude Code (lettura all'inizio di ogni sessione) |
| Fonte di verita' per | Regole di comportamento di Claude Code verso TASKS.yaml |
| Contenuto | Protocollo conferma, regole di gestione, valori enum |

---

## Valori Enum Condivisi

### status

| Valore | Significato | Transizioni valide |
|---|---|---|
| open | Task identificato, non iniziato | open -> in-progress, open -> cancelled |
| in-progress | Lavoro in corso | in-progress -> done, in-progress -> blocked |
| blocked | Bloccato da dipendenza o decisione | blocked -> in-progress, blocked -> cancelled |
| done | Completato | done -> archiviazione |
| cancelled | Annullato (motivazione in notes) | Stato finale |

### priority

| Valore | Significato | Posizione nel file |
|---|---|---|
| high | Urgente o critico | Prima sezione |
| normal | Default | Sezione centrale |
| low | Non urgente | Ultima sezione |

### wave

| Valore | Fase nWave |
|---|---|
| brainstorm | Ideazione |
| discover | Ricerca e validazione |
| discuss | Requisiti e user stories |
| design | Architettura e ADR |
| devops | CI/CD e infrastruttura |
| distill | Preparazione al delivery |
| deliver | Implementazione |
| done | Completato |
| skipped | Wave non applicabile |

---

## Flusso dei Dati tra Artefatti

```
CLAUDE.md                    TASKS.yaml                docs/archive/tasks-YYYY.yaml
(regole)                     (task attivi)             (task completati)
    |                             |                          |
    | Claude Code legge           | Claude Code               | Claude Code
    | regole all'inizio           | legge/scrive              | sposta task
    | della sessione              | con conferma              | completati
    |                             |                          |
    v                             v                          v
  Claude Code ------------> Operazioni su task -------> Archiviazione
                               |       |
                               |       |
                               v       v
                          Christian    File nei refs
                          (IDE)        (docs/feature/*, docs/design/*, etc.)
```

---

## Checkpoint di Integrazione

| Checkpoint | Verifica | Frequenza |
|---|---|---|
| Inizio sessione | Claude Code ha letto TASKS.yaml | Ogni sessione |
| Creazione task | Conferma ottenuta prima di scrivere | Ogni creazione |
| Cambio status | Conferma ottenuta prima di aggiornare | Ogni cambio |
| Completamento | Task archiviato dopo conferma | Ogni completamento |
| Integrita' file | YAML valido, campi obbligatori presenti | Dopo ogni modifica |
| Ordine priorita' | Task ordinati high > normal > low | Dopo ogni modifica |
| Refs validi | File referenziati esistono nel repository | Review periodica |
