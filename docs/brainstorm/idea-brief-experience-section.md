# Idea Brief: Sezione Experience con Timeline Unificata

## Idea in una frase

Una timeline cronologica unificata sulla homepage che sostituisce la griglia Projects, collegando formazione, esperienza lavorativa e progetti personali in un'unica narrativa professionale coerente.

---

## Problema

La griglia Projects attuale funziona come un catalogo disconnesso. Non esiste un filo narrativo ne' un percorso di lettura guidato. Il visitatore apre un case study, lo consuma in isolamento e se ne va. Il portfolio lavora contro se stesso man mano che cresce: piu' progetti significano piu' opzioni scollegate tra loro.

Criticita' specifiche:
- Il contesto professionale (ruolo, azienda, traiettoria di carriera) esiste nella prosa dei case study ma e' sepolto e invisibile a chi scansiona rapidamente la pagina
- Non c'e' modo di percepire la progressione professionale senza aprire e leggere ogni singolo case study
- Un recruiter apre un progetto, non vede il quadro d'insieme e se ne va
- La crescita del portfolio peggiora il problema anziche' risolverlo

---

## Contesto d'Uso

### Chi

Due audience con velocita' di lettura diverse:
- **Recruiter**: pattern-matching rapido su ruolo, azienda, seniority. Tempo di permanenza nell'ordine dei secondi
- **Hiring manager / CTO**: valutazione approfondita di impatto e pensiero architetturale. Tempo di permanenza nell'ordine dei minuti

### Come

Il portfolio deve servire entrambi. Attualmente un recruiter apre un case study e se ne va senza vedere il percorso completo. Un hiring manager non ha un modo naturale di seguire la traiettoria professionale che ha prodotto ciascun progetto.

### Perche' adesso

La sezione Projects e' gia' presente e funzionante. Il problema diventa piu' acuto ad ogni nuovo progetto aggiunto. La sostituzione con una timeline e' un intervento strutturale che conviene fare prima che il numero di entry cresca ulteriormente.

---

## Concetto Finale

Timeline unificata sulla homepage che sostituisce interamente la griglia Projects:

- Tutte le entry in ordine cronologico inverso
- 3 tipi di entry differenziati visivamente (colore/icona): **work**, **education**, **personal project**
- Animazione di reveal guidata dallo scroll (Intersection Observer + CSS transitions)
- Le entry work mostrano project card associate (link alla pagina di dettaglio del case study)
- Le entry personal project linkano direttamente alle rispettive pagine case study
- Le entry education sono standalone, senza link a pagine di dettaglio

### Decisioni di design chiave

| Decisione | Motivazione |
|---|---|
| La timeline sostituisce la griglia Projects | Non e' un'aggiunta, e' una sostituzione. Una sola sezione, non due |
| Sezione nella homepage, non pagina separata | Mantiene il flusso di navigazione esistente |
| Ordine cronologico misto (tutti i tipi insieme) | Preserva la continuita' narrativa, mostra come formazione e lavoro si intrecciano |
| Indicatori visivi per tipo di entry | Gestiscono la distinzione senza separare in colonne parallele |
| Animazione scroll-driven | Crea un'esperienza di lettura guidata, risolve il problema "apri uno e te ne vai" |

---

## Alternative Valutate e Scartate

| Alternativa | Motivo dello scarto |
|---|---|
| Due timeline affiancate (Work / Education) | L'utente vuole una narrativa unificata, non due storie parallele. La separazione in colonne rompe la continuita' cronologica |
| Timeline cronologica singola senza animazione | Evoluta nella versione con scroll-driven animation per il reveal progressivo. Senza animazione la timeline e' una lista statica che non guida la lettura |
| Pagina separata dedicata all'esperienza | Scartata per mantenere l'esperienza nella homepage. Una pagina separata aggiunge un click e riduce la visibilita' della traiettoria professionale |

---

## Criteri di Successo

Il sistema funziona se:
- Un recruiter puo' scansionare la timeline in 30 secondi e comprendere: livello di seniority, progressione di carriera, ampiezza dello stack tecnologico
- Un hiring manager puo' seguire la narrativa, cliccare nei case study per approfondire, e vedere la traiettoria che ha prodotto ciascun progetto
- Nessuna entry esiste in isolamento: ciascuna e' posizionata nel contesto della timeline professionale
- L'aggiunta di nuove entry rafforza la narrativa anziche' frammentarla

---

## Domande Aperte

1. **Contenuto delle entry**: quale livello di dettaglio mostrare direttamente nella timeline vs. delegare alla pagina di dettaglio?
2. **Responsiveness**: come si comporta la timeline su mobile? Layout verticale stretto, collasso delle card, o altra soluzione?
3. **Filtri**: servono filtri per tipo di entry (work/education/project) o la timeline mista e' sufficiente?
4. **Dati**: da dove vengono alimentate le entry? File JSON, CMS, hardcoded nel componente?
5. **Transizione**: come gestire la migrazione dalla griglia Projects alla timeline senza perdere link esistenti ai case study?
6. **Accessibilita'**: come garantire che l'animazione scroll-driven sia accessibile (prefers-reduced-motion, screen reader)?
7. **Performance**: l'Intersection Observer su molte entry potrebbe avere impatto sulle performance di scroll?

---

## Prossimi Passi per nw:discuss

- Progettare il journey UX per entrambe le audience (recruiter scan vs. hiring manager deep-dive)
- Definire i requisiti dettagliati per ciascun tipo di entry (campi, layout, interazioni)
- Stabilire il comportamento responsive della timeline
- Specificare le transizioni e le animazioni in termini di durata, easing e trigger points
- Valutare se introdurre filtri o mantenere la vista unificata come unica modalita'
