# Requirements — Personal Portfolio CV Site
# Christian Borrello
# Wave: DISCUSS — 2026-03-01
# Stato: Pronto per handoff DESIGN wave

---

## Sommario

Questo documento raccoglie tutti i requisiti strutturati per il portfolio personale di Christian Borrello. I requisiti derivano dagli artefatti di journey prodotti nella DISCUSS wave e sono validati contro il DoR a 8 criteri.

**Scope v1 MVP:**
- Walking Skeleton (Feature 0) — architettura end-to-end deployata
- Hero section
- About section
- Projects section (5 progetti, template case study)
- Contact section (form essenziale)
- i18n-ready architecture (EN only in v1)

**Fuori scope v1 — documentato per iterazioni successive:**
- Analytics (Umami self-hosted) → Iterazione 2
- Personalizzazione UX per persona → v2+
- Versione italiana → v2

---

## Contesto di Prodotto

### Il problema validato

I canali professionali esistenti di Christian (LinkedIn, GitHub, CV cartaceo) non comunicano la sua identità professionale autentica. I visitatori non riescono a distinguerlo da un profilo ordinario e non possono riconoscere il fit culturale e tecnico che renderebbe la collaborazione eccezionale.

### Posizionamento

> "I don't work for duty or money. I work to build something I'm proud of."

Christian è un Software Engineer con pensiero sistemico che non consegna feature — costruisce sistemi. Il sito è il mezzo attraverso cui questa identità diventa visibile e verificabile.

### Target

1. **Recruiter tecnico** (audience primaria, obiettivo immediato): Marco Ferretti — cerca un Software Engineer (junior/mid, ~1.5 anni di esperienza) full-remote per team piccolo/in crescita. Valuta ownership e pensiero architetturale, non solo anni sul CV.
2. **Cliente freelance** (audience secondaria, obiettivo lungo termine): Giulia Marchetti — founder/CTO che cerca un ingegnere affidabile con pensiero sistemico per un progetto concreto. Non cerca necessariamente un senior — cerca qualcuno che capisca il problema.

**Nota strategica — livello di esperienza**: Christian ha ~1.5 anni di esperienza professionale (VIS Software Solutions: giu-nov 2024; Sagitter S.p.A.: mar 2025-oggi) e la laurea in corso. Il profilo è junior/intermediate. Il posizionamento non nasconde questo fatto — lo rende irrilevante attraverso le prove: architetture enterprise reali, TDD >90%, €280/mese risparmiati su 46 risorse cloud. "Giudica dal lavoro, non dal titolo."

### Metrica di successo primaria

100 visite uniche nelle prime 4-6 settimane post-lancio, con source attribution (LinkedIn, GitHub, candidature dirette via UTM parameters).

---

## Feature 0 — Walking Skeleton

### Descrizione

Prima di costruire qualsiasi feature di prodotto, il progetto ha bisogno di un'architettura end-to-end deployata e verificata. Il Walking Skeleton dimostra che il flusso completo funziona: modifica al codice → build → deployment automatico → URL di produzione raggiungibile.

### Obiettivo

Eliminare il rischio di integrazione infrastrutturale prima che il lavoro sui contenuti inizi. Se il walking skeleton non funziona, scoprirlo subito — non dopo aver costruito l'intero sito.

### Stack deciso

| Layer | Tecnologia | Motivazione |
|-------|-----------|-------------|
| Framework | Next.js (SSG) | i18n-ready, SSG per SEO, Vercel-native, deployment automatico |
| Styling | Tailwind CSS | Sobrio, moderno, nessuna dipendenza da designer specializzato |
| Hosting | Vercel (free tier) | Zero costi, CDN globale, deployment automatico da Git |
| Dominio | `christianborrello.dev` o equivalente .dev | .dev credibile per profilo tecnico, ~€12-15/anno |
| Form contatti | Formspree (free tier) o Resend | Zero backend proprietario, 50 submissions/mese sufficienti per v1 |
| i18n | next-intl o next-i18next | Struttura ready, EN only in v1, nessuna stringa hardcoded nei componenti |
| Analytics | Deferred — Iterazione 2 | Umami self-hosted su Railway/Supabase |

### Deliverable del Walking Skeleton

1. Progetto Next.js scaffoldato con struttura i18n-ready
2. Deploy su Vercel free tier configurato
3. Dominio .dev connesso a Vercel
4. Pagina placeholder visibile all'URL di produzione
5. Push su main branch trigghera deployment automatico
6. Form di contatto minimo wired a Formspree/Resend — submission ricevuta verificata

### Criteri di completamento

Il Walking Skeleton è completo quando:
- L'URL di produzione risponde con 200
- Un push al repo aggiorna il sito in produzione entro 2 minuti
- Un'email di test via form arriva a Christian

