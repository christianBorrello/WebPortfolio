# US-006: Creazione del file TASKS.yaml iniziale (PRIMO - Bootstrap)

## Problema (Il Dolore)

Christian e' uno sviluppatore che ha 3 feature completate e task emergenti
nel progetto WebPortfolio, ma nessuno di questi e' tracciato in un posto
centralizzato. Per avviare il sistema di task tracking, serve popolare
TASKS.yaml con i task gia' noti dal repository e dalla Discovery.

## Chi (L'Utente)

- Christian, sviluppatore che vuole vedere il quadro d'insieme dal giorno 1
- Claude Code, che usera' il file come punto di partenza per le sessioni successive

## Soluzione (Cosa Costruiamo)

Claude Code crea TASKS.yaml nella root del repository con i task gia'
identificati durante la Discovery, previa conferma di Christian. I task
completati vengono archiviati direttamente in docs/archive/tasks-2026.yaml.

## Esempi di Dominio

### Esempio 1: Creazione con task noti dalla Discovery

Claude Code presenta la lista dei task identificati durante la Discovery:
- task-001 "Implementare sistema centralizzato di task tracking" (in-progress, high)
- task-002 "Aggiungere versione tedesca del portfolio" (open, low)
- task-003 "Correggere bug form contatto con caratteri speciali" (in-progress, high)
- task-004 "Valutare aggiunta dark mode toggle" (open, normal)

Task gia' completato da archiviare:
- task-000 "Migrazione contact form da Formspree a Resend" (done)

Christian conferma la lista. Claude Code crea TASKS.yaml con i task attivi
e docs/archive/tasks-2026.yaml con task-000.

### Esempio 2: Christian modifica la lista prima della creazione

Claude Code presenta la lista. Christian dice "task-003 e' gia' risolto,
toglilo". Claude Code rimuove task-003 dalla lista e lo archivia.
Poi crea TASKS.yaml con i task rimanenti.

### Esempio 3: Christian aggiunge un task mancante

Claude Code presenta la lista. Christian dice "Manca il task per aggiungere
analytics con Umami". Claude Code aggiunge task-005 alla lista e chiede
conferma finale.

## Scenari UAT (BDD)

### Scenario: Creazione di TASKS.yaml con i task della Discovery
Given TASKS.yaml non esiste nella root del repository
And la Discovery ha identificato 5 task (4 attivi + 1 completato)
When Claude Code propone la lista dei task a Christian
And Christian conferma la lista
Then Claude Code crea TASKS.yaml con i 4 task attivi
And Claude Code crea docs/archive/tasks-2026.yaml con il task completato
And TASKS.yaml ha schema_version "1.0"
And TASKS.yaml ha last_updated alla data corrente
And i task sono ordinati per priorita'

### Scenario: Christian modifica la lista prima della creazione
Given Claude Code ha proposto 5 task
When Christian dice "task-003 e' gia' risolto"
Then Claude Code aggiorna la lista rimuovendo task-003 dai task attivi
And Claude Code chiede conferma sulla lista aggiornata

### Scenario: Christian aggiunge un task alla lista
Given Claude Code ha proposto 4 task attivi
When Christian dice "Aggiungi anche il task per analytics"
Then Claude Code aggiunge il task alla lista con id auto-incrementale
And Claude Code chiede conferma sulla lista aggiornata

### Scenario: Il file creato e' YAML valido e conforme allo schema
Given Christian ha confermato la lista dei task
When Claude Code crea TASKS.yaml
Then il file e' YAML valido
And ogni task ha tutti i campi obbligatori
And i valori di status, priority e wave sono enum validi
And i contenuti (title, context) sono in italiano

## Criteri di Accettazione

- [ ] Claude Code propone la lista dei task prima di creare il file
- [ ] Christian conferma (o modifica) la lista prima della creazione
- [ ] TASKS.yaml viene creato nella root del repository con schema_version "1.0"
- [ ] I task attivi sono in TASKS.yaml, ordinati per priorita'
- [ ] I task completati sono archiviati in docs/archive/tasks-2026.yaml
- [ ] Il file e' YAML valido con tutti i campi obbligatori compilati

## Note Tecniche

- **CRITICO: Questa story deve essere eseguita PER PRIMA.** US-007 puo' essere eseguita in parallelo. Tutte le altre stories (US-001 a US-005) dipendono dal completamento di US-006.
- Questo e' un task "una tantum" per il bootstrap del sistema
- Dipendenza: nessuna (questo e' il primo artefatto creato)
- I task della Discovery sono: task-000 (done), task-001 a task-004 (attivi)
- Dopo la creazione, si applicano le regole di US-001, US-002, US-003, US-004
