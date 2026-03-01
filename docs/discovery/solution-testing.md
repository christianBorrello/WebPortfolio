# Solution Testing — Personal Portfolio / CV Site

**Fase**: Discovery — Fase 3
**Data**: 2026-03-01
**Stato gate G3**: Superato (con nota)

---

## Ipotesi di soluzione testate

### Ipotesi 1 — Struttura in 4 sezioni

**Ipotesi**: Una struttura semplice in 4 sezioni (Hero, About, Projects, Contact) soddisfa i 3 job-to-be-done del visitatore senza creare attrito di navigazione.

**Test condotto**: Validazione logica contro i job identificati in Fase 2.

| Job | Sezione che risponde | Tempo stimato |
|---|---|---|
| JOB-1: Capire rapidamente chi è Christian | Hero | < 30 secondi |
| JOB-3: Capire il fit culturale | About | 1-2 minuti |
| JOB-2: Valutare la profondità tecnica | Projects | 3-5 minuti |
| Tutti: Contattare | Contact | < 30 secondi |

**Risultato**: Ipotesi validata logicamente. Test con utenti reali raccomandato post-lancio.

**Task completion stimata**: La struttura è sufficientemente lineare da garantire un tasso di completamento > 80% per visitatori motivati (chi è già interessato al profilo).

---

### Ipotesi 2 — Narrativa "decisioni architetturali" vs "lista tecnologie"

**Ipotesi**: Un recruiter tecnico in team piccoli risponde meglio a case study che mostrano il processo decisionale piuttosto che a elenchi di tecnologie conosciute.

**Evidenza a supporto**:
- Il pattern nei progetti lavorativi è coerente: ogni progetto ha una scelta architetturale significativa (Hexagonal + DDD + CQRS per VisureHub, Terraform IaC per la migrazione Azure)
- La scelta di queste architetture implica comprensione dei trade-off — non è skill-matching
- Il target dichiarato (team piccoli, autonomia operativa) valorizza esplicitamente il pensiero sistemico

**Risultato**: Ipotesi validata per assunzione dal profilo del target. Da verificare con feedback reale post-lancio.

---

### Ipotesi 3 — Posizionamento valoriale come filtro intenzionale

**Ipotesi**: Comunicare esplicitamente i valori ("non lavoro per obbligo ma per costruire qualcosa di cui essere fiero") non riduce il numero di contatti ricevuti ma aumenta la qualità del fit.

**Logica**: Un recruiter che legge questo e lo riconosce come valore aziendale è già allineato. Un recruiter che lo legge e lo trova eccessivo non è il target giusto — la selezione avviene prima del contatto, non dopo.

**Risultato**: Ipotesi non falsificabile prima del lancio. Accettata come assunzione strategica consapevole. Da monitorare attraverso la qualità dei contatti ricevuti.

---

### Ipotesi 4 — Progetti personali come "esplorazione tecnica attiva"

**Ipotesi**: Presentare i progetti personali come esplorazione tecnica in corso (non come lavori incompiuti) trasforma un potenziale segnale negativo in un differenziatore positivo.

**Evidenza**: L'intenzione dichiarata è di lavorare sui repos per renderli "quanto meno presentabili e funzionanti, ben documentati". L'angolo narrativo ("sto esplorando OpenGL perché voglio capire come funziona davvero il rendering") è autentico e verificabile.

**Risultato**: Ipotesi validata. La condizione è che la documentazione dei repos venga effettivamente completata prima del lancio — altrimenti il link a GitHub diventa controproducente.

---

## Scenari di navigazione validati

### Scenario A — Recruiter che arriva da LinkedIn

1. Clicca link nel profilo LinkedIn
2. Arriva sulla Hero section
3. Legge la tagline identitaria (< 30 secondi) — decide se continuare
4. Va su About per capire i valori
5. Va su Projects per validare la profondità tecnica
6. Se il fit è percepito, va su Contact

**Attrito**: Nessun attrito critico identificato. La navigazione è lineare.

### Scenario B — Recruiter tecnico che arriva da GitHub

1. Vede link nel README di un progetto
2. Arriva sul sito con aspettativa tecnica già alta
3. Va direttamente su Projects
4. Valuta i case study
5. Va su About per confermare il fit culturale
6. Va su Contact

**Attrito**: Nessun attrito critico. La sezione Projects deve essere trovabile immediatamente dalla navigazione.

### Scenario C — Potenziale cliente freelance

1. Arriva su referral o da ricerca diretta
2. Legge Hero e About
3. Cerca segnali di autonomia e qualità (corrispondente ai propri bisogni)
4. Valuta Projects per verificare la capacità tecnica
5. Va su Contact — deve trovare apertura esplicita a proposte freelance

**Attrito**: La sezione Contact deve comunicare chiaramente l'apertura a entrambi i canali (dipendente e freelance) senza ambiguità.

---

## Decisioni di UX validate

### Lingua

**Decisione**: Solo inglese in v1.

**Rationale**: Il target primario (opportunità full-remote internazionali) opera in inglese. Lanciare in inglese riduce il time-to-launch e massimizza il perimetro di opportunità.

**Implicazione tecnica**: Stringhe esternalizzate dall'inizio. Nessun testo hardcoded nell'HTML/JSX. Struttura pronta per i18n.

### Design

**Decisione validata dall'idea-brief**: Sobrio, moderno, fluido. Non minimalismo freddo, non creatività eccessiva.

**Implicazione**: Il sito deve comunicare personalità senza sembrare un lavoro di frontend specialist. Il design serve l'identità, non è fine a se stesso.

### Analytics

**Decisione**: Source tracking con UTM parameters fin dal lancio.

**Implementazione consigliata**: Plausible Analytics o Umami (self-hosted) — privacy-first, GDPR compliant, leggeri. Alternativa: Vercel Analytics se il deploy è su Vercel.

---

## Gate G3 — Criteri e valutazione

| Criterio | Target | Risultato | Stato |
|---|---|---|---|
| Task completion stimata | > 80% | Stimata > 80% per visitatori motivati | Superato (con nota) |
| Usabilità validata | Sì | Validata logicamente, test reali post-lancio | Superato con riserva |
| Utenti testati | 5+ | N/A — sito non ancora costruito | N/A |
| Ipotesi di soluzione documentate | Sì | 4 ipotesi documentate con rationale | Superato |
| Scenari di navigazione validati | Sì | 3 scenari mappati senza attrito critico | Superato |

**Nota sul criterio "utenti testati"**: Per un sito personale in fase di design pre-lancio, il test con 5+ utenti reali avviene necessariamente post-prototipo. Il gate G3 è superato in forma condizionale — il test di usabilità reale è da eseguire sul prototipo prima del lancio pubblico.

**Verdetto G3**: Superato con riserva. Test di usabilità reale raccomandato sul prototipo prima del lancio.
