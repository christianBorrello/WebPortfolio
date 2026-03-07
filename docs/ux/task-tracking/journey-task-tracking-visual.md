# Journey Map -- Sistema Centralizzato di Task Tracking
# WebPortfolio -- Developer Tooling
# Lingua: it
# Wave: DISCUSS -- 2026-03-03

## Attori

| Attore | Ruolo | Interazione |
|---|---|---|
| Claude Code | Gestore primario: legge, scrive, aggiorna TASKS.yaml | Ogni sessione |
| Christian | Revisore: consulta lo stato, approva creazione e modifiche | Giornaliero |

---

## Decisione Aggiornata (rispetto alla Discovery)

La Discovery raccomandava "nessuna archiviazione in v1 (YAGNI)".
Christian ha ora espresso preferenza per l'archiviazione dei task completati
per ridurre rumore e dimensione del file. Questa decisione sostituisce
la precedente e viene integrata in tutti gli artefatti della wave DISCUSS.

---

## Journey A: Claude Code Rileva e Registra un Task

### Arco Emotivo di Christian

```
INIZIO              META'               FINE
Neutro         -->  Consapevole    -->  In controllo
   |                    |                   |
   |                    |                   |
"Sto lavorando      "Claude Code ha     "Decido io cosa
 su altro"           colto qualcosa       entra nel tracker"
                     di utile"
```

### Mappa del Journey

```
+-----------------------------------------------------------------------+
|  STEP A1 -- Inizio sessione                                          |
|  Trigger: Christian avvia una sessione Claude Code                    |
+-----------------------------------------------------------------------+
|                                                                       |
|  COSA FA CLAUDE CODE:                                                 |
|  1. Legge TASKS.yaml                                                  |
|  2. Identifica task in-progress e high priority                       |
|  3. Ha il quadro d'insieme per la sessione                            |
|                                                                       |
|  COSA VEDE CHRISTIAN: Nulla di visibile -- Claude Code legge          |
|  silenziosamente. Il risultato e' che le risposte di Claude Code      |
|  sono informate dal contesto del progetto.                            |
|                                                                       |
|  COME SI SENTE CHRISTIAN: Neutro -- non sa che sta succedendo,        |
|  ma nota che Claude Code "sa gia'" cosa sta succedendo nel progetto.  |
|                                                                       |
|  DATO PRODOTTO: Contesto di sessione (interno a Claude Code)          |
|  DATO CONSUMATO: TASKS.yaml (intero file)                             |
+-----------------------------------------------------------------------+
                                |
                                v
+-----------------------------------------------------------------------+
|  STEP A2 -- Rilevamento intenzione                                   |
|  Trigger: Christian menziona qualcosa che implica un task             |
|  Esempio: "Prima o poi dovremmo aggiungere il dark mode"              |
+-----------------------------------------------------------------------+
|                                                                       |
|  COSA FA CLAUDE CODE:                                                 |
|  Riconosce l'intenzione e interrompe SUBITO per chiedere conferma.    |
|  Non accumula. Non aspetta la fine dell'attivita' corrente.           |
|                                                                       |
|  COSA VEDE CHRISTIAN:                                                 |
|  +-----------------------------------------------------------+       |
|  |                                                           |       |
|  |  Nuovo task rilevato: "Aggiungere dark mode toggle".      |       |
|  |  Registro in TASKS.yaml?                                  |       |
|  |                                                           |       |
|  +-----------------------------------------------------------+       |
|                                                                       |
|  COME SI SENTE CHRISTIAN: Consapevole -- Claude Code ha colto         |
|  qualcosa di utile senza essere invadente. Il tono asciutto           |
|  non interrompe il flusso mentale.                                    |
|                                                                       |
|  RISCHIO: Se il messaggio e' troppo verboso, diventa una              |
|  distrazione. Deve essere una riga, massimo due.                     |
+-----------------------------------------------------------------------+
                                |
                   +------------+------------+
                   |                         |
                   v                         v
+-------------------------------+  +-------------------------------+
|  STEP A3a -- Conferma         |  |  STEP A3b -- Rifiuto          |
|  Christian: "Si"              |  |  Christian: "No"              |
+-------------------------------+  +-------------------------------+
|                               |  |                               |
|  COSA FA CLAUDE CODE:         |  |  COSA FA CLAUDE CODE:         |
|  1. Genera id (task-NNN)      |  |  Nulla. Non registra.         |
|  2. Aggiunge task a           |  |  Continua il lavoro           |
|     TASKS.yaml con:           |  |  corrente.                    |
|     - status: open            |  |                               |
|     - priority: normal        |  |  COME SI SENTE CHRISTIAN:     |
|     - wave: appropriata       |  |  In controllo -- ha deciso    |
|     - context: in italiano    |  |  lui, nessuna frizione.       |
|  3. Aggiorna last_updated     |  |                               |
|  4. Mantiene ordine per       |  +-------------------------------+
|     priorita'                 |
|                               |
|  COSA VEDE CHRISTIAN:         |
|  +-------------------------+  |
|  |                         |  |
|  |  Registrato: task-007   |  |
|  |  "Aggiungere dark mode  |  |
|  |   toggle"               |  |
|  |  Status: open           |  |
|  |  Priority: normal       |  |
|  |                         |  |
|  +-------------------------+  |
|                               |
|  COME SI SENTE CHRISTIAN:     |
|  In controllo -- il task e'   |
|  registrato, puo' tornare     |
|  a lavorare su altro.         |
|                               |
|  DATO PRODOTTO: Nuovo task    |
|  in TASKS.yaml                |
+-------------------------------+
```