---

## Requisiti Funzionali

### RF-01 — Hero Section

**Priorità**: Must have — v1

**Descrizione**: La sezione hero comunica l'identità professionale di Christian in 30 secondi, rompendo il pattern dei portfolio generici.

**Contenuto richiesto**:
- Frase identitaria primaria (SA-01): tono diretto, non generico
- Supporting line sistemica (SA-02): differenziatore nominato
- CTA primaria: "View my work"
- CTA secondaria: "Get in touch"
- Nessuna lista di tecnologie

**Vincoli**:
- Nessun testo hardcoded — tutto via chiavi i18n
- Il tono deve essere coerente con SA-07 (tone of voice)
- La frase deve essere seguita da prove visibili nel resto del sito

---

### RF-02 — About Section

**Priorità**: Must have — v1

**Descrizione**: La sezione about risponde alla domanda "chi è questa persona?" con un layer umano oltre quello professionale. Serve entrambe le personas senza personalizzazione.

**Contenuto richiesto**:
- Identità professionale: systems thinker che va oltre il mandato
- ADHD framing (SA-05): pattern di funzionamento, non limitazione
- Technology philosophy (SA-06): citazione quasi letterale dalla discovery
- Layer filosofico: filosofia come disciplina del pensiero applicata all'ingegneria
- Valori: onestà, semplicità, umanità prima del denaro, rispetto reciproco non negoziabile
- Cosa cerca: team remote-first, ownership, qualità non negoziabile
- "Courage mistaken for luck": agency mascherata da fortuna

**Vincoli**:
- Non è un secondo CV — nessuna lista di competenze
- Nessuna menzione esplicita di "non ho la laurea" — la narrativa lo rende irrilevante
- Tono coerente con SA-07

---

### RF-03 — Projects Section (Overview)

**Priorità**: Must have — v1

**Descrizione**: Griglia di card progetto che mostrano hook concreti e metriche, non liste di tecnologie.

**Progetti v1**:

| ID | Titolo | Hook | Tipo |
|----|--------|------|------|
| P-01 | SagitterHub | "Enterprise platform built right." + TDD >90% (VisureHub module) | Lavorativo |
| P-02 | Azure Infrastructure Consolidation | "Saved €280/month on 46 cloud resources." | Lavorativo |
| P-03 | OpenGL Renderer | "Low-level graphics exploration." | Personale |
| P-04 | iOS Habit Tracker | "First time on iOS — Swift." | Personale |
| P-05 | Unity Soulslike Game | "Exploring a completely different domain." | Personale |

**Vincoli per ogni card**:
- Massimo 2-3 righe di testo + hook metrica
- CTA "Read case study" che porta al caso studio dedicato
- I progetti personali sono "active technical exploration" — nessun framing apologetico

---

### RF-04 — Case Study Template

**Priorità**: Must have — v1

**Descrizione**: Template strutturato applicato a ogni progetto. Questo è il contenuto più differenziante del sito.

**Struttura obbligatoria** (8 sezioni):

| Sezione | Contenuto | Note |
|---------|-----------|------|
| The problem | Business problem in linguaggio accessibile | Non tecnico, comprensibile a non-specialisti |
| What I saw | Ragionamento esplicito: cosa ho notato che altri non vedevano | Percorso mentale, non solo conclusioni |
| The decisions | Criteri usati, cosa ho scartato e perché, trade-off accettati | Esplicito sulle alternative non scelte |
| Beyond the assignment | Cosa ho fatto senza che nessuno me lo chiedesse | Agency e iniziativa |
| What didn't work | Limiti onesti, cosa rifarei, cosa non so ancora | Pensiero critico applicato a se stesso |
| The bigger picture | Dal micro tecnico → applicativo → ideale → filosofico | Multi-livello: dai 4 in su |
| For non-specialists | Stesso progetto spiegato senza gergo tecnico | Accessibilità come competenza |
| Stack | Lista tag delle tecnologie effettivamente usate | Appendice, non protagonista |

**Vincoli**:
- Nessuna sezione può essere omessa nei progetti lavorativi (P-01, P-02)
- Nei progetti personali (P-03, P-04, P-05) la sezione "Beyond the assignment" può essere adattata
- Il tono è saggistico, non tecnico-burocratico
- I limiti onesti sono obbligatori — non optional

---

### RF-05 — Contact Section

**Priorità**: Must have — v1

**Descrizione**: Form essenziale, low-friction, che apre una conversazione senza impegno implicito.

**Specifiche form**:
- Campo nome: testo libero, opzionale
- Campo email: email, obbligatorio
- Campo messaggio: textarea, opzionale
- CTA: "Send message"
- Success state: "Message sent. I'll get back to you within a few days."
- Error state: evidenziazione campo email mancante, testo plain language, dati preservati

