# Acceptance Criteria — Personal Portfolio CV Site
# Christian Borrello
# Wave: DISCUSS — 2026-03-01

Documento di riferimento consolidato per i criteri di accettazione BDD.
Ogni criterio è derivato dai UAT Scenarios delle user stories.

---

## AC-00 — Walking Skeleton

Derivato da: US-00

| ID | Criterio | Tipo |
|----|----------|------|
| AC-00-01 | L'URL di produzione risponde con status 200 | Funzionale |
| AC-00-02 | Un push su main branch trigghera deployment Vercel entro 2 minuti | Funzionale |
| AC-00-03 | Una submission del form con email valida raggiunge Christian via servizio esterno | Funzionale |
| AC-00-04 | Nessuna stringa user-facing è hardcoded nei componenti React | Architetturale |
| AC-00-05 | Il dominio .dev risolve correttamente all'URL Vercel | Funzionale |
| AC-00-06 | La pagina placeholder si carica senza errori di build | Funzionale |

**Definition of Done per US-00**: Tutti e 6 i criteri devono passare prima di iniziare US-01.

---

## AC-01 — Hero Section

Derivato da: US-01

| ID | Criterio | Tipo |
|----|----------|------|
| AC-01-01 | La frase identitaria primaria non usa le parole "passionate", "results-driven", "experienced" o formule equivalenti | Contenuto |
| AC-01-02 | La supporting line nomina il differenziatore sistemico in modo esplicito | Contenuto |
| AC-01-03 | La hero non contiene nessuna lista di tecnologie | Contenuto |
| AC-01-04 | Sono presenti due CTA: una per i progetti e una per il contatto | UI |
| AC-01-05 | Tutte le stringhe sono gestite tramite chiavi i18n — nessun testo hardcoded | Architetturale |
| AC-01-06 | Il tono della hero è coerente con il tono di About e Contact | Coerenza |

**Nota**: AC-01-01 è un criterio di qualità narrativa — va validato manualmente, non con test automatici.

---

## AC-02 — About Section

Derivato da: US-02

| ID | Criterio | Tipo |
|----|----------|------|
| AC-02-01 | La sezione descrive ADHD come pattern funzionale (curiosità, iperfocus, visione sistemica) — non come limitazione | Contenuto |
| AC-02-02 | La technology philosophy è presente e rispecchia la frase: "I choose technologies based on the problem, not based on what I know" | Contenuto |
| AC-02-03 | I valori non negoziabili sono presenti: onestà, semplicità, umanità, rispetto reciproco | Contenuto |
| AC-02-04 | La sezione include un riferimento alla filosofia come disciplina del pensiero applicata all'ingegneria | Contenuto |
| AC-02-05 | La sezione specifica cosa Christian cerca: remote-first, ownership, qualità non negoziabile | Contenuto |
| AC-02-06 | La sezione non contiene nessuna lista di competenze tecniche o certificazioni | Contenuto |
| AC-02-07 | La sezione non fa menzione esplicita della laurea non conclusa | Contenuto |
| AC-02-08 | La sezione è leggibile in circa 90 secondi (stima: 250-350 parole) | Lunghezza |

---

## AC-03 — Projects Section

Derivato da: US-03

### AC-03-A — Overview (griglia card)

| ID | Criterio | Tipo |
|----|----------|------|
| AC-03-01 | Sono presenti 5 card: SagitterHub, Azure Migration, OpenGL Renderer, iOS Habit Tracker, Unity Soulslike | Contenuto |
| AC-03-02 | Ogni card include un hook concreto (metrica o framing curioso) — nessuna card è solo una lista di tecnologie | Contenuto |
| AC-03-03 | La card SagitterHub menziona TDD >90% o l'approccio architetturale (VisureHub module) | Contenuto |
| AC-03-04 | La card Azure Migration menziona il risparmio (€280/mese) o il numero di risorse | Contenuto |
| AC-03-05 | I progetti personali usano linguaggio di esplorazione attiva — nessun termine apologetico | Contenuto |

### AC-03-B — Case Study SagitterHub (VisureHub Module)

| ID | Criterio | Tipo |
|----|----------|------|
| AC-03-06 | Sezione "The problem" presente in linguaggio accessibile ai non-specialisti | Struttura |
| AC-03-07 | Sezione "What I saw" presente con ragionamento esplicito e percorso mentale | Struttura |
| AC-03-08 | Sezione "The decisions" presente con criteri espliciti per Hexagonal, DDD, CQRS, TDD | Struttura |
| AC-03-09 | Sezione "Beyond the assignment" presente con almeno un esempio di agency | Struttura |
| AC-03-10 | Sezione "What didn't work" presente con almeno una limitazione onesta | Struttura |
| AC-03-11 | Sezione "The bigger picture" presente — connette il tecnico all'ideale | Struttura |
| AC-03-12 | Sezione "For non-specialists" presente e comprensibile a chi non programma | Struttura |
| AC-03-13 | Stack listato come appendice, non come protagonista | Struttura |

### AC-03-C — Case Study Azure Migration

