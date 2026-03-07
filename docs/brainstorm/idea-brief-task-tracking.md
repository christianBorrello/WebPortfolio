# Idea Brief: Sistema Centralizzato di Task Tracking

## Idea in una frase

Un unico file nel repository che funzioni come punto di riferimento centralizzato per tutti i task del progetto, gestibile in autonomia da Claude Code e consultabile dall'utente come revisore.

---

## Problema

I task del progetto sono attualmente frammentati tra diverse sessioni di Claude Code. Ogni sessione produce documentazione a supporto, ma non esiste un singolo punto di riferimento che raccolga tutti i task e il loro stato di avanzamento.

Criticita' specifiche:
- Non esiste un posto centralizzato per tutti i task del progetto
- La struttura della cartella `docs/` prodotta da nWave e' confusionaria e poco leggibile
- Ogni sessione di Claude Code lavora in isolamento senza visibilita' sul quadro d'insieme
- L'utente non ha un modo rapido per ottenere il "punto della situazione"

---

## Contesto d'Uso

### Chi

Due fruitori principali:
- **Claude Code**: attore principale, legge e scrive il file in autonomia durante le sessioni di lavoro
- **L'utente**: revisore, consulta il file per avere il quadro d'insieme e verificare l'avanzamento

### Come

- I task non nascono sempre in modo esplicito. L'utente puo' semplicemente menzionare un'intenzione durante una conversazione
- Claude Code dovrebbe riconoscere queste intenzioni come task e registrarle automaticamente nel tracker
- L'aggiornamento del tracker avviene durante il normale flusso di lavoro, senza passaggi manuali aggiuntivi

### Dove

- Il file vive nel repository del progetto
- La consultazione avviene all'interno dell'IDE, senza necessita' di aprire il browser o strumenti esterni

---

## Struttura Prevista

Ogni task segue il flusso delle wave di nWave, anche quando nWave non viene utilizzato concretamente per quel task:

```
Task [nome/id]:
  - brainstorm: [descrizione in linguaggio naturale o riferimento a documentazione]
  - research: [descrizione o "skipped"]
  - discuss: [descrizione o "skipped"]
  - design: [descrizione o "skipped"]
  - devops: [descrizione o "skipped"]
  - distill: [descrizione o "skipped"]
  - deliver: [descrizione o "skipped"]
```

Ogni campo wave viene compilato in linguaggio naturale, con possibili riferimenti alla documentazione prodotta. Le wave non necessarie per un determinato task vengono marcate come "skipped".

---

## Alternative Valutate e Scartate

| Alternativa | Motivo dello scarto |
|---|---|
| Cartella `docs/` di nWave | Struttura confusionaria, difficile da navigare e consultare |
| GitHub Issues | Richiede di uscire dall'IDE e aprire il browser, non facilmente gestibile in autonomia da Claude Code |
| Strumenti esterni (Kanban, project management) | Preferenza per qualcosa che Claude Code possa gestire direttamente nel repository senza dipendenze esterne |

---

## Domande Aperte

1. **Formato del file**: md, yaml o altro? Quale formato bilancia meglio la leggibilita' umana con la facilita' di parsing da parte di Claude Code?
2. **Posizione nel repository**: dove collocare il file? Root del progetto, dentro `docs/`, o in una directory dedicata?
3. **Identificazione dei task**: come istruire Claude Code a riconoscere un task implicito da una conversazione e a distinguerlo da una semplice osservazione?
4. **Granularita'**: cosa costituisce un "task"? Una feature completa, un bugfix, un'attivita' di refactoring? Serve una definizione di confine?
5. **Storicizzazione**: i task completati restano nel file o vengono archiviati altrove per mantenere il documento snello?
6. **Priorita' e ordinamento**: serve un meccanismo per indicare quali task sono piu' urgenti o importanti?
7. **Collegamento alla documentazione**: come referenziare la documentazione prodotta nelle varie wave in modo che il riferimento rimanga valido nel tempo?

---

## Criteri di Successo

Il sistema funziona se:
- L'utente puo' aprire un singolo file nell'IDE e capire immediatamente lo stato di tutti i task del progetto
- Claude Code riesce a leggere, aggiornare e creare task nel file senza istruzioni ripetute ad ogni sessione
- La struttura e' sufficientemente semplice da non diventare essa stessa un problema di manutenzione
- I task emergono naturalmente dalle conversazioni senza richiedere un processo formale di creazione
- Il file rimane leggibile e utile anche quando il numero di task cresce

---

## Prossimi Passi per nw:discover

- Valutare il formato piu' adatto (md vs yaml) con test concreti di leggibilita' e parsing
- Definire la posizione del file nel repository
- Progettare le istruzioni per Claude Code (via CLAUDE.md o convenzione) per il riconoscimento automatico dei task
- Stabilire la granularita' minima e massima di un task
- Definire la strategia di archiviazione per i task completati
