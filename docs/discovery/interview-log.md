# Interview Log — Personal Portfolio / CV Site

**Data**: 2026-03-01
**Facilitatore**: Scout (nw-product-discoverer)
**Partecipante**: Christian Borrello (il sito è per lui — il "cliente" è lui stesso)
**Audience target del sito**: Recruiter tecnici, potenziali clienti freelance
**Metodo**: Mom Test adattato — domande su comportamento passato, non intenzioni future

---

## Sessione 1 — Il problema reale

**Domanda**: Pensa all'ultima volta che qualcuno ha valutato il tuo profilo professionale. Chi era quella persona? Cosa stava cercando di capire su di te? Cosa gli è mancato per poter decidere?

**Risposta**:
> "Probabilmente sia dal mio linkedin che dal mio github che dal mio cv che dalle candidature in generale che ho mandato non traspare il mio genuino interesse e passione per l'ambito tech e per aiutare le persone in generale, poi sicuramente la disorganizzazione dei miei profili linkedin e github non hanno aiutato. In generale sono una persona con funzionamento ADHD, questo presuppone tante differenze rispetto ad uno sviluppatore o software engineer più normale, sia punti di forza che di debolezza."

**Insight chiave**: Il problema non è tecnico (struttura del sito, stack) ma di comunicazione dell'identità. I canali esistenti non trasmettono la passione autentica e l'approccio ingegneristico reale.

**Ipotesi confermata**: I canali attuali (LinkedIn, GitHub, CV) falliscono nel comunicare chi è Christian come professionista.

**Flag**: L'ADHD emerge come elemento identitario rilevante — introduce superpoteri (curiosità, iperfocus, esplorazione tecnologica) e sfide (progetti non finiti, disorganizzazione percepita).

---

## Sessione 2 — I superpoteri concreti

**Domanda**: Pensa agli ultimi 12-18 mesi di lavoro. Quali sono i 2-3 episodi specifici in cui il tuo funzionamento ti ha permesso di fare qualcosa di valore?

**Risposta**:
> "Di base in un contesto che mi stimola e mi permette di essere creativo non mi limito al portare a termine i task che mi vengono assegnati dal mio referente ma cerco sempre di chiedermi cosa realmente potrebbe fare veramente la differenza nella feature a cui sto lavorando oppure se c'è un modo di semplificare il tutto. In genere non perdo mai la visione di insieme e ragiono sempre su soluzioni innovative, creative e moderne che risolvano i problemi in modo strutturale, anche quando questo non coincide con il lavoro che mi viene assegnato."

**Insight chiave**: Superpotere primario = visione sistemica + pensiero strutturale + autonomia verso la qualità oltre il mandato assegnato.

**Pattern identificato**: "Vedo sistemi dove altri vedono task. Costruisco infrastruttura dove altri consegnano funzionalità."

**Differenziatore per il target**: Questo è esattamente ciò che cercano i team piccoli in crescita che valorizzano l'autonomia operativa.

---

## Sessione 3 — I progetti e come presentarli

**Domanda**: Pensa a 2-3 progetti non completati. Per ognuno: cosa hai imparato tecnicamente prima di fermarti? E cosa ti ha fermato?

**Risposta** (con lista progetti):
> "Partendo dal fatto che l'intenzione rimane comunque quella di lavorarci per renderli quanto meno presentabili e funzionanti anche se non del tutto completati e rifiniti, e soprattutto ben documentati per far capire a chi legge il reale vantaggio o apprendimento prodotto dal progetto."

**Progetti personali dichiarati**:
- OpenGL-Renderer (curiosità tecnica a basso livello)
- Videogioco soulslike Unity (esplorazione dominio diverso dallo stack lavorativo)
- Videogioco 2D soulslike con amici (collaborazione informale)
- Habit tracker iOS in Swift (linguaggio e piattaforma fuori comfort zone)

