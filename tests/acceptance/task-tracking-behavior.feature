# Feature: Specifiche Comportamentali di Claude Code per Task Tracking
# Sistema Centralizzato di Task Tracking -- WebPortfolio
# Wave: DISTILL -- 2026-03-03
# Copre: US-001 (lettura contesto), US-002 (rilevamento task), US-003 (aggiornamento stato), US-004 (archiviazione)
# Tag: @task-tracking @claude-behavior
#
# NOTA: Questi scenari documentano il contratto comportamentale atteso da Claude Code.
# Non sono eseguibili in CI perche' il comportamento di Claude Code non e' testabile
# programmaticamente. Servono come specifica eseguibile per validazione manuale
# e come documentazione vivente del protocollo.

Feature: Claude Code gestisce TASKS.yaml seguendo il protocollo di conferma
  Come Christian, sviluppatore di WebPortfolio,
  ho bisogno che Claude Code segua regole precise nella gestione del task tracker
  cosi' da mantenere il controllo completo su cosa entra nel file e come cambia.

  # -------------------------------------------------------------------
  # JOURNEY A: LETTURA CONTESTO A INIZIO SESSIONE (US-001)
  # -------------------------------------------------------------------

  @task-tracking @claude-behavior @skip
  Scenario: Claude Code legge TASKS.yaml all'inizio della sessione
    Given Claude Code avvia una nuova sessione
    And TASKS.yaml contiene 4 task di cui 1 con status "in-progress" e priority "high"
    When Claude Code inizia a lavorare
    Then Claude Code ha letto TASKS.yaml
    And Claude Code conosce il task in-progress ad alta priorita'

  @task-tracking @claude-behavior @skip
  Scenario: Claude Code segnala l'assenza di TASKS.yaml senza creare il file
    Given Claude Code avvia una nuova sessione
    And TASKS.yaml non esiste nella root del repository
    When Claude Code cerca il file dei task
    Then Claude Code segnala che TASKS.yaml non e' presente
    And Claude Code non crea il file autonomamente

  @task-tracking @claude-behavior @skip
  Scenario: Claude Code gestisce un TASKS.yaml vuoto senza errori
    Given Claude Code avvia una nuova sessione
    And TASKS.yaml esiste ma la lista task e' vuota
    When Claude Code legge il file
    Then Claude Code riconosce che non ci sono task registrati
    And Claude Code procede normalmente senza errori

  # -------------------------------------------------------------------
  # JOURNEY B: RILEVAMENTO E REGISTRAZIONE TASK (US-002)
  # -------------------------------------------------------------------

  @task-tracking @claude-behavior @skip
  Scenario: Claude Code rileva un'intenzione implicita e chiede conferma
    Given Christian sta lavorando con Claude Code sul task "Correggere bug form contatto"
    When Christian dice "Prima o poi dovremmo aggiungere il dark mode"
    Then Claude Code mostra "Nuovo task rilevato: \"Aggiungere dark mode toggle\". Registro?"
    And Claude Code non ha ancora modificato TASKS.yaml

  @task-tracking @claude-behavior @skip
  Scenario: Claude Code rileva un'intenzione esplicita e chiede conferma
    Given Christian sta lavorando con Claude Code
    When Christian dice "Crea un task per aggiungere la versione tedesca del portfolio"
    Then Claude Code mostra "Nuovo task rilevato: \"Aggiungere versione tedesca del portfolio\". Registro?"
    And Claude Code non ha ancora modificato TASKS.yaml

  @task-tracking @claude-behavior @skip
  Scenario: Christian conferma la registrazione e il task viene creato correttamente
    Given Claude Code ha chiesto conferma per registrare un nuovo task
    And TASKS.yaml contiene task fino a "task-006"
    When Christian conferma con "Si"
    Then Claude Code aggiunge un task con id "task-007" a TASKS.yaml
    And il task ha status "open" e priority "normal"
    And il campo context e' in italiano e descrive l'origine
    And il task e' posizionato nella sezione corretta per la sua priorita'
    And last_updated e' aggiornato
    And Claude Code mostra il messaggio di conferma registrazione

  @task-tracking @claude-behavior @skip
  Scenario: Christian rifiuta la registrazione e TASKS.yaml resta invariato
    Given Claude Code ha chiesto conferma per registrare un nuovo task
    When Christian dice "No"
    Then Claude Code non modifica TASKS.yaml
    And Claude Code continua il lavoro corrente senza ulteriori domande sul task rifiutato

  @task-tracking @claude-behavior @skip
  Scenario: Claude Code non crea mai un task senza conferma esplicita
    Given Christian menziona un possibile task durante la conversazione
    When Claude Code riconosce l'intenzione
    Then Claude Code chiede conferma prima di qualsiasi modifica a TASKS.yaml
    And il numero di task in TASKS.yaml non cambia fino alla conferma

  # -------------------------------------------------------------------
  # JOURNEY C: AGGIORNAMENTO STATO CON CONFERMA (US-003)
  # -------------------------------------------------------------------

  @task-tracking @claude-behavior @skip
  Scenario: Claude Code chiede conferma per aggiornare lo status a in-progress
    Given TASKS.yaml contiene task-003 "Correggere bug form contatto" con status "open"
    And Claude Code inizia a lavorare sulla correzione del bug
    When Claude Code riconosce che il lavoro corrisponde a task-003
    Then Claude Code mostra "task-003 \"Correggere bug form contatto\" e' open. Aggiorno a in-progress?"
    And Claude Code non ha ancora modificato TASKS.yaml

  @task-tracking @claude-behavior @skip
  Scenario: Christian conferma l'aggiornamento e i campi vengono aggiornati
    Given Claude Code ha chiesto di aggiornare task-003 a "in-progress"
    When Christian conferma
    Then task-003 ha status "in-progress" in TASKS.yaml
    And task-003 ha il campo "updated" aggiornato alla data corrente
    And il campo "last_updated" del file e' aggiornato

  @task-tracking @claude-behavior @skip
  Scenario: Claude Code chiede conferma per segnare un task come completato
    Given task-003 "Correggere bug form contatto" ha status "in-progress"
    And Claude Code ha completato il lavoro sulla correzione
    When Claude Code propone il completamento
    Then Claude Code mostra "task-003 \"Correggere bug form contatto\" completato. Segno come done?"
    And Claude Code non ha ancora modificato TASKS.yaml

  @task-tracking @claude-behavior @skip
  Scenario: Claude Code segnala un task bloccato con motivo in italiano
    Given task-005 "Aggiungere analytics con Umami" ha status "in-progress"
    And Claude Code scopre che serve un account esterno
    When Claude Code segnala il blocco
    Then Claude Code chiede conferma per aggiornare a "blocked"
    And il messaggio include il motivo del blocco
    And alla conferma il campo "notes" contiene il motivo in italiano

  @task-tracking @claude-behavior @skip
  Scenario: Christian rifiuta l'aggiornamento e lo status resta invariato
    Given Claude Code ha proposto di aggiornare task-003 a "in-progress"
    When Christian dice "No, non sto lavorando su quello"
    Then lo status di task-003 resta invariato in TASKS.yaml

  @task-tracking @claude-behavior @skip
  Scenario: Claude Code rispetta le transizioni di stato valide
    Given TASKS.yaml contiene task con status "open"
    When Claude Code propone un aggiornamento di stato
    Then la transizione proposta e' tra quelle valide
    And Claude Code non propone transizioni come "open" a "done" o "open" a "blocked"

  # -------------------------------------------------------------------
  # JOURNEY D: ARCHIVIAZIONE TASK COMPLETATI (US-004)
  # -------------------------------------------------------------------

  @task-tracking @claude-behavior @skip
  Scenario: Alla conferma del completamento il task viene archiviato automaticamente
    Given Christian ha confermato che task-003 e' "done"
    When Claude Code completa l'aggiornamento di stato
    Then Claude Code sposta task-003 da TASKS.yaml a docs/archive/tasks-2026.yaml
    And task-003 non e' piu' presente in TASKS.yaml
    And Claude Code mostra "task-003 archiviato in docs/archive/tasks-2026.yaml."

  @task-tracking @claude-behavior @skip
  Scenario: Claude Code crea il file di archivio se non esiste
    Given nessun file di archivio esiste in docs/archive/
    And Christian ha confermato il completamento di un task
    When Claude Code archivia il task
    Then Claude Code crea la directory docs/archive/ se assente
    And Claude Code crea il file docs/archive/tasks-2026.yaml
    And il task archiviato e' il primo elemento nella lista

  @task-tracking @claude-behavior @skip
  Scenario: L'archiviazione non modifica i task gia' archiviati
    Given docs/archive/tasks-2026.yaml contiene task-000 archiviato
    And Christian ha confermato il completamento di task-003
    When Claude Code archivia task-003
    Then task-003 viene aggiunto in fondo al file di archivio
    And task-000 nel file di archivio non viene modificato

  @task-tracking @claude-behavior @skip
  Scenario: Il task archiviato mantiene tutti i campi originali
    Given Christian ha confermato il completamento di task-003
    When Claude Code archivia task-003
    Then il task archiviato ha i campi id, title, status, priority, wave, created, updated, context, completed_at
    And il campo completed_at ha la data di completamento
    And il campo status e' "done"
    And il campo wave e' "done"
