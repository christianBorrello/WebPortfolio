# Feature: Validazione Schema TASKS.yaml
# Sistema Centralizzato di Task Tracking -- WebPortfolio
# Wave: DISTILL -- 2026-03-03
# Copre: US-006 (creazione TASKS.yaml), US-005 (consultazione stato)
# Tag: @task-tracking @schema

Feature: TASKS.yaml rispetta lo schema definito e mantiene integrita' strutturale
  Come Christian, sviluppatore di WebPortfolio,
  ho bisogno che TASKS.yaml segua uno schema preciso e coerente
  cosi' da poter consultare lo stato del progetto in meno di 30 secondi.

  Background:
    Given TASKS.yaml esiste nella root del repository
    And il file e' YAML valido e parsabile senza errori

  # -------------------------------------------------------------------
  # WALKING SKELETON: il file esiste ed e' strutturalmente valido
  # -------------------------------------------------------------------

  @task-tracking @schema @walking-skeleton
  Scenario: TASKS.yaml esiste con metadati header e lista task
    Then il file contiene il campo "schema_version" con valore "1.0"
    And il file contiene il campo "last_updated" in formato ISO 8601 con timezone
    And il file contiene il campo "updated_by" con valore "claude-code" o "christian"
    And il file contiene una lista "tasks" con almeno un elemento

  @task-tracking @schema @walking-skeleton
  Scenario: Ogni task ha tutti i campi obbligatori compilati
    Then ogni task ha un campo "id" con formato "task-NNN"
    And ogni task ha un campo "title" non vuoto
    And ogni task ha un campo "status" con valore valido
    And ogni task ha un campo "priority" con valore valido
    And ogni task ha un campo "wave" con valore valido
    And ogni task ha un campo "created" in formato data ISO 8601
    And ogni task ha un campo "updated" in formato data ISO 8601
    And ogni task ha un campo "context" non vuoto

  # -------------------------------------------------------------------
  # VALORI ENUM: status, priority, wave rispettano i valori ammessi
  # -------------------------------------------------------------------

  @task-tracking @schema @skip
  Scenario: I valori di status sono solo quelli ammessi dallo schema
    Then ogni task ha status tra "open", "in-progress", "blocked", "done", "cancelled"
    And nessun task ha un valore di status non riconosciuto

  @task-tracking @schema @skip
  Scenario: I valori di priority sono solo quelli ammessi dallo schema
    Then ogni task ha priority tra "high", "normal", "low"
    And nessun task ha un valore di priority non riconosciuto

  @task-tracking @schema @skip
  Scenario: I valori di wave sono solo quelli ammessi dallo schema
    Then ogni task ha wave tra "brainstorm", "discover", "discuss", "design", "devops", "distill", "deliver", "done", "skipped"
    And nessun task ha un valore di wave non riconosciuto

  # -------------------------------------------------------------------
  # FORMATO ID: auto-incrementale, univoco, formato corretto
  # -------------------------------------------------------------------

  @task-tracking @schema @skip
  Scenario: Gli id dei task sono univoci
    Then nessun id e' duplicato nella lista task

  @task-tracking @schema @skip
  Scenario: Gli id seguono il formato task-NNN con numeri crescenti
    Then ogni id corrisponde al pattern "task-" seguito da cifre
    And gli id sono in sequenza senza salti superiori a 10

  # -------------------------------------------------------------------
  # ORDINAMENTO: priorita' decrescente e urgenza dentro la stessa priorita'
  # -------------------------------------------------------------------

  @task-tracking @schema @skip
  Scenario: I task sono ordinati per priorita' decrescente
    Then i task con priority "high" appaiono prima di quelli con priority "normal"
    And i task con priority "normal" appaiono prima di quelli con priority "low"

  @task-tracking @schema @skip
  Scenario: Dentro la stessa priorita' i task urgenti appaiono prima
    Given almeno due task hanno la stessa priority
    Then i task con status "in-progress" appaiono prima di quelli con status "open"
    And i task con status "open" appaiono prima di quelli con status "blocked"

  # -------------------------------------------------------------------
  # CAMPI OPZIONALI: refs, completed_at, notes
  # -------------------------------------------------------------------

  @task-tracking @schema @skip
  Scenario: Il campo refs e' una lista di path relativi o una lista vuota
    Then ogni task ha un campo "refs" che e' una lista
    And ogni elemento di "refs" e' una stringa non vuota

  @task-tracking @schema @skip
  Scenario: Il campo completed_at e' compilato solo per task con status done
    Then ogni task con status "done" ha "completed_at" con una data valida
    And ogni task con status diverso da "done" ha "completed_at" null

  @task-tracking @schema @skip
  Scenario: Il campo notes e' null o una stringa non vuota
    Then ogni task ha un campo "notes" che e' null o una stringa non vuota

  # -------------------------------------------------------------------
  # INTEGRITA' LINGUISTICA: contenuti in italiano, campi in inglese
  # -------------------------------------------------------------------

  @task-tracking @schema @skip
  Scenario: TASKS.yaml non contiene task con status done (sono archiviati)
    Then nessun task nella lista ha status "done"

  @task-tracking @schema @skip
  Scenario: Il file e' un puntatore e non contiene dettagli di roadmap
    Then nessun task contiene acceptance criteria nel campo context
    And nessun task contiene percentuali di completamento
    And nessun task contiene step dettagliati di implementazione
