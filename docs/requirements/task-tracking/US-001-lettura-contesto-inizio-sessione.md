# US-001: Claude Code legge il contesto del progetto all'inizio di ogni sessione

## Problema (Il Dolore)

Christian e' uno sviluppatore che lavora con Claude Code su WebPortfolio.
Ogni nuova sessione di Claude Code parte senza visibilita' sui task aperti,
le priorita' e lo stato del progetto. Christian trova frustrante dover
ripetere il contesto ogni volta, e rischia che Claude Code lavori su task
gia' completati o ignori task urgenti.

## Chi (L'Utente)

- Claude Code, attore primario che gestisce TASKS.yaml
- Opera in sessioni isolate senza memoria delle sessioni precedenti
- Ha bisogno di ricostruire il contesto del progetto per lavorare in modo informato

## Soluzione (Cosa Costruiamo)

Istruzioni in CLAUDE.md che obbligano Claude Code a leggere TASKS.yaml
all'inizio di ogni sessione, ottenendo il quadro d'insieme prima di iniziare
qualsiasi lavoro.

## Esempi di Dominio

### Esempio 1: Sessione con task urgente

Christian avvia una sessione per lavorare sul portfolio. TASKS.yaml contiene
task-003 "Correggere bug form contatto con caratteri speciali" con priority
high e status in-progress. Claude Code legge il file e sa che questo task
e' la priorita' corrente prima ancora che Christian dica qualcosa.

### Esempio 2: Sessione dopo completamento

Christian avvia una sessione il giorno dopo aver completato la migrazione
del contact form. TASKS.yaml contiene task-000 come done (archiviato) e
task-001 "Implementare task tracking" come in-progress. Claude Code sa
che il lavoro corrente e' sul task tracking, non sulla migrazione.

### Esempio 3: TASKS.yaml non esiste ancora

Christian avvia la primissima sessione del task tracking. TASKS.yaml non
esiste nel repository. Claude Code rileva l'assenza del file e lo segnala,
pronto a crearlo quando Christian lo richiede.

## Scenari UAT (BDD)

### Scenario: Claude Code legge TASKS.yaml all'inizio della sessione
Given Claude Code avvia una nuova sessione
And TASKS.yaml esiste nella root del repository con 4 task
When Claude Code inizia a lavorare
Then Claude Code ha letto TASKS.yaml
And Claude Code conosce i task con status in-progress
And Claude Code conosce i task con priority high

### Scenario: Claude Code rileva l'assenza di TASKS.yaml
Given Claude Code avvia una nuova sessione
And TASKS.yaml non esiste nella root del repository
When Claude Code cerca il file
Then Claude Code segnala che TASKS.yaml non e' presente
And Claude Code non crea il file autonomamente

### Scenario: TASKS.yaml e' presente ma vuoto
Given Claude Code avvia una nuova sessione
And TASKS.yaml esiste ma non contiene task
When Claude Code legge il file
Then Claude Code riconosce che non ci sono task registrati
And Claude Code procede normalmente senza errori

## Criteri di Accettazione

- [ ] CLAUDE.md contiene l'istruzione di leggere TASKS.yaml all'inizio di ogni sessione
- [ ] Claude Code identifica task in-progress e high priority dopo la lettura
- [ ] Se TASKS.yaml non esiste, Claude Code lo segnala senza crearlo autonomamente
- [ ] Se TASKS.yaml e' vuoto, Claude Code procede senza errori

## Note Tecniche

- Dipendenza: TASKS.yaml deve esistere (o l'assenza deve essere gestita)
- Dipendenza: CLAUDE.md deve contenere la sezione Task Tracker
- L'istruzione in CLAUDE.md e' la prima regola della sezione Task Tracker
