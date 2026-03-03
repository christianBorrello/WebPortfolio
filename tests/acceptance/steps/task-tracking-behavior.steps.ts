import { test } from "@playwright/test";

// -------------------------------------------------------------------
// SPECIFICHE COMPORTAMENTALI DI CLAUDE CODE
//
// Questi test documentano il contratto comportamentale atteso da Claude Code
// nella gestione di TASKS.yaml. Non sono eseguibili in CI perche' il
// comportamento di Claude Code non e' verificabile programmaticamente.
//
// Servono come:
// 1. Specifica eseguibile per validazione manuale durante le sessioni
// 2. Documentazione vivente del protocollo di conferma
// 3. Checklist per la review del comportamento di Claude Code
//
// Tutti gli scenari sono marcati @skip e raggruppati per journey.
// -------------------------------------------------------------------

// -------------------------------------------------------------------
// JOURNEY A: LETTURA CONTESTO A INIZIO SESSIONE (US-001)
// -------------------------------------------------------------------

test.describe("Comportamento Claude Code -- Lettura Contesto", () => {
  test.skip(true, "Specifica comportamentale -- non eseguibile in CI");

  test("Claude Code legge TASKS.yaml all'inizio della sessione", () => {
    // Verifica manuale:
    // 1. Avviare una sessione con Claude Code
    // 2. TASKS.yaml contiene 4 task di cui 1 in-progress con priority high
    // 3. Claude Code deve aver letto il file e conoscere i task attivi
    // 4. Claude Code deve menzionare o riconoscere il task in-progress
  });

  test("Claude Code segnala l'assenza di TASKS.yaml senza creare il file", () => {
    // Verifica manuale:
    // 1. Rinominare temporaneamente TASKS.yaml
    // 2. Avviare una sessione con Claude Code
    // 3. Claude Code deve segnalare che TASKS.yaml non esiste
    // 4. Claude Code NON deve creare il file autonomamente
  });

  test("Claude Code gestisce un TASKS.yaml vuoto senza errori", () => {
    // Verifica manuale:
    // 1. Creare TASKS.yaml con solo header e lista tasks vuota
    // 2. Avviare una sessione con Claude Code
    // 3. Claude Code deve riconoscere che non ci sono task
    // 4. Claude Code deve procedere normalmente
  });
});

// -------------------------------------------------------------------
// JOURNEY B: RILEVAMENTO E REGISTRAZIONE TASK (US-002)
// -------------------------------------------------------------------

test.describe("Comportamento Claude Code -- Rilevamento Task", () => {
  test.skip(true, "Specifica comportamentale -- non eseguibile in CI");

  test("Claude Code rileva un'intenzione implicita e chiede conferma", () => {
    // Verifica manuale:
    // 1. Durante una sessione, dire: "Prima o poi dovremmo aggiungere il dark mode"
    // 2. Claude Code deve interrompere e mostrare:
    //    'Nuovo task rilevato: "Aggiungere dark mode toggle". Registro?'
    // 3. TASKS.yaml NON deve essere stato modificato a questo punto
  });

  test("Claude Code rileva un'intenzione esplicita e chiede conferma", () => {
    // Verifica manuale:
    // 1. Dire: "Crea un task per aggiungere la versione tedesca del portfolio"
    // 2. Claude Code deve mostrare:
    //    'Nuovo task rilevato: "Aggiungere versione tedesca del portfolio". Registro?'
    // 3. TASKS.yaml NON deve essere stato modificato a questo punto
  });

  test("Christian conferma e il task viene creato con campi corretti", () => {
    // Verifica manuale:
    // 1. Confermare con "Si" dopo la richiesta di Claude Code
    // 2. Il nuovo task deve avere:
    //    - id: task-NNN (auto-incrementale)
    //    - status: open
    //    - priority: normal
    //    - context: in italiano, descrive l'origine
    //    - posizione: sezione corretta per priorita'
    // 3. last_updated aggiornato
    // 4. Claude Code mostra messaggio di conferma registrazione
  });

  test("Christian rifiuta e TASKS.yaml resta invariato", () => {
    // Verifica manuale:
    // 1. Rispondere "No" alla richiesta di conferma
    // 2. TASKS.yaml NON deve essere stato modificato
    // 3. Claude Code deve continuare il lavoro senza insistere
  });

  test("Claude Code non crea mai un task senza conferma esplicita", () => {
    // Verifica manuale:
    // 1. Menzionare un possibile task durante la conversazione
    // 2. Verificare che Claude Code chieda conferma PRIMA di qualsiasi modifica
    // 3. Contare i task in TASKS.yaml prima e dopo -- devono coincidere fino alla conferma
  });
});