| ID | Criterio | Tipo |
|----|----------|------|
| AC-03-14 | Il costo iniziale (€380/mese) e quello finale (€100-160/mese) sono esplicitati nel linguaggio accessibile | Contenuto |
| AC-03-15 | La motivazione dietro Terraform IaC è spiegata come decisione per il futuro, non come tech-for-tech | Contenuto |
| AC-03-16 | Il range €100-160 è spiegato (non lasciato come imprecisione non documentata) | Contenuto |
| AC-03-17 | Sezione "What didn't work" presente con almeno una cosa che Christian rifarebbe diversamente | Struttura |
| AC-03-18 | Tutte e 8 le sezioni del template presenti | Struttura |

### AC-03-D — Progetti Personali

| ID | Criterio | Tipo |
|----|----------|------|
| AC-03-19 | OpenGL Renderer: framing come curiosità verso il livello più basso — "capire come funziona davvero" | Contenuto |
| AC-03-20 | iOS Habit Tracker: framing come scelta tecnologica guidata dal problema, fuori dallo stack principale | Contenuto |
| AC-03-21 | Unity Soulslike: framing come esplorazione di un dominio completamente diverso | Contenuto |
| AC-03-22 | Nessun progetto personale contiene le parole "unfinished", "work in progress" senza contesto di esplorazione | Contenuto |

---

## AC-04 — Contact Section

Derivato da: US-04

| ID | Criterio | Tipo |
|----|----------|------|
| AC-04-01 | Il form ha esattamente 3 campi: nome (opzionale), email (obbligatorio), messaggio (opzionale) | UI |
| AC-04-02 | La submission con solo l'email viene accettata e ricevuta da Christian | Funzionale |
| AC-04-03 | La submission con nome + email + messaggio viene ricevuta da Christian con tutti i campi | Funzionale |
| AC-04-04 | La submission senza email mostra un errore inline sul campo email | Funzionale |
| AC-04-05 | L'errore di validazione non cancella il testo già scritto nel campo messaggio | Funzionale |
| AC-04-06 | Il success state mostra: "Message sent. I'll get back to you within a few days." | UI |
| AC-04-07 | L'headline è conversazionale (es. "Let's talk") — non transazionale | Contenuto |
| AC-04-08 | Il subtext esplicita apertura sia a posizioni da dipendente che a collaborazioni freelance | Contenuto |
| AC-04-09 | Il form non ha nessun campo aggiuntivo oltre ai 3 specificati | UI |
| AC-04-10 | Nessun CAPTCHA visibile in v1 | UI |

---

## AC-CROSS — Criteri Trasversali

| ID | Criterio | Sezioni interessate |
|----|----------|---------------------|
| AC-X-01 | Il sito carica la pagina principale in meno di 2 secondi su connessione standard (LCP < 2.5s) | Tutte |
| AC-X-02 | Nessun testo user-facing è hardcoded nei componenti React — tutto via chiavi i18n | Tutte |
| AC-X-03 | Aggiungere `/locales/it/` non richiede modifiche ai componenti React | Architettura |
| AC-X-04 | Il sito risponde con status 200 su tutte le route previste | Funzionale |
| AC-X-05 | Nessun analytics script è caricato in v1 | Privacy |
| AC-X-06 | Nessun cookie di tracciamento impostato in v1 | Privacy |
| AC-X-07 | Il tono è coerente in tutte le sezioni — nessuna frase di marketing language | Coerenza |
| AC-X-08 | Tutti i heading rispettano la gerarchia semantica h1 → h2 → h3 | Accessibilità |
| AC-X-09 | Il contrasto testo/sfondo rispetta WCAG AA (ratio ≥ 4.5:1 per testo normale) | Accessibilità |
| AC-X-10 | Open Graph tags presenti per condivisione LinkedIn | SEO |

---

## Criteri di Qualità Narrativa (Non Automatizzabili)

Questi criteri richiedono review manuale — non possono essere verificati con test automatici.

| ID | Criterio | Metodo di verifica |
|----|----------|--------------------|
| NQ-01 | Un non-tecnico (es. familiare di Christian) capisce cosa fa SagitterHub/VisureHub dalla sezione "For non-specialists" | User test informale |
| NQ-02 | Un recruiter tecnico (Marco) trova nel case study SagitterHub almeno 3 elementi di ragionamento esplicito | Review con persona reale o simulata |
| NQ-03 | Nessuna sezione del sito si legge come un CV scritto in prima persona | Review editoriale |
| NQ-04 | Il tono dell'About è coerente con "una persona, non un brand" | Review editoriale |
| NQ-05 | La sezione "What didn't work" di ogni case study suona onesta, non performativa | Review editoriale |

---

## Matrice di Copertura DoR

| User Story | AC derivati | Scenari Gherkin | DoR item 4 (3-7 scenari) |
|------------|-------------|-----------------|--------------------------|
| US-00 Walking Skeleton | 6 | 4 | Conforme |
| US-01 Hero | 6 | 3 | Conforme |
| US-02 About | 8 | 3 | Conforme |
| US-03 Projects | 22 | 4 | Conforme — valutare split |
| US-04 Contact | 10 | 4 | Conforme |
