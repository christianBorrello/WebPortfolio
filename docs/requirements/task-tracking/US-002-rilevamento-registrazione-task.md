# US-002: Claude Code rileva intenzioni e registra task con conferma

## Problema (Il Dolore)

Christian e' uno sviluppatore che menziona intenzioni durante le sessioni
di lavoro -- "prima o poi dovremmo aggiungere il dark mode", "il form ha
un bug con i caratteri speciali". Queste intenzioni si perdono tra le
sessioni perche' non c'e' un posto dove registrarle. Allo stesso tempo,
Christian vuole mantenere il controllo completo su cosa entra nel tracker
e non vuole che Claude Code crei task non desiderati.

## Chi (L'Utente)

- Christian, sviluppatore di WebPortfolio
- Esprime intenzioni in linguaggio naturale durante le conversazioni
- Vuole un tono asciutto e diretto nelle richieste di conferma
- Vuole che la conferma sia immediata, non accumulata

## Soluzione (Cosa Costruiamo)

Claude Code riconosce intenzioni (implicite ed esplicite) durante le
sessioni e chiede conferma immediata con messaggio asciutto prima di
registrare il task in TASKS.yaml. Mai nessuna modifica senza conferma.

## Esempi di Dominio

### Esempio 1: Intenzione implicita (happy path)

Christian sta lavorando sulla correzione del form contatto e dice
"Prima o poi dovremmo aggiungere il dark mode". Claude Code interrompe
subito: "Nuovo task rilevato: \"Aggiungere dark mode toggle\". Registro?"
Christian dice "Si". Claude Code aggiunge task-007 con status open,
priority normal, wave brainstorm, context "Emerso durante sessione di
lavoro sul form contatto".

### Esempio 2: Intenzione rifiutata

Christian dice "Sarebbe bello avere anche una versione in giapponese".
Claude Code chiede: "Nuovo task rilevato: \"Aggiungere versione giapponese
del portfolio\". Registro?" Christian dice "No, era solo un pensiero".
Claude Code non modifica TASKS.yaml e continua il lavoro corrente.

### Esempio 3: Richiesta esplicita

Christian dice "Crea un task per migrare da Tailwind a vanilla CSS".
Claude Code chiede: "Nuovo task rilevato: \"Migrare da Tailwind a vanilla
CSS\". Registro?" Christian conferma. Claude Code aggiunge il task con
context "Richiesto esplicitamente da Christian".

## Scenari UAT (BDD)

### Scenario: Rilevamento intenzione implicita con conferma
Given Christian sta lavorando con Claude Code sul task "Correggere bug form contatto"
And TASKS.yaml contiene task fino a task-006
When Christian dice "Prima o poi dovremmo aggiungere il dark mode"
Then Claude Code interrompe subito e mostra "Nuovo task rilevato: \"Aggiungere dark mode toggle\". Registro?"
And quando Christian conferma con "Si"
Then Claude Code aggiunge task-007 a TASKS.yaml con status "open" e priority "normal"
And il campo context descrive l'origine in italiano
And Claude Code mostra "Registrato: task-007 \"Aggiungere dark mode toggle\". Status: open. Priority: normal."

### Scenario: Intenzione rifiutata
Given Claude Code ha chiesto conferma per un task
When Christian dice "No"
Then TASKS.yaml non viene modificato
And Claude Code continua il lavoro corrente

### Scenario: Richiesta esplicita con conferma
Given Christian dice "Crea un task per migrare da Tailwind a vanilla CSS"
When Claude Code riconosce la richiesta
Then Claude Code mostra "Nuovo task rilevato: \"Migrare da Tailwind a vanilla CSS\". Registro?"
And Claude Code non modifica TASKS.yaml fino alla conferma

### Scenario: Nessuna modifica senza conferma
Given Christian menziona "Il sito si carica un po' lento"
When Claude Code riconosce una possibile intenzione
Then Claude Code chiede conferma prima di qualsiasi modifica
And il numero di task in TASKS.yaml non cambia fino alla conferma esplicita

### Scenario: Il messaggio di conferma e' asciutto e diretto
Given Christian esprime un'intenzione qualsiasi
When Claude Code chiede conferma
Then il messaggio segue il formato "Nuovo task rilevato: \"[titolo]\". Registro?"
And il messaggio non contiene spiegazioni aggiuntive o contesto verboso

## Criteri di Accettazione

- [ ] Claude Code chiede conferma SUBITO quando rileva un'intenzione (non accumula)
- [ ] Il messaggio di conferma segue il formato asciutto: "Nuovo task rilevato: \"[titolo]\". Registro?"
- [ ] TASKS.yaml non viene mai modificato senza conferma esplicita di Christian
- [ ] L'id del nuovo task e' auto-incrementale (max esistente + 1)
- [ ] Il task creato ha tutti i campi obbligatori (id, title, status, priority, wave, created, updated, context)
- [ ] Il campo context e' in italiano e descrive l'origine del task
- [ ] Il task e' posizionato nella sezione corretta per la sua priorita'

## Note Tecniche

- Dipendenza: US-001 (Claude Code deve aver letto TASKS.yaml)
- Pattern di riconoscimento intenzioni: "dovremmo", "sarebbe bello", "prima o poi", "bug", "non funziona", "crea un task", "aggiungi", "implementa"
- Il riconoscimento avra' falsi negativi (accettabile in v1 -- Christian puo' creare task esplicitamente)
- I falsi positivi sono mitigati completamente dal protocollo di conferma
