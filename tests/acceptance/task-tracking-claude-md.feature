# Feature: Validazione Istruzioni CLAUDE.md per Task Tracker
# Sistema Centralizzato di Task Tracking -- WebPortfolio
# Wave: DISTILL -- 2026-03-03
# Copre: US-007 (istruzioni CLAUDE.md)
# Tag: @task-tracking @convention

Feature: CLAUDE.md contiene istruzioni operative complete per la gestione del task tracker
  Come Christian, sviluppatore di WebPortfolio,
  ho bisogno che CLAUDE.md contenga regole chiare per Claude Code
  cosi' che il task tracker venga gestito correttamente in ogni sessione.

  Background:
    Given CLAUDE.md esiste nella root del repository

  # -------------------------------------------------------------------
  # WALKING SKELETON: la sezione Task Tracker esiste e ha contenuto
  # -------------------------------------------------------------------

  @task-tracking @convention @walking-skeleton
  Scenario: CLAUDE.md contiene la sezione Task Tracker con le regole operative
    Then il file contiene una sezione intitolata "Task Tracker"
    And la sezione contiene almeno 10 regole operative numerate
    And la sezione contiene la sottosezione "Regole"
    And la sezione contiene la sottosezione "Lingua"
    And la sezione contiene la sottosezione "Status validi"
    And la sezione contiene la sottosezione "Wave valide"
    And la sezione contiene la sottosezione "Archiviazione"

  # -------------------------------------------------------------------
  # REGOLA LETTURA: prima regola della lista
  # -------------------------------------------------------------------

  @task-tracking @convention @skip
  Scenario: La prima regola richiede la lettura di TASKS.yaml a inizio sessione
    Then la prima regola della sezione Task Tracker menziona "Leggi TASKS.yaml all'inizio di ogni sessione"

  # -------------------------------------------------------------------
  # PROTOCOLLO DI CONFERMA: formati dei messaggi
  # -------------------------------------------------------------------

  @task-tracking @convention @skip
  Scenario: Le istruzioni definiscono il formato di conferma per la creazione di task
    Then la sezione contiene il testo "Nuovo task rilevato:"
    And la sezione contiene il testo "Registro?"

  @task-tracking @convention @skip
  Scenario: Le istruzioni definiscono il formato di conferma per il cambio stato
    Then la sezione contiene il testo "Aggiorno a"

  @task-tracking @convention @skip
  Scenario: Le istruzioni definiscono il formato di conferma per il completamento
    Then la sezione contiene il testo "Segno come done?"

  # -------------------------------------------------------------------
  # REGOLA CONFERMA OBBLIGATORIA
  # -------------------------------------------------------------------

  @task-tracking @convention @skip
  Scenario: Le istruzioni richiedono conferma obbligatoria per ogni operazione
    Then la sezione contiene il testo "Conferma obbligatoria"
    And la sezione contiene il testo "Non creare task" o "non cambiare status" con riferimento alla conferma

  # -------------------------------------------------------------------
  # REGOLE LINGUA
  # -------------------------------------------------------------------

  @task-tracking @convention @skip
  Scenario: Le istruzioni specificano la lingua dei contenuti e dei campi
    Then la sottosezione "Lingua" menziona "italiano" per i contenuti
    And la sottosezione "Lingua" menziona "inglese" per i campi e i valori enum

  # -------------------------------------------------------------------
  # STATUS E TRANSIZIONI
  # -------------------------------------------------------------------

  @task-tracking @convention @skip
  Scenario: Le istruzioni elencano tutti i valori di status validi
    Then la sottosezione "Status validi" contiene "open"
    And la sottosezione "Status validi" contiene "in-progress"
    And la sottosezione "Status validi" contiene "blocked"
    And la sottosezione "Status validi" contiene "done"
    And la sottosezione "Status validi" contiene "cancelled"

  @task-tracking @convention @skip
  Scenario: Le istruzioni elencano le transizioni di stato valide
    Then la sezione contiene le transizioni "open -> in-progress"
    And la sezione contiene le transizioni "open -> cancelled"
    And la sezione contiene le transizioni "in-progress -> done"
    And la sezione contiene le transizioni "in-progress -> blocked"
    And la sezione contiene le transizioni "blocked -> in-progress"
    And la sezione contiene le transizioni "blocked -> cancelled"

  # -------------------------------------------------------------------
  # WAVE VALIDE
  # -------------------------------------------------------------------

  @task-tracking @convention @skip
  Scenario: Le istruzioni elencano tutti i valori di wave validi
    Then la sottosezione "Wave valide" contiene "brainstorm"
    And la sottosezione "Wave valide" contiene "discover"
    And la sottosezione "Wave valide" contiene "discuss"
    And la sottosezione "Wave valide" contiene "design"
    And la sottosezione "Wave valide" contiene "devops"
    And la sottosezione "Wave valide" contiene "distill"
    And la sottosezione "Wave valide" contiene "deliver"
    And la sottosezione "Wave valide" contiene "done"
    And la sottosezione "Wave valide" contiene "skipped"

  # -------------------------------------------------------------------
  # ARCHIVIAZIONE
  # -------------------------------------------------------------------

  @task-tracking @convention @skip
  Scenario: Le istruzioni definiscono la convenzione di archiviazione
    Then la sottosezione "Archiviazione" menziona "docs/archive/tasks-YYYY.yaml"
    And la sottosezione "Archiviazione" menziona "spostati" o "append-only"

  # -------------------------------------------------------------------
  # REGOLA FILE ASSENTE
  # -------------------------------------------------------------------

  @task-tracking @convention @skip
  Scenario: Le istruzioni specificano il comportamento quando TASKS.yaml non esiste
    Then la sezione contiene una regola per il caso "TASKS.yaml non esiste"
    And la regola indica di segnalare l'assenza senza creare il file

  # -------------------------------------------------------------------
  # ORDINAMENTO E PUNTATORE
  # -------------------------------------------------------------------

  @task-tracking @convention @skip
  Scenario: Le istruzioni specificano l'ordinamento per priorita'
    Then la sezione menziona l'ordinamento "high > normal > low"

  @task-tracking @convention @skip
  Scenario: Le istruzioni indicano che TASKS.yaml e' un puntatore
    Then la sezione menziona "puntatore" o "Non duplicare"
