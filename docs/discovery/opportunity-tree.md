# Opportunity Tree — Personal Portfolio / CV Site

**Fase**: Discovery — Fase 2
**Data**: 2026-03-01
**Stato gate G2**: Superato

---

## Outcome desiderato (radice dell'albero)

> Un recruiter tecnico o potenziale cliente freelance visita il sito e capisce immediatamente chi è Christian — non solo cosa sa fare, ma perché vale la pena parlare con lui.

**Metrica di outcome**: 100 visite uniche nelle prime 4-6 settimane con source attribution. Contatto qualificato inbound entro 8 settimane.

---

## Mappa delle opportunità

### Livello 1 — Bisogni del visitatore (Jobs to be done)

Il recruiter tecnico che arriva sul sito ha tre job da completare, in questo ordine:

**JOB-1: Capire rapidamente se vale la pena approfondire**
Il visitatore ha poco tempo. Vuole rispondere a "è il profilo giusto per noi?" in meno di 90 secondi.

**JOB-2: Valutare la profondità tecnica reale**
Vuole distinguere chi "conosce" una tecnologia da chi prende decisioni architetturali con quella tecnologia.

**JOB-3: Capire il fit culturale**
Vuole sapere se Christian è qualcuno che lavora per ownership o per salary — specialmente in team piccoli.

---

### Livello 2 — Opportunità per soddisfare i job

#### JOB-1 — Capire rapidamente chi è Christian

| Opportunità | Punteggio importanza (1-10) | Punteggio soddisfazione attuale (1-10) | Score opportunità |
|---|---|---|---|
| Hero section con identità chiara, non lista di skill | 9 | 1 | **17** |
| Tagline che comunica approccio, non ruolo | 9 | 1 | **17** |
| Navigazione immediata alle sezioni rilevanti | 7 | 2 | **12** |
| Presenza visiva/tono coerente con personalità | 8 | 1 | **15** |

*Formula score: importanza + (importanza - soddisfazione). Punteggio >10 = opportunità prioritaria.*

**Opportunità top per JOB-1**: Hero section con identità autentica + tagline che cattura l'approccio.

---

#### JOB-2 — Valutare la profondità tecnica

| Opportunità | Importanza | Soddisfazione attuale | Score |
|---|---|---|---|
| Presentazione progetti lavorativi con contesto decisionale | 10 | 1 | **19** |
| Case study VisureHub (architettura, perché, risultati) | 9 | 0 | **18** |
| Case study migrazione Azure (impatto business misurabile) | 8 | 0 | **16** |
| Sezione progetti personali come esplorazione tecnica | 7 | 1 | **13** |
| Stack e scelte tecnologiche motivate | 8 | 2 | **14** |

**Opportunità top per JOB-2**: Case study con focus sulle decisioni architetturali, non sulle tecnologie usate. La differenza tra "ho usato CQRS" e "ho scelto CQRS perché..." è il differenziatore.

---

#### JOB-3 — Valutare il fit culturale

| Opportunità | Importanza | Soddisfazione attuale | Score |
|---|---|---|---|
| Sezione "About" con valori espliciti, non biografia | 10 | 0 | **20** |
| Comunicazione del tipo di realtà cercata | 9 | 0 | **18** |
| Tono narrativo coerente con personalità autentica | 8 | 1 | **15** |
| Segnale di selettività (non "disponibile per tutto") | 7 | 0 | **14** |

**Opportunità top per JOB-3**: Una sezione "About" che non è un CV in prosa — è una dichiarazione di chi sei e cosa cerchi. La frase "realizzare qualcosa di cui possa essere fiero" va qui, esatta.

---

### Livello 3 — Opportunità di contorno (secondarie ma importanti)

| Opportunità | Importanza | Note |
|---|---|---|
| Source tracking con UTM parameters | 8 | Necessario per misurare il funzionamento del sito |
| Apertura canale freelance senza distrarre dall'obiettivo primario | 6 | Sezione contatti unificata con messaggi distinti |
| Architettura i18n pronta fin dall'inizio | 7 | Stringhe esternalizzate, nessun testo hardcoded |
| Sezione contatti chiara e a bassa attivazione | 8 | Il visitatore deve potere scrivere in 30 secondi |

---

## Top 3 opportunità prioritarie

Basandosi sui punteggi e sull'obiettivo immediato (ricerca attiva posizione da dipendente):

### Opportunità 1 — Score 20
**Sezione About con identità valoriale esplicita**

Non è una biografia. È la risposta alla domanda "perché dovrei parlare con questa persona?". Include:
- Cosa muove Christian (crescita, non guadagno)
- Che tipo di realtà cerca (stimolante, con autonomia, piccola)
- La frase identitaria: "building things I'm proud of"

### Opportunità 2 — Score 19
**Case study progetti lavorativi con focus decisionale**

VisureHub e la migrazione Azure sono i due più forti. Devono essere presentati come:
- Quale problema esisteva
- Quale decisione architettuale/tecnica è stata presa
- Perché quella decisione
- Quale risultato misurabile

### Opportunità 3 — Score 18
**Hero section con tagline identitaria + case study VisureHub**

I primi 90 secondi sul sito devono rispondere a JOB-1 e avviare JOB-2. La hero section non può essere "Hi, I'm Christian, a Software Engineer". Deve catturare l'approccio sistemico fin dalla prima riga.

---

## Opportunità scartate o deprioritizzate per v1

| Opportunità | Motivo dello scarto |
|---|---|
| Blog/articoli tecnici | Richiede contenuto continuo — non scalabile nella fase di lancio |
| Certificazioni e stack list | Commodity — non differenzia |
| Timeline esperienze lavorative classica | Racconta output, non decisioni — da evitare come formato primario |
| Versione italiana | Deprioritizzata per ridurre time-to-launch |

---

## Allineamento team

**Nota**: Per un sito personale, l'allineamento cross-funzionale si traduce in allineamento tra la visione del prodotto (discovery) e l'implementazione tecnica (design + sviluppo). Le decisioni prese qui devono essere validate nella wave DISCUSS con il product-owner prima di procedere.

---

## Gate G2 — Criteri e valutazione

| Criterio | Target | Risultato | Stato |
|---|---|---|---|
| Opportunity Solution Tree completato | Sì | 3 livelli mappati | Superato |
| Top opportunità con score >8 | Sì | Top 3: score 20, 19, 18 | Superato |
| Job steps dei visitatori coperti | >80% | JOB-1, JOB-2, JOB-3 coperti al 100% | Superato |
| Top 2-3 opportunità prioritizzate | Sì | 3 opportunità selezionate con rationale | Superato |

**Verdetto G2**: Superato. Procedere alla Fase 3.