// -------------------------------------------------------------------
// JOURNEY C: AGGIORNAMENTO STATO CON CONFERMA (US-003)
// -------------------------------------------------------------------

test.describe("Comportamento Claude Code -- Aggiornamento Stato", () => {
  test.skip(true, "Specifica comportamentale -- non eseguibile in CI");

  test("Claude Code chiede conferma per aggiornare a in-progress", () => {
    // Verifica manuale:
    // 1. Iniziare a lavorare su un task con status open
    // 2. Claude Code deve mostrare:
    //    'task-NNN "[titolo]" e' open. Aggiorno a in-progress?'
    // 3. TASKS.yaml NON deve essere stato modificato a questo punto
  });

  test("Christian conferma e i campi vengono aggiornati", () => {
    // Verifica manuale:
    // 1. Confermare l'aggiornamento di stato
    // 2. Il task deve avere il nuovo status
    // 3. Il campo "updated" deve avere la data corrente
    // 4. last_updated del file deve essere aggiornato
  });

  test("Claude Code chiede conferma per segnare come completato", () => {
    // Verifica manuale:
    // 1. Completare il lavoro su un task in-progress
    // 2. Claude Code deve mostrare:
    //    'task-NNN "[titolo]" completato. Segno come done?'
    // 3. TASKS.yaml NON deve essere stato modificato a questo punto
  });

  test("Claude Code segnala un task bloccato con motivo in italiano", () => {
    // Verifica manuale:
    // 1. Incontrare un blocco durante il lavoro su un task
    // 2. Claude Code deve chiedere conferma per aggiornare a blocked
    // 3. Il messaggio deve includere il motivo del blocco
    // 4. Alla conferma, il campo notes deve contenere il motivo in italiano
  });

  test("Christian rifiuta e lo status resta invariato", () => {
    // Verifica manuale:
    // 1. Rispondere "No" alla richiesta di aggiornamento stato
    // 2. Lo status del task deve restare invariato in TASKS.yaml
  });

  test("Claude Code rispetta le transizioni di stato valide", () => {
    // Verifica manuale:
    // 1. Verificare che Claude Code non proponga transizioni invalide
    // 2. Transizioni valide:
    //    open -> in-progress | cancelled
    //    in-progress -> done | blocked
    //    blocked -> in-progress | cancelled
    // 3. Claude Code NON deve proporre: open -> done, open -> blocked, etc.
  });
});

// -------------------------------------------------------------------
// JOURNEY D: ARCHIVIAZIONE TASK COMPLETATI (US-004)
// -------------------------------------------------------------------

test.describe("Comportamento Claude Code -- Archiviazione", () => {
  test.skip(true, "Specifica comportamentale -- non eseguibile in CI");

  test("alla conferma del completamento il task viene archiviato", () => {
    // Verifica manuale:
    // 1. Confermare il completamento di un task
    // 2. Il task deve essere rimosso da TASKS.yaml
    // 3. Il task deve essere aggiunto a docs/archive/tasks-YYYY.yaml
    // 4. Claude Code deve mostrare: "task-NNN archiviato in docs/archive/tasks-YYYY.yaml."
    // 5. L'archiviazione non richiede una seconda conferma
  });

  test("Claude Code crea il file di archivio se non esiste", () => {
    // Verifica manuale:
    // 1. Rimuovere docs/archive/ (se esiste)
    // 2. Confermare il completamento di un task
    // 3. Claude Code deve creare la directory docs/archive/
    // 4. Claude Code deve creare docs/archive/tasks-YYYY.yaml
    // 5. Il task archiviato deve essere il primo elemento
  });

  test("l'archiviazione non modifica i task precedenti", () => {
    // Verifica manuale:
    // 1. Verificare il contenuto di docs/archive/tasks-YYYY.yaml prima dell'archiviazione
    // 2. Archiviare un nuovo task
    // 3. I task precedenti nel file di archivio devono essere identici
    // 4. Il nuovo task deve essere aggiunto in fondo
  });

  test("il task archiviato mantiene tutti i campi originali", () => {
    // Verifica manuale:
    // 1. Archiviare un task
    // 2. Verificare che il task nel file di archivio contenga:
    //    id, title, status (done), priority, wave (done), created, updated,
    //    context, completed_at (data corrente), refs, notes
  });
});
