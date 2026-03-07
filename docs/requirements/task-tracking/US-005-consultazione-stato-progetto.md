# US-005: Christian consulta lo stato del progetto in meno di 30 secondi

## Problema (Il Dolore)

Christian e' uno sviluppatore che ha bisogno di capire rapidamente lo
stato del progetto WebPortfolio. Attualmente deve navigare 47+ file in
12 sottodirectory per ricostruire il quadro d'insieme. Non esiste un
singolo punto di riferimento. Questo richiede ~5 minuti e uno sforzo
cognitivo significativo.

## Chi (L'Utente)

- Christian, sviluppatore e revisore di WebPortfolio
- Consulta lo stato sia a inizio sessione sia durante il lavoro
- Ordine di scansione: priorita' -> status -> wave
- Usa l'IDE per la consultazione diretta, senza strumenti esterni

## Soluzione (Cosa Costruiamo)

TASKS.yaml nella root del repository, ordinato per priorita' decrescente,
con solo task attivi (i completati sono archiviati). Christian apre un
singolo file e capisce lo stato in <30 secondi.

## Esempi di Dominio

### Esempio 1: Inizio sessione (happy path)

Christian apre TASKS.yaml nell'IDE alle 9:00. Vede:
- Sezione high: task-003 "Correggere bug form contatto" in-progress (wave: deliver)
- Sezione normal: task-001 "Implementare task tracking" in-progress (wave: discuss),
  task-004 "Valutare dark mode" open (wave: brainstorm)
- Sezione low: task-002 "Versione tedesca" open (wave: brainstorm)

In 10 secondi sa che la priorita' e' il bug del form, e che il task tracking
e' in corso. Decide di continuare con il bug.

### Esempio 2: Task lasciato a meta'

Christian riprende il lavoro dopo 2 giorni di pausa. Apre TASKS.yaml e
trova task-001 "Implementare task tracking" con status in-progress e
wave discuss. Legge il context: "Necessita' di visibilita' cross-sessione
sui task del progetto". Segue il ref docs/discovery/task-tracking/ per
ricordare dove era arrivato.

### Esempio 3: File snello senza rumore

Christian ha completato 5 task nell'ultimo mese. Apre TASKS.yaml e vede
solo 3 task attivi. I 5 completati sono in docs/archive/tasks-2026.yaml.
Nessun rumore visivo, solo lavoro da fare.

## Scenari UAT (BDD)

### Scenario: Christian vede i task ordinati per priorita'
Given TASKS.yaml contiene 4 task attivi
And 1 task ha priority high
And 2 task hanno priority normal
And 1 task ha priority low
When Christian apre TASKS.yaml nell'IDE
Then i task high sono visibili per primi nel file
Then i task normal seguono
Then i task low sono in fondo

### Scenario: Christian distingue i task in-progress dagli open
Given TASKS.yaml contiene 2 task in-progress e 2 task open
When Christian scansiona il file
Then il campo status di ogni task e' visibile nella struttura YAML
And Christian identifica immediatamente quali task sono in corso

### Scenario: Christian segue i refs per approfondire
Given TASKS.yaml contiene task-001 con refs a docs/discovery/task-tracking/
When Christian individua task-001 e vuole approfondire
Then i refs puntano a file esistenti nel repository
And Christian puo' aprire i file referenziati direttamente dall'IDE

### Scenario: Il file contiene solo task attivi
Given 5 task sono stati completati e archiviati
And 3 task hanno status open o in-progress
When Christian apre TASKS.yaml
Then il file contiene solo i 3 task attivi
And la dimensione del file e' proporzionale ai soli task attivi

### Scenario: Christian capisce lo stato in meno di 30 secondi
Given TASKS.yaml contiene meno di 10 task attivi
And i task sono ordinati per priorita' e hanno status visibile
When Christian apre il file
Then in meno di 30 secondi sa quanti task ci sono, quali sono urgenti, cosa e' in corso
And non ha bisogno di aprire altri file per il quadro d'insieme

## Criteri di Accettazione

- [ ] TASKS.yaml contiene solo task attivi (non done, non cancelled)
- [ ] I task sono ordinati per priorita' (high > normal > low)
- [ ] Dentro la stessa priorita', i task piu' urgenti sono prima
- [ ] Ogni task ha title, status, priority, wave visibili nella struttura YAML
- [ ] I refs puntano a file esistenti nel repository
- [ ] Christian capisce il quadro d'insieme in <30 secondi con <10 task attivi

## Note Tecniche

- Dipendenza: US-004 (l'archiviazione mantiene il file snello)
- La leggibilita' dipende dal numero di task attivi: target <50 per leggibilita' sufficiente
- L'ordine fisico nel file e' significativo: deve essere mantenuto ad ogni modifica
- I commenti YAML con separatori di priorita' (# --- high ---) migliorano la scansione visiva