---

## Journey B: Claude Code Aggiorna lo Stato di un Task

### Arco Emotivo di Christian

```
INIZIO              META'               FINE
Concentrato    -->  Informato      -->  In controllo
   |                    |                   |
   |                    |                   |
"Sto lavorando      "Claude Code mi     "Lo stato e' allineato,
 su questo task"     chiede di           posso andare avanti"
                     aggiornare"
```

### Mappa del Journey

```
+-----------------------------------------------------------------------+
|  STEP B1 -- Claude Code inizia a lavorare su un task registrato       |
|  Trigger: Il lavoro della sessione corrisponde a un task in           |
|           TASKS.yaml                                                  |
+-----------------------------------------------------------------------+
|                                                                       |
|  COSA FA CLAUDE CODE:                                                 |
|  Riconosce che il lavoro corrente corrisponde a un task registrato    |
|  e chiede conferma per aggiornare lo status.                          |
|                                                                       |
|  COSA VEDE CHRISTIAN:                                                 |
|  +-----------------------------------------------------------+       |
|  |                                                           |       |
|  |  task-003 "Correggere bug form contatto" e' attualmente   |       |
|  |  open. Aggiorno a in-progress?                            |       |
|  |                                                           |       |
|  +-----------------------------------------------------------+       |
|                                                                       |
|  COME SI SENTE CHRISTIAN: Informato -- conferma che Claude Code       |
|  sta lavorando sul task giusto.                                       |
|                                                                       |
|  DECISIONE: Claude Code NON aggiorna status in autonomia.             |
|  Chiede SEMPRE conferma, anche per i cambi di stato.                  |
+-----------------------------------------------------------------------+
                                |
                                v
+-----------------------------------------------------------------------+
|  STEP B2 -- Completamento del task                                    |
|  Trigger: Claude Code ha completato il lavoro su un task              |
+-----------------------------------------------------------------------+
|                                                                       |
|  COSA FA CLAUDE CODE:                                                 |
|  Chiede conferma per segnare il task come completato.                 |
|                                                                       |
|  COSA VEDE CHRISTIAN:                                                 |
|  +-----------------------------------------------------------+       |
|  |                                                           |       |
|  |  task-003 "Correggere bug form contatto" completato.      |       |
|  |  Segno come done?                                         |       |
|  |                                                           |       |
|  +-----------------------------------------------------------+       |
|                                                                       |
|  DOPO CONFERMA, CLAUDE CODE:                                          |
|  1. Imposta status: done                                              |
|  2. Imposta wave: done                                                |
|  3. Compila completed_at con la data corrente                         |
|  4. Sposta il task nella sezione "done" o lo archivia                 |
|  5. Aggiorna last_updated                                             |
|                                                                       |
|  COME SI SENTE CHRISTIAN: Soddisfazione -- il ciclo e' chiuso.       |
+-----------------------------------------------------------------------+
                                |
                                v
+-----------------------------------------------------------------------+
|  STEP B3 -- Archiviazione del task completato                         |
|  Trigger: Un task e' stato segnato come done                          |
+-----------------------------------------------------------------------+
|                                                                       |
|  COSA FA CLAUDE CODE:                                                 |
|  Sposta il task completato da TASKS.yaml a                            |
|  docs/archive/tasks-YYYY.yaml (anno corrente).                        |
|  L'archiviazione avviene in modo trasparente dopo la conferma         |
|  del completamento -- un unico passaggio per Christian.               |
|                                                                       |
|  COSA VEDE CHRISTIAN:                                                 |
|  +-----------------------------------------------------------+       |
|  |                                                           |       |
|  |  task-003 archiviato in docs/archive/tasks-2026.yaml.     |       |
|  |                                                           |       |
|  +-----------------------------------------------------------+       |
|                                                                       |
|  COME SI SENTE CHRISTIAN: Pulizia -- il file resta snello,            |
|  solo task attivi.                                                     |
|                                                                       |
|  DATO PRODOTTO: Task spostato in archivio annuale                     |
|  DATO CONSUMATO: TASKS.yaml, docs/archive/tasks-YYYY.yaml            |
+-----------------------------------------------------------------------+
```

