# US-004: I task completati vengono archiviati per ridurre rumore

## Problema (Il Dolore)

Christian e' uno sviluppatore che consulta TASKS.yaml per capire lo stato
del progetto. I task completati nel file sono rumore visivo -- distraggono
dalla scansione dei task attivi e aumentano la dimensione del file.
Christian vuole vedere solo i task su cui c'e' da lavorare, non la storia
completa.

## Chi (L'Utente)

- Christian, revisore che consulta TASKS.yaml nell'IDE
- Preferisce un file snello con soli task attivi
- Vuole comunque poter consultare i task completati in un archivio separato

## Soluzione (Cosa Costruiamo)

Quando un task viene confermato come done, Claude Code lo sposta da
TASKS.yaml a docs/archive/tasks-YYYY.yaml (file per anno corrente).
L'archiviazione avviene come passaggio automatico dopo la conferma
del completamento. Il file di archivio e' append-only.

**Nota**: Questa decisione sostituisce la raccomandazione Discovery
"nessuna archiviazione in v1 (YAGNI)". Christian ha espresso preferenza
per l'archiviazione per ridurre rumore e dimensioni del file.

## Esempi di Dominio

### Esempio 1: Primo task archiviato (happy path)

Christian conferma che task-003 "Correggere bug form contatto con caratteri
speciali" e' completato. Claude Code imposta status done, poi sposta il
task da TASKS.yaml a docs/archive/tasks-2026.yaml. Il file di archivio
non esisteva ancora: Claude Code lo crea. Mostra: "task-003 archiviato
in docs/archive/tasks-2026.yaml."

### Esempio 2: Archiviazione con archivio esistente

docs/archive/tasks-2026.yaml contiene gia' task-000 (migrazione contact
form). Christian conferma il completamento di task-001 "Implementare task
tracking". Claude Code aggiunge task-001 in fondo al file di archivio,
senza modificare task-000. TASKS.yaml ora non contiene piu' ne' task-000
ne' task-001.

### Esempio 3: Consultazione archivio storico

Christian vuole rivedere i task completati nel 2026. Apre
docs/archive/tasks-2026.yaml nell'IDE e trova tutti i task archiviati
in ordine cronologico di completamento.

## Scenari UAT (BDD)

### Scenario: Task completato viene archiviato
Given Christian ha confermato che task-003 "Correggere bug form contatto" e' done
And docs/archive/ esiste come directory
When Claude Code archivia il task
Then task-003 viene rimosso da TASKS.yaml
And task-003 viene aggiunto a docs/archive/tasks-2026.yaml
And Claude Code mostra "task-003 archiviato in docs/archive/tasks-2026.yaml."

### Scenario: Primo task archiviato crea il file di archivio
Given nessun file di archivio esiste in docs/archive/
And Christian ha confermato che task-000 e' done
When Claude Code archivia il task
Then Claude Code crea docs/archive/tasks-2026.yaml
And task-000 e' il primo task nel file di archivio

### Scenario: Archivio append-only non modifica task precedenti
Given docs/archive/tasks-2026.yaml contiene task-000 archiviato
And Christian ha confermato che task-003 e' done
When Claude Code archivia task-003
Then task-003 viene aggiunto in fondo al file di archivio
And task-000 nel file di archivio non viene modificato

### Scenario: TASKS.yaml contiene solo task attivi dopo archiviazione
Given 3 task sono stati completati e archiviati
And 4 task hanno status diverso da done
When Christian apre TASKS.yaml
Then TASKS.yaml contiene solo i 4 task attivi
And nessun task con status done e' presente

### Scenario: Il file di archivio e' leggibile e ben formattato
Given docs/archive/tasks-2026.yaml contiene 3 task archiviati
When Christian apre il file di archivio nell'IDE
Then ogni task ha tutti i campi originali (id, title, status, priority, wave, created, updated, context, completed_at)
And i task sono in ordine cronologico di archiviazione

## Criteri di Accettazione

- [ ] Alla conferma del completamento, il task viene spostato (non copiato) da TASKS.yaml all'archivio
- [ ] Il file di archivio ha formato docs/archive/tasks-YYYY.yaml (anno corrente)
- [ ] Se il file di archivio non esiste, viene creato
- [ ] Il file di archivio e' append-only (task precedenti non vengono modificati)
- [ ] Dopo l'archiviazione, TASKS.yaml non contiene task con status done
- [ ] Il task archiviato mantiene tutti i campi originali incluso completed_at
- [ ] Claude Code conferma l'archiviazione con messaggio asciutto

## Note Tecniche

- **OBBLIGATORIA in v1**: L'archiviazione e' un requisito confermato nella wave DISCUSS (decisione aggiornata da "YAGNI" a "attiva in v1"). La mancata implementazione blocca l'accettazione di questa story e il passaggio del DoR.
- Dipendenza: US-003 (il task deve essere stato confermato come done)
- L'archiviazione e' un passaggio automatico dopo la conferma del completamento (non richiede una seconda conferma)
- La directory docs/archive/ potrebbe non esistere alla prima archiviazione
- Il file di archivio segue lo stesso schema YAML di TASKS.yaml ma senza i metadati di header (schema_version, last_updated, updated_by) -- contiene solo la lista tasks
