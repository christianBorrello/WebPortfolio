# Lean Canvas: Sistema Centralizzato di Task Tracking

## Nota

Questo non e' un prodotto per il mercato. Il Lean Canvas e' adattato al contesto di developer tooling interno. Le sezioni "Revenue Streams" e "Channels" sono reinterpretate come "Valore Prodotto" e "Punto di Integrazione".

---

## 1. Problema

1. I task del progetto sono frammentati tra 47+ file in 12 sottodirectory
2. Ogni sessione Claude Code parte senza visibilita' sul quadro d'insieme
3. Le intenzioni espresse durante le conversazioni non hanno un posto dove essere registrate
4. Non esiste una vista aggregata cross-feature dello stato del progetto

### Alternative Esistenti
- Navigazione manuale di `docs/feature/*/roadmap.yaml`
- Consultazione di `docs/evolution/` per le feature completate
- Memoria dell'utente (non scalabile)

---

## 2. Segmento Utenti

| Attore | Ruolo | Frequenza d'uso |
|---|---|---|
| Claude Code (sessione) | Lettore/scrittore primario | Ogni sessione (giornaliero) |
| Christian (sviluppatore) | Revisore, decisore | Giornaliero/settimanale |

---

## 3. Proposta di Valore Unica

**Un singolo file YAML nella root del repository che offre visibilita' immediata su tutti i task del progetto, aggiornato automaticamente da Claude Code e leggibile in <30 secondi da Christian.**

---

## 4. Soluzione

| Componente | Implementazione |
|---|---|
| File tracker | `TASKS.yaml` nella root del progetto |
| Formato | YAML puro (coerente con ADR-003) |
| Lingua contenuti | Italiano (titoli, contesto, note). Campi e valori enum in inglese |
| Gestione automatica | Istruzioni in CLAUDE.md per Claude Code |
| Creazione task | Conferma obbligatoria dall'utente -- mai automatica |
| Relazione con docs | Semplice puntatore (titolo + status + refs), nessuna duplicazione |
| Ordinamento | Per priorita' (high > normal > low) |
| Archiviazione | Nessuna in v1; soglia a 50 task per v2 |

---

## 5. Punto di Integrazione (al posto di "Channels")

| Punto | Descrizione |
|---|---|
| CLAUDE.md | Istruzioni operative per Claude Code |
| Root del repository | Posizione del file TASKS.yaml |
| Sessione Claude Code | Lettura all'inizio, aggiornamento durante il lavoro |
| IDE | Consultazione diretta da parte di Christian |

---

## 6. Valore Prodotto (al posto di "Revenue Streams")

| Valore | Misura |
|---|---|
| Tempo risparmiato per ricostruzione contesto | Riduzione da ~5min a ~30s per sessione |
| Completezza del tracciamento | % di task registrati vs task reali |
| Riduzione task dimenticati | Numero di task persi tra sessioni |
| Mantenibilita' | Tempo speso sulla manutenzione del tracker stesso |

---

## 7. Struttura dei Costi

| Costo | Stima |
|---|---|
| Implementazione iniziale | 1 sessione Claude Code (~30 min) |
| Manutenzione CLAUDE.md | Una tantum, poi incrementale |
| Overhead per sessione | ~2-3 operazioni Read/Edit su TASKS.yaml |
| Rischio di disallineamento | Mitigato da istruzioni chiare |

---

## 8. Metriche Chiave

| Metrica | Target | Come misurare |
|---|---|---|
| Adozione | 100% sessioni leggono TASKS.yaml | Verifica manuale nelle prime 2 settimane |
| Freshness | `last_updated` < 24h | Controllo data nel file |
| Dimensione | <50 task attivi | Conteggio task con status != done |
| Consistenza | 0 task orfani | Tutti i task hanno status e wave validi |

---

## 9. Vantaggio Competitivo (Unfair Advantage)

Non applicabile nel senso tradizionale. Il vantaggio e':
- **Integrazione nativa**: vive nel repository, non richiede strumenti esterni
- **Zero friction**: Claude Code lo gestisce come parte del workflow naturale
- **Coerenza**: usa lo stesso formato (YAML) del resto del progetto

---

## Valutazione dei 4 Rischi

### Rischio Valore
**Domanda**: Il sistema produce davvero valore per entrambi gli attori?
**Valutazione**: BASSO. Il problema e' validato da evidenza diretta (5 segnali). La soluzione risolve un dolore concreto e quotidiano.

### Rischio Usabilita'
**Domanda**: Entrambi gli attori riescono a usare il sistema senza frizione?
**Valutazione**: BASSO. YAML e' gia' familiare (ADR-003, roadmap.yaml). Le istruzioni CLAUDE.md sono testate concettualmente.

### Rischio Fattibilita'
**Domanda**: Claude Code riesce tecnicamente a gestire TASKS.yaml?
**Valutazione**: TRASCURABILE. Claude Code gia' legge e scrive YAML nel progetto (execution-log.yaml, roadmap.yaml). Non serve nessuna nuova capacita'.

### Rischio Viabilita'
**Domanda**: Il sistema e' sostenibile nel tempo?
**Valutazione**: BASSO. Il costo di manutenzione e' minimo (2-3 operazioni per sessione). La strategia di archiviazione previene la crescita incontrollata. Non ci sono dipendenze esterne.

---

## Gate G4: Valutazione

| Criterio | Target | Risultato | Stato |
|---|---|---|---|
| Lean Canvas completo | Si | Si (adattato al contesto) | PASS |
| Rischio Valore | Accettabile | Basso | PASS |
| Rischio Usabilita' | Accettabile | Basso | PASS |
| Rischio Fattibilita' | Accettabile | Trascurabile | PASS |
| Rischio Viabilita' | Accettabile | Basso | PASS |

**Decisione G4**: PROCEED -- Tutti e 4 i rischi sono a livello accettabile. La soluzione e' pronta per il passaggio alla fase di design e implementazione.

---

## Decisione Finale: GO

Il sistema di task tracking centralizzato tramite `TASKS.yaml` e' validato e pronto per l'implementazione.

### Decisioni Confermate dall'Utente

| Decisione | Scelta | Motivazione |
|---|---|---|
| Protocollo task impliciti | Conferma obbligatoria | Prevenire falsi positivi; l'utente mantiene il controllo |
| Lingua del file | Italiano per i contenuti | Coerenza con il contesto d'uso; l'utente e' italiano |
| Relazione con roadmap.yaml | Semplice puntatore | Nessuna duplicazione; singola fonte di verita' per il dettaglio |

### Deliverable per la wave DISCUSS

1. Schema del file TASKS.yaml (definito in solution-testing.md)
2. Istruzioni per CLAUDE.md (bozza in solution-testing.md)
3. Risposte a tutte le 7 domande aperte (in opportunity-tree.md)
4. Strategia di archiviazione (definita, differita a v2)
5. 3 decisioni confermate dall'utente (tabella sopra)