**Headline e subtext**:
- Headline: "Let's talk"
- Subtext: "Whether you're looking for a new team member or want to collaborate on something meaningful — I'm open to conversations."

**Vincoli**:
- Nessun campo aggiuntivo (no: tipo di richiesta, budget, telefono)
- Nessun CAPTCHA in v1
- Tono coerente con SA-07 — zero marketing language
- Il servizio esterno riceve la submission e notifica Christian

---

### RF-06 — i18n Architecture

**Priorità**: Must have — v1 (anche se EN only)

**Descrizione**: Tutte le stringhe user-facing sono esternalizzate in file di locale. Nessun testo hardcoded nei componenti.

**Struttura richiesta**:
```
/locales
  /en
    common.json
    hero.json
    about.json
    projects.json
    contact.json
```

**Vincoli**:
- Ogni stringa user-facing ha una chiave i18n corrispondente
- Il routing supporta `/en/` come prefisso opzionale
- Aggiungere una nuova lingua richiede solo un nuovo file — nessun refactoring di componenti

---

## Requisiti Non Funzionali

### RNF-01 — Performance

- Pagina principale: caricamento sotto 2 secondi su connessione standard (LCP < 2.5s)
- Immagini: ottimizzate tramite Next.js Image component
- Nessuna dipendenza JavaScript di terze parti non necessaria in v1

### RNF-02 — SEO

- Meta title e description configurabili per ogni pagina
- Open Graph tags per condivisione su LinkedIn
- Sitemap.xml generata automaticamente da Next.js

### RNF-03 — Accessibilità

- Contrasto minimo WCAG AA per tutto il testo
- Struttura heading semantica (h1 → h2 → h3)
- Form labels collegati ai rispettivi input

### RNF-04 — Privacy

- Nessun analytics in v1
- Nessun cookie di tracciamento
- Il form non trasmette dati a terzi oltre al servizio di invio email

### RNF-05 — Costi

- Hosting: €0 (Vercel free tier)
- Dominio: ~€12-15/anno
- Form: €0 (Formspree free tier, 50 submissions/mese)
- Analytics (iterazione 2): €0 (Umami self-hosted su Railway/Supabase free tier)

---

## Feature Future — Documentate, Fuori Scope v1

### F-FUTURE-01 — Analytics (Iterazione 2)

**Strumento**: Umami self-hosted
**Hosting**: Railway o Supabase PostgreSQL (free tier)
**Motivazione**: 100 visite uniche in 4-6 settimane è la metrica di successo primaria — richiede misurazione
**Prerequisito**: Walking skeleton live e funzionante
**Nota implementativa**: Il sito v1 non richiede modifiche strutturali per aggiungere Umami — basta aggiungere lo script

### F-FUTURE-02 — Personalizzazione UX per Persona (v2+)

**Descrizione**: All'inizio della navigazione, chiedere al visitatore "Are you a recruiter or someone interested in collaborating with Christian?" e personalizzare l'ordine dei contenuti di conseguenza.

**Motivazione**: Recruiter privilegia SagitterHub/VisureHub (architettura); cliente freelance privilegia Azure migration (business impact)

**Prerequisito**: Dati analytics che confermano lo split delle personas prima di costruire
**Nota architetturale**: L'architettura dei contenuti v1 deve già supportare questo riordino senza refactoring. I progetti personali e lavorativi devono essere in strutture dati separate.

### F-FUTURE-03 — Versione Italiana (v2)

**Descrizione**: Rilevamento automatico della lingua del browser, versione italiana servita a visitatori italiani
**Prerequisito**: i18n architecture di RF-06 completa e funzionante
**Nota**: Nessun cambio architetturale richiesto — aggiungere `/locales/it/` e configurare next-intl

---

## Dipendenze e Rischi

| ID | Tipo | Descrizione | Mitigazione |
|----|------|-------------|-------------|
| D-01 | Dipendenza esterna | Formspree free tier: 50 submissions/mese | Sufficiente per v1 — monitorare alla soglia |
| D-02 | Dipendenza esterna | Vercel free tier: limiti di bandwidth | Sufficiente per traffico portfolio — monitorare |
| D-03 | Contenuto | Numeri Azure (V-02, V-03) da confermare | Christian deve verificare i valori prima della pubblicazione |
| D-04 | Contenuto | Case study devono essere scritti da Christian | Il template è definito — il contenuto è il bottleneck principale |
| R-01 | Rischio | Perfezionismo senza data di lancio fissa | Definire una data target — il sito esce come MVP di qualità, non come capolavoro definitivo |
| R-02 | Rischio | Walking skeleton bloccato da configurazione dominio | Iniziare il walking skeleton prima di acquistare il dominio usando il subdomain Vercel gratuito |
