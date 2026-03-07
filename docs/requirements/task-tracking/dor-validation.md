# Validazione Definition of Ready -- Task Tracking

Wave: DISCUSS -- 2026-03-03

---

## Riepilogo

| User Story | DoR | Stato |
|---|---|---|
| US-001: Lettura contesto inizio sessione | 8/8 PASS | PRONTA |
| US-002: Rilevamento e registrazione task | 8/8 PASS | PRONTA |
| US-003: Aggiornamento stato con conferma | 8/8 PASS | PRONTA |
| US-004: Archiviazione task completati | 8/8 PASS | PRONTA |
| US-005: Consultazione stato progetto | 8/8 PASS | PRONTA |
| US-006: Creazione TASKS.yaml iniziale | 8/8 PASS | PRONTA |
| US-007: Istruzioni CLAUDE.md | 8/8 PASS | PRONTA |

---

## Validazione per Story

### US-001: Lettura contesto inizio sessione

| # | Criterio | Stato | Evidenza |
|---|---|---|---|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "Ogni sessione parte senza visibilita' sui task" |
| 2 | Utente/persona identificato | PASS | Claude Code, attore primario |
| 3 | Almeno 3 esempi di dominio con dati reali | PASS | 3 esempi: sessione con task urgente, sessione dopo completamento, TASKS.yaml assente |
| 4 | Scenari UAT in Given/When/Then (3-7) | PASS | 3 scenari |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 4 criteri verificabili |
| 6 | Story right-sized (1-3 giorni, 3-7 scenari) | PASS | ~1 sessione, 3 scenari |
| 7 | Note tecniche con vincoli e dipendenze | PASS | Dipendenze da TASKS.yaml e CLAUDE.md |
| 8 | Dipendenze risolte o tracciate | PASS | TASKS.yaml (US-006), CLAUDE.md (US-007) tracciate |

### US-002: Rilevamento e registrazione task

| # | Criterio | Stato | Evidenza |
|---|---|---|---|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "Le intenzioni si perdono tra le sessioni" |
| 2 | Utente/persona identificato | PASS | Christian, sviluppatore WebPortfolio |
| 3 | Almeno 3 esempi di dominio con dati reali | PASS | 3 esempi: intenzione implicita, rifiuto, richiesta esplicita |
| 4 | Scenari UAT in Given/When/Then (3-7) | PASS | 5 scenari |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 7 criteri verificabili |
| 6 | Story right-sized (1-3 giorni, 3-7 scenari) | PASS | ~1-2 sessioni, 5 scenari |
| 7 | Note tecniche con vincoli e dipendenze | PASS | Pattern riconoscimento, falsi negativi/positivi |
| 8 | Dipendenze risolte o tracciate | PASS | US-001 tracciata |

### US-003: Aggiornamento stato con conferma

| # | Criterio | Stato | Evidenza |
|---|---|---|---|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "Lo stato nel file deve riflettere la realta'" |
| 2 | Utente/persona identificato | PASS | Christian, revisore |
| 3 | Almeno 3 esempi di dominio con dati reali | PASS | 3 esempi: inizio lavoro, completamento, blocco |
| 4 | Scenari UAT in Given/When/Then (3-7) | PASS | 5 scenari |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 6 criteri verificabili |
| 6 | Story right-sized (1-3 giorni, 3-7 scenari) | PASS | ~1 sessione, 5 scenari |
| 7 | Note tecniche con vincoli e dipendenze | PASS | Transizioni stato, attiva US-004 |
| 8 | Dipendenze risolte o tracciate | PASS | US-001, US-002 tracciate |

### US-004: Archiviazione task completati

| # | Criterio | Stato | Evidenza |
|---|---|---|---|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "I task completati sono rumore visivo" |
| 2 | Utente/persona identificato | PASS | Christian, consultazione nell'IDE |
| 3 | Almeno 3 esempi di dominio con dati reali | PASS | 3 esempi: primo archivio, archivio esistente, consultazione |
| 4 | Scenari UAT in Given/When/Then (3-7) | PASS | 5 scenari |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 7 criteri verificabili |
| 6 | Story right-sized (1-3 giorni, 3-7 scenari) | PASS | ~1 sessione, 5 scenari |
| 7 | Note tecniche con vincoli e dipendenze | PASS | Directory docs/archive/, append-only |
| 8 | Dipendenze risolte o tracciate | PASS | US-003 tracciata |