**Progetti lavorativi dichiarati**:
- VisureHub — .NET + React + Azure, Hexagonal Architecture, DDD, CQRS, Event Sourcing, TDD >90%
- Automa Visure Ipotecarie — Selenium scraper, Container App Azure
- Automa Telemaco — Azure Function, estrazione dati registro imprese
- SagitterHub — consolidamento tool in piattaforma unificata, Razor Pages, WebAPI, Service Bus
- RateWatch — monitoraggio Euribor, notifiche email, Azure Function, integrato CRM
- Migrazione Azure — 46 risorse, da €380/mese a €100-160/mese, Terraform IaC
- Web Scraping Centri per l'Impiego
- Business Plan e presentazioni aziendali

**Insight chiave**: I progetti lavorativi raccontano una storia coerente di ingegneria sistemica applicata a problemi reali, non di semplice delivery. La migrazione Azure con risparmio misurabile (€280/mese) è evidenza di business impact diretto.

---

## Sessione 4 — Il visitatore che conta di più

**Domanda**: Pensa all'ultimo colloquio tecnico. Cosa avresti voluto che capissero di te prima ancora di arrivare al colloquio?

**Risposta**:
> "Penso che se si capisse che tipo di persona sono avrei molte più opportunità, non orientata al mero guadagno ma alla crescita, sempre in cerca di realtà stimolanti nelle quali avere un ruolo, non mi interessa lavorare per 'dovere' o per guadagno ma esclusivamente per realizzare qualcosa di cui possa essere fiero."

**Insight chiave**: Il differenziatore principale non è tecnico ma motivazionale e valoriale. La frase esatta "realizzare qualcosa di cui possa essere fiero" è il cuore del posizionamento — va usata in forma diretta nel sito.

**Implicazione per il sito**: Il sito deve fare selezione naturale dei visitatori. Chi cerca solo un esecutore non è il target giusto. Chi cerca ownership e pensiero sistemico troverà immediato riconoscimento.

---

## Sessione 5 — Le metriche di successo

**Domanda**: Cosa guarderesti concretamente nelle prime 6 settimane per dire "sta funzionando" o "non sta funzionando"?

**Risposta**:
> "Innanzitutto andrei a creare un counter delle visite e che possibilmente tenga traccia anche della provenienza delle visite, se tramite linkedin, github, candidature che invio ecc... Sicuramente anche solo 100 visite nelle prime 4-6 settimane considerando che non ho una presenza social rilevante e che non invio poi così tante candidature sarebbe un ottimo risultato. In generale sarebbe utile avere delle analytics che mi permettano di analizzare i dati in nostro possesso."

**Metriche definite**:
- Target primario: 100 visite uniche nelle prime 4-6 settimane
- Tracking provenienza: LinkedIn, GitHub, candidature dirette (UTM parameters)
- Strumento: analytics con source attribution

---

## Sessione 6 — La lingua del sito

**Domanda**: Il sito esce in inglese, italiano, o entrambe le lingue dal giorno uno?

**Risposta**:
> "Iniziamo dalla versione in inglese, tuttavia a lungo termine il piano sarebbe che in base alla lingua dell'utente che lo visita il sito venga tradotto automaticamente."

**Decisione**: Lancio in inglese. Internazionalizzazione (i18n) pianificata come fase futura con rilevamento automatico della lingua.

**Implicazione architetturale**: Il sito deve essere costruito con i18n in mente fin dall'inizio — stringhe esternalizzate, struttura pronta per multiple lingue — anche se v1 è solo in inglese.

---

## Riepilogo evidenze raccolte

| Domanda | Risposta comportamentale | Qualità evidenza |
|---|---|---|
| Problema reale | Identità non comunicata dai canali esistenti | Alta — esperienza diretta |
| Superpotere principale | Visione sistemica + pensiero strutturale autonomo | Alta — pattern lavorativo documentato |
| Progetti da mostrare | Mix personali (esplorazione) + lavorativi (impatto) | Alta — lista concreta |
| Visitatore target prioritario | Recruiter tecnico in team piccoli in crescita | Alta — obiettivo immediato confermato |
| Metrica di successo | 100 visite con source tracking in 4-6 settimane | Alta — numero specifico, realistico |
| Lingua | Inglese v1, i18n in roadmap | Alta — decisione consapevole |