---

## Journey C: Christian Consulta lo Stato

### Arco Emotivo di Christian

```
INIZIO              META'               FINE
Orientamento   -->  Chiarezza      -->  Decisione
   |                    |                   |
   |                    |                   |
"Dove eravamo       "Ok, la situazione  "So cosa fare
 rimasti?"           e' chiara"          adesso"
```

### Mappa del Journey

```
+-----------------------------------------------------------------------+
|  STEP C1 -- Apertura del file                                         |
|  Trigger: Christian apre TASKS.yaml nell'IDE                          |
|  Momento: Inizio sessione o durante il lavoro                         |
+-----------------------------------------------------------------------+
|                                                                       |
|  COSA VEDE CHRISTIAN:                                                 |
|                                                                       |
|  +----- TASKS.yaml (IDE) ----------------------------------+         |
|  |                                                         |         |
|  |  schema_version: "1.0"                                  |         |
|  |  last_updated: "2026-03-03T15:00:00Z"                   |         |
|  |  updated_by: "claude-code"                              |         |
|  |                                                         |         |
|  |  tasks:                                                 |         |
|  |    # --- high ---                                       |         |
|  |    - id: task-003                                       |         |
|  |      title: "Correggere bug form contatto con           |         |
|  |              caratteri speciali"                        |         |
|  |      status: in-progress                                |         |
|  |      priority: high                                     |         |
|  |      wave: deliver                                      |         |
|  |                                                         |         |
|  |    # --- normal ---                                     |         |
|  |    - id: task-001                                       |         |
|  |      title: "Implementare sistema centralizzato         |         |
|  |              di task tracking"                          |         |
|  |      status: in-progress                                |         |
|  |      priority: normal                                   |         |
|  |      wave: discuss                                      |         |
|  |                                                         |         |
|  |    - id: task-004                                       |         |
|  |      title: "Valutare aggiunta dark mode toggle"        |         |
|  |      status: open                                       |         |
|  |      priority: normal                                   |         |
|  |      wave: brainstorm                                   |         |
|  |                                                         |         |
|  |    # --- low ---                                        |         |
|  |    - id: task-002                                       |         |
|  |      title: "Aggiungere versione tedesca"               |         |
|  |      status: open                                       |         |
|  |      priority: low                                      |         |
|  |      wave: brainstorm                                   |         |
|  |                                                         |         |
|  +---------------------------------------------------------+         |
|                                                                       |
|  ORDINE DI SCANSIONE DI CHRISTIAN:                                    |
|  1. Priority (blocchi high / normal / low)                            |
|  2. Status (in-progress prima di open)                                |
|  3. Wave (a che punto siamo nel flusso)                               |
|                                                                       |
|  COME SI SENTE CHRISTIAN: Chiarezza -- in pochi secondi sa            |
|  quanti task ci sono, quali sono urgenti, cosa e' in corso.           |
|                                                                       |
|  RISCHIO: Se il file contiene troppi task completati (done),          |
|  il segnale si perde nel rumore. L'archiviazione risolve questo.      |
+-----------------------------------------------------------------------+
                                |
                                v
+-----------------------------------------------------------------------+
|  STEP C2 -- Decisione                                                 |
|  Christian decide su cosa lavorare o verifica un task lasciato        |
|  a meta'                                                              |
+-----------------------------------------------------------------------+
|                                                                       |
|  CASO 1: Inizio sessione                                              |
|  Christian guarda i task high priority e in-progress.                  |
|  Decide quale riprendere o quale iniziare.                            |
|                                                                       |
|  CASO 2: Durante il lavoro                                            |
|  Christian ha lasciato un task a meta'. Apre TASKS.yaml per           |
|  capire lo stato e leggere il contesto. Segue i refs per             |
|  approfondire.                                                        |
|                                                                       |
|  COME SI SENTE CHRISTIAN: Decisione -- sa cosa fare adesso.           |
|                                                                       |
|  DATO CONSUMATO: TASKS.yaml, file referenziati nei refs               |
+-----------------------------------------------------------------------+
```