### US-005: Consultazione stato progetto

| # | Criterio | Stato | Evidenza |
|---|---|---|---|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "Deve navigare 47+ file per ricostruire il quadro" |
| 2 | Utente/persona identificato | PASS | Christian, ordine scansione: priorita'/status/wave |
| 3 | Almeno 3 esempi di dominio con dati reali | PASS | 3 esempi: inizio sessione, task a meta', file snello |
| 4 | Scenari UAT in Given/When/Then (3-7) | PASS | 5 scenari |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 6 criteri verificabili |
| 6 | Story right-sized (1-3 giorni, 3-7 scenari) | PASS | ~1 sessione, 5 scenari |
| 7 | Note tecniche con vincoli e dipendenze | PASS | Ordine fisico, commenti separatori |
| 8 | Dipendenze risolte o tracciate | PASS | US-004 tracciata |

### US-006: Creazione TASKS.yaml iniziale

| # | Criterio | Stato | Evidenza |
|---|---|---|---|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "Nessun task tracciato centralmente" |
| 2 | Utente/persona identificato | PASS | Christian + Claude Code, bootstrap |
| 3 | Almeno 3 esempi di dominio con dati reali | PASS | 3 esempi: creazione con Discovery, modifica lista, aggiunta task |
| 4 | Scenari UAT in Given/When/Then (3-7) | PASS | 4 scenari |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 6 criteri verificabili |
| 6 | Story right-sized (1-3 giorni, 3-7 scenari) | PASS | ~1 sessione, 4 scenari |
| 7 | Note tecniche con vincoli e dipendenze | PASS | Task una tantum, nessuna dipendenza |
| 8 | Dipendenze risolte o tracciate | PASS | Nessuna dipendenza |

### US-007: Istruzioni CLAUDE.md

| # | Criterio | Stato | Evidenza |
|---|---|---|---|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "Senza istruzioni, Claude Code non sa del tracker" |
| 2 | Utente/persona identificato | PASS | Claude Code (lettore), Christian (autore) |
| 3 | Almeno 3 esempi di dominio con dati reali | PASS | 3 esempi: guida comportamento, prevenzione errori, lingua |
| 4 | Scenari UAT in Given/When/Then (3-7) | PASS | 5 scenari |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 10 criteri verificabili |
| 6 | Story right-sized (1-3 giorni, 3-7 scenari) | PASS | ~1 sessione, 5 scenari |
| 7 | Note tecniche con vincoli e dipendenze | PASS | CLAUDE.md deve esistere, sezione concisa |
| 8 | Dipendenze risolte o tracciate | PASS | CLAUDE.md esistenza tracciata |

---

## Grafo delle Dipendenze

```
US-006 (Creazione TASKS.yaml)    US-007 (Istruzioni CLAUDE.md)
     |                                |
     +------------+------------------+
                  |
                  v
          US-001 (Lettura contesto)
                  |
                  v
          US-002 (Rilevamento task)
                  |
                  v
          US-003 (Aggiornamento stato)
                  |
                  v
          US-004 (Archiviazione)
                  |
                  v
          US-005 (Consultazione stato)
```

**Ordine di implementazione suggerito**:
1. US-006 + US-007 (bootstrap, parallelizzabili)
2. US-001 (lettura contesto)
3. US-002 (rilevamento e registrazione)
4. US-003 (aggiornamento stato)
5. US-004 (archiviazione)
6. US-005 (consultazione -- e' verificabile fin dal bootstrap, ma la qualita' dipende da tutti gli altri US)

---

## Decisione Aggiornata dalla Discovery

| Decisione Discovery | Decisione DISCUSS | Motivazione |
|---|---|---|
| Nessuna archiviazione in v1 (YAGNI) | Archiviazione attiva in v1 | Christian preferisce ridurre rumore e dimensione del file. Il costo di implementazione e' basso (append a un file YAML). |
| Conferma solo per creazione task | Conferma per OGNI operazione (creazione e cambio stato) | Christian vuole controllo completo per prevenire disallineamenti. |
