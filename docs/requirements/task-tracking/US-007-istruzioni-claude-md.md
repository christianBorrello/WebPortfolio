# US-007: Istruzioni in CLAUDE.md per il mantenimento automatico

## Problema (Il Dolore)

Christian e' uno sviluppatore che lavora con Claude Code. Ogni sessione
di Claude Code parte senza memoria delle sessioni precedenti. Senza
istruzioni esplicite in CLAUDE.md, Claude Code non sa dell'esistenza
di TASKS.yaml, non sa come gestirlo, e non segue il protocollo di conferma.
Le istruzioni devono essere la "legge" che governa il comportamento di
Claude Code verso il tracker.

## Chi (L'Utente)

- Claude Code, che legge CLAUDE.md all'inizio di ogni sessione
- Christian, che scrive le istruzioni e si aspetta che vengano seguite

## Soluzione (Cosa Costruiamo)

Una sezione dedicata in CLAUDE.md con regole operative chiare per
la gestione di TASKS.yaml: lettura all'inizio, conferma obbligatoria,
formato dei messaggi, regole di ordinamento, archiviazione.

## Esempi di Dominio

### Esempio 1: Le istruzioni guidano il comportamento (happy path)

Claude Code avvia una sessione, legge CLAUDE.md, trova la sezione
"Task Tracker". Sa che deve leggere TASKS.yaml come prima cosa.
Sa che non puo' creare task senza conferma. Sa che il formato del
messaggio e' "Nuovo task rilevato: \"[titolo]\". Registro?". Sa
che i task completati vanno archiviati.

### Esempio 2: Le istruzioni prevengono errori

Claude Code sta per aggiornare lo status di un task autonomamente.
Le istruzioni dicono "chiedi SEMPRE conferma". Claude Code si ferma
e chiede conferma a Christian prima di modificare TASKS.yaml.

### Esempio 3: Le istruzioni definiscono la lingua

Claude Code sta per scrivere un title in inglese. Le istruzioni dicono
"contenuti in italiano". Claude Code scrive il title in italiano:
"Correggere bug form contatto" invece di "Fix contact form bug".

## Scenari UAT (BDD)

### Scenario: CLAUDE.md contiene la sezione Task Tracker
Given CLAUDE.md esiste nella root del repository
When Claude Code legge CLAUDE.md
Then trova una sezione dedicata al Task Tracker
And la sezione contiene le regole di gestione di TASKS.yaml

### Scenario: Le istruzioni specificano la lettura all'inizio
Given CLAUDE.md contiene la sezione Task Tracker
When Claude Code legge le istruzioni
Then trova la regola "Leggi TASKS.yaml all'inizio di ogni sessione"
And la regola e' la prima della lista

### Scenario: Le istruzioni definiscono il protocollo di conferma
Given CLAUDE.md contiene la sezione Task Tracker
When Claude Code legge le istruzioni
Then trova la regola "Non creare mai task senza conferma dell'utente"
And trova la regola "Chiedi conferma anche per cambi di stato"
And trova il formato del messaggio di conferma

### Scenario: Le istruzioni definiscono la lingua dei contenuti
Given CLAUDE.md contiene la sezione Task Tracker
When Claude Code legge le istruzioni
Then trova la regola "Contenuti (titoli, contesto, note) in italiano"
And trova la regola "Campi e valori enum in inglese"

### Scenario: Le istruzioni definiscono l'archiviazione
Given CLAUDE.md contiene la sezione Task Tracker
When Claude Code legge le istruzioni
Then trova la regola di archiviazione dei task completati
And trova il percorso docs/archive/tasks-YYYY.yaml
And trova la regola append-only per il file di archivio

## Criteri di Accettazione

- [ ] CLAUDE.md contiene una sezione "Task Tracker" con regole operative
- [ ] Prima regola: leggere TASKS.yaml all'inizio di ogni sessione
- [ ] Regola di conferma: non creare task ne' cambiare stato senza conferma
- [ ] Formato messaggio conferma creazione: "Nuovo task rilevato: \"[titolo]\". Registro?"
- [ ] Formato messaggio conferma stato: "task-NNN \"[titolo]\" e' [status_attuale]. Aggiorno a [nuovo_status]?"
- [ ] Regola lingua: contenuti in italiano, campi e enum in inglese
- [ ] Regola ordinamento: priorita' decrescente, task urgenti prima
- [ ] Regola archiviazione: task done spostati in docs/archive/tasks-YYYY.yaml
- [ ] Regola puntatore: TASKS.yaml non duplica contenuti dei file referenziati
- [ ] Status e wave validi elencati nelle istruzioni

## Note Tecniche

- Dipendenza: CLAUDE.md deve esistere (o essere creato)
- Questo US produce la "bozza" delle istruzioni gia' definita in solution-testing.md, arricchita con le decisioni della wave DISCUSS (conferma per cambi di stato, tono asciutto, archiviazione)
- Le istruzioni sono la fonte di verita' per il comportamento di Claude Code
- La sezione deve essere concisa: Claude Code legge tutto CLAUDE.md ad ogni sessione