---

## Percorsi di Errore

### E1: Claude Code non legge TASKS.yaml all'inizio della sessione

```
Causa: Istruzioni mancanti o non seguite in CLAUDE.md
Effetto: Claude Code lavora senza contesto, rischia di ignorare task aperti
Mitigazione: Istruzione esplicita in CLAUDE.md come prima regola
Rilevamento: Christian nota che Claude Code non sa di task esistenti
Recupero: Christian chiede esplicitamente "leggi TASKS.yaml"
```

### E2: Claude Code crea un task senza conferma

```
Causa: Bug nel comportamento o istruzioni ambigue
Effetto: Task non desiderato in TASKS.yaml
Mitigazione: Protocollo di conferma obbligatoria come regola non negoziabile
Rilevamento: Christian vede un task che non riconosce
Recupero: Christian chiede di rimuoverlo; Claude Code lo elimina
```

### E3: TASKS.yaml si disallinea dalla realta'

```
Causa: Claude Code dimentica di aggiornare lo status dopo aver completato
       un lavoro, oppure il task viene completato fuori da una sessione
Effetto: Il file dice "in-progress" ma il lavoro e' gia' finito
Mitigazione: Conferma obbligatoria per ogni cambio di stato;
             Christian fa review periodica
Rilevamento: Christian apre il file e nota incongruenze
Recupero: Christian chiede a Claude Code di allineare gli status
```

### E4: File YAML corrotto o malformato

```
Causa: Errore di editing (indentazione, caratteri speciali)
Effetto: Claude Code non riesce a fare parse del file
Mitigazione: Claude Code valida il YAML dopo ogni scrittura
Rilevamento: Errore di parse alla lettura successiva
Recupero: Claude Code corregge la formattazione; il file e' sotto git,
          quindi e' sempre possibile fare rollback
```
