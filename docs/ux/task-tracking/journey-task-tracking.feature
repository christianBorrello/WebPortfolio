# Feature: Sistema Centralizzato di Task Tracking
# WebPortfolio -- Developer Tooling
# Lingua: it
# Wave: DISCUSS -- 2026-03-03

Feature: TASKS.yaml fornisce visibilita' centralizzata su tutti i task del progetto

  Background:
    Given TASKS.yaml esiste nella root del repository
    And il file segue lo schema versione "1.0"
    And i contenuti (titoli, contesto, note) sono in italiano
    And i campi e i valori enum sono in inglese
    And i task sono ordinati per priorita' decrescente (high > normal > low)


  # ---------------------------------------------------------------
  # JOURNEY A: RILEVAMENTO E REGISTRAZIONE TASK
  # ---------------------------------------------------------------

  Scenario: Claude Code legge TASKS.yaml all'inizio della sessione
    Given Claude Code avvia una nuova sessione
    And TASKS.yaml contiene 4 task di cui 1 con status in-progress
    When Claude Code inizia a lavorare
    Then Claude Code ha letto TASKS.yaml
    And Claude Code conosce il task in-progress "Correggere bug form contatto con caratteri speciali"

  Scenario: Claude Code rileva un'intenzione implicita e chiede conferma
    Given Christian sta lavorando con Claude Code sul task "Correggere bug form contatto"
    When Christian dice "Prima o poi dovremmo aggiungere il dark mode"
    Then Claude Code interrompe subito e mostra "Nuovo task rilevato: \"Aggiungere dark mode toggle\". Registro in TASKS.yaml?"
    And Claude Code non ha ancora modificato TASKS.yaml

  Scenario: Claude Code rileva un'intenzione esplicita e chiede conferma
    Given Christian sta lavorando con Claude Code
    When Christian dice "Crea un task per aggiungere la versione tedesca del portfolio"
    Then Claude Code mostra "Nuovo task rilevato: \"Aggiungere versione tedesca del portfolio\". Registro in TASKS.yaml?"
    And Claude Code non ha ancora modificato TASKS.yaml

  Scenario: Christian conferma la registrazione di un task
    Given Claude Code ha chiesto "Nuovo task rilevato: \"Aggiungere dark mode toggle\". Registro in TASKS.yaml?"
    And TASKS.yaml contiene task fino a task-006
    When Christian conferma con "Si"
    Then Claude Code aggiunge un task con id "task-007" a TASKS.yaml
    And il task ha title "Aggiungere dark mode toggle"
    And il task ha status "open"
    And il task ha priority "normal"
    And il task ha un campo context in italiano che descrive l'origine
    And il task e' posizionato nella sezione corretta per la sua priorita'
    And last_updated e' aggiornato alla data corrente
    And Claude Code mostra "Registrato: task-007 \"Aggiungere dark mode toggle\". Status: open. Priority: normal."

  Scenario: Christian rifiuta la registrazione di un task
    Given Claude Code ha chiesto "Nuovo task rilevato: \"Aggiungere dark mode toggle\". Registro in TASKS.yaml?"
    When Christian dice "No"
    Then Claude Code non modifica TASKS.yaml
    And Claude Code continua il lavoro corrente senza ulteriori domande sul task rifiutato

  Scenario: Claude Code non crea mai un task senza conferma
    Given Christian sta lavorando con Claude Code
    And Christian menziona "Il form di contatto ha un bug con i caratteri speciali"
    When Claude Code riconosce l'intenzione
    Then Claude Code chiede conferma prima di qualsiasi modifica a TASKS.yaml
    And il numero di task in TASKS.yaml non cambia fino alla conferma


  # ---------------------------------------------------------------
  # JOURNEY B: AGGIORNAMENTO STATO
  # ---------------------------------------------------------------

  Scenario: Claude Code chiede conferma per aggiornare lo status a in-progress
    Given TASKS.yaml contiene task-003 "Correggere bug form contatto" con status "open"
    And Claude Code inizia a lavorare sulla correzione del bug
    When Claude Code riconosce che il lavoro corrisponde a task-003
    Then Claude Code mostra "task-003 \"Correggere bug form contatto\" e' open. Aggiorno a in-progress?"
    And Claude Code non ha ancora modificato TASKS.yaml

  Scenario: Christian conferma l'aggiornamento di status
    Given Claude Code ha chiesto di aggiornare task-003 a in-progress
    When Christian conferma
    Then task-003 ha status "in-progress" in TASKS.yaml
    And task-003 ha updated aggiornato alla data corrente
    And last_updated del file e' aggiornato

  Scenario: Claude Code chiede conferma per segnare un task come completato
    Given task-003 "Correggere bug form contatto" ha status "in-progress"
    And Claude Code ha completato il lavoro sulla correzione
    When Claude Code propone il completamento
    Then Claude Code mostra "task-003 \"Correggere bug form contatto\" completato. Segno come done?"
    And Claude Code non ha ancora modificato TASKS.yaml

  Scenario: Christian conferma il completamento e il task viene archiviato
    Given Claude Code ha chiesto di segnare task-003 come done
    When Christian conferma
    Then task-003 ha status "done" e wave "done" in TASKS.yaml
    And task-003 ha completed_at impostato alla data corrente
    And Claude Code sposta task-003 da TASKS.yaml a docs/archive/tasks-2026.yaml
    And task-003 non e' piu' presente in TASKS.yaml
    And Claude Code mostra "task-003 archiviato in docs/archive/tasks-2026.yaml."


  # ---------------------------------------------------------------
  # JOURNEY C: CONSULTAZIONE STATO
  # ---------------------------------------------------------------

  Scenario: Christian capisce lo stato del progetto in meno di 30 secondi
    Given TASKS.yaml contiene 4 task attivi
    And 1 task ha priority high e status in-progress
    And 2 task hanno priority normal (1 in-progress, 1 open)
    And 1 task ha priority low e status open
    When Christian apre TASKS.yaml nell'IDE
    Then i task high sono visibili per primi
    And i task in-progress sono distinguibili dai task open
    And la wave di ogni task indica il punto nel flusso nWave

  Scenario: Christian consulta un task lasciato a meta'
    Given TASKS.yaml contiene task-001 "Implementare task tracking" con status "in-progress"
    And task-001 ha refs che puntano a docs/discovery/task-tracking/
    When Christian apre TASKS.yaml e individua task-001
    Then Christian legge il campo context per ricordare l'origine del task
    And Christian segue i refs per approfondire lo stato dettagliato

  Scenario: TASKS.yaml non contiene task completati (sono archiviati)
    Given 3 task sono stati completati e archiviati in docs/archive/tasks-2026.yaml
    And 4 task sono attivi con status diversi da done
    When Christian apre TASKS.yaml
    Then TASKS.yaml contiene solo i 4 task attivi
    And nessun task con status done e' presente nel file


  # ---------------------------------------------------------------
  # SCHEMA E INTEGRITA'
  # ---------------------------------------------------------------

  Scenario: Ogni task ha tutti i campi obbligatori
    Given un nuovo task viene aggiunto a TASKS.yaml
    Then il task ha un campo id con formato "task-NNN"
    And il task ha un campo title non vuoto in italiano
    And il task ha un campo status con valore valido
    And il task ha un campo priority con valore valido
    And il task ha un campo wave con valore valido
    And il task ha un campo created con data ISO 8601
    And il task ha un campo updated con data ISO 8601
    And il task ha un campo context non vuoto in italiano

  Scenario: L'id del task e' auto-incrementale
    Given TASKS.yaml contiene task con id massimo task-006
    When Claude Code aggiunge un nuovo task
    Then il nuovo task ha id "task-007"

  Scenario: TASKS.yaml e' un puntatore, non una roadmap
    Given TASKS.yaml contiene task-001 con refs a docs/discovery/task-tracking/
    When Christian o Claude Code consulta task-001
    Then il task contiene solo titolo, status, wave e riferimenti
    And il task non contiene step dettagliati, acceptance criteria o percentuali
    And il dettaglio vive nei file referenziati nei refs

  Scenario: Il file di archivio e' append-only
    Given docs/archive/tasks-2026.yaml contiene 2 task archiviati
    When Claude Code archivia un terzo task
    Then il terzo task viene aggiunto in fondo al file di archivio
    And i 2 task precedenti non vengono modificati

  Scenario: Il file YAML resta valido dopo ogni modifica
    Given TASKS.yaml e' un file YAML valido
    When Claude Code aggiunge, modifica o rimuove un task
    Then TASKS.yaml resta un file YAML valido con indentazione corretta
    And nessun campo obbligatorio e' mancante
