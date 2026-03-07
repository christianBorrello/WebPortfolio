# US-003: Claude Code aggiorna lo stato dei task con conferma

## Problema (Il Dolore)

Christian e' uno sviluppatore che lavora su task registrati in TASKS.yaml.
Quando Claude Code inizia a lavorare su un task o lo completa, lo stato
nel file deve riflettere la realta'. Christian trova critico che il file
non si disallinei dallo stato reale del lavoro, e per questo vuole che
ogni cambio di stato passi attraverso una conferma esplicita.

## Chi (L'Utente)

- Christian, revisore che controlla lo stato dei task nell'IDE
- Vuole che TASKS.yaml rifletta sempre la realta'
- Preferisce confermare ogni cambio di stato piuttosto che rischiare disallineamenti

## Soluzione (Cosa Costruiamo)

Claude Code chiede conferma a Christian prima di ogni cambio di stato
in TASKS.yaml (da open a in-progress, da in-progress a done, etc.).
Nessun aggiornamento automatico.

## Esempi di Dominio

### Esempio 1: Inizio lavoro su un task (happy path)

Claude Code inizia a lavorare sulla correzione del bug del form contatto.
Riconosce che task-003 "Correggere bug form contatto con caratteri speciali"
e' in TASKS.yaml con status open. Chiede: "task-003 \"Correggere bug form
contatto\" e' open. Aggiorno a in-progress?" Christian conferma. Lo status
viene aggiornato.

### Esempio 2: Completamento di un task

Claude Code ha finito di correggere il bug. Chiede: "task-003 \"Correggere
bug form contatto\" completato. Segno come done?" Christian conferma. Lo
status diventa done, la wave diventa done, completed_at viene compilato.
Il task viene poi archiviato (vedi US-004).

### Esempio 3: Task bloccato

Claude Code sta lavorando su task-005 "Aggiungere analytics con Umami"
ma scopre che serve un account Railway. Chiede: "task-005 \"Aggiungere
analytics con Umami\" bloccato: serve account Railway. Aggiorno a blocked?"
Christian conferma. Lo status diventa blocked con nota nelle notes.

## Scenari UAT (BDD)

### Scenario: Aggiornamento da open a in-progress con conferma
Given TASKS.yaml contiene task-003 "Correggere bug form contatto" con status "open"
And Claude Code inizia a lavorare sulla correzione
When Claude Code riconosce che il lavoro corrisponde a task-003
Then Claude Code mostra "task-003 \"Correggere bug form contatto\" e' open. Aggiorno a in-progress?"
And quando Christian conferma
Then task-003 ha status "in-progress"
And task-003 ha updated aggiornato alla data corrente

### Scenario: Completamento di un task con conferma
Given task-003 "Correggere bug form contatto" ha status "in-progress"
And Claude Code ha completato la correzione
When Claude Code propone il completamento
Then Claude Code mostra "task-003 \"Correggere bug form contatto\" completato. Segno come done?"
And quando Christian conferma
Then task-003 ha status "done" e wave "done"
And task-003 ha completed_at impostato alla data corrente

### Scenario: Task bloccato con conferma
Given task-005 "Aggiungere analytics con Umami" ha status "in-progress"
And Claude Code scopre una dipendenza esterna bloccante
When Claude Code segnala il blocco
Then Claude Code mostra "task-005 \"Aggiungere analytics con Umami\" bloccato: [motivo]. Aggiorno a blocked?"
And quando Christian conferma
Then task-005 ha status "blocked"
And task-005 ha notes che descrivono il motivo del blocco in italiano

### Scenario: Christian rifiuta l'aggiornamento di stato
Given Claude Code ha proposto di aggiornare task-003 a in-progress
When Christian dice "No, non sto lavorando su quello"
Then lo status di task-003 resta invariato in TASKS.yaml

### Scenario: Nessun aggiornamento di stato senza conferma
Given Claude Code sta lavorando su un task registrato
When Claude Code vuole aggiornare lo status
Then Claude Code chiede conferma prima di modificare TASKS.yaml
And lo status nel file non cambia fino alla conferma esplicita

## Criteri di Accettazione

- [ ] Claude Code chiede conferma prima di ogni cambio di status
- [ ] Lo status non viene mai aggiornato automaticamente (nemmeno da open a in-progress)
- [ ] Il campo updated viene aggiornato ad ogni cambio di status confermato
- [ ] Al completamento, i campi status, wave e completed_at vengono aggiornati insieme
- [ ] Se il task e' bloccato, il motivo viene registrato nel campo notes in italiano
- [ ] Il messaggio di conferma e' asciutto e diretto

## Note Tecniche

- Dipendenza: US-001 (Claude Code deve aver letto TASKS.yaml)
- Dipendenza: US-002 (il task deve esistere in TASKS.yaml)
- Transizioni di stato valide: open->in-progress, open->cancelled, in-progress->done, in-progress->blocked, blocked->in-progress, blocked->cancelled
- Il completamento attiva il flusso di archiviazione (US-004)
