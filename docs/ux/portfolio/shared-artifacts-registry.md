# Shared Artifacts Registry
# Portfolio CV Site — Christian Borrello
# Wave: DISCUSS — 2026-03-01

Ogni artefatto in questo registro appare in almeno due sezioni del sito.
Una variabile non tracciata in questo documento è una potenziale incoerenza di integrazione.

---

## Registro Artefatti

### SA-01 — Professional Identity Statement

| Campo | Valore |
|-------|--------|
| **Contenuto** | "I don't work for duty or money. I work to build something I'm proud of." |
| **Tipo** | Testo — frase identitaria primaria |
| **Single source** | Hero section |
| **Consumato in** | About (implicito nel tono), Contact (implicito nel subtext), Case study (implicito nel "beyond assignment") |
| **Formato** | Stringa localizzabile — chiave i18n: `hero.primary_statement` |
| **Rischio** | Se il tono altrove diverge, l'identità si frammenta |
| **Responsabile** | Copywriter / Christian stesso |

---

### SA-02 — Tagline Sistemica

| Campo | Valore |
|-------|--------|
| **Contenuto** | "I see architectures where others see tasks." |
| **Tipo** | Testo — supporting line hero |
| **Single source** | Hero section |
| **Consumato in** | About (parafrasato nel contesto ADHD), Projects intro |
| **Formato** | Stringa localizzabile — chiave i18n: `hero.supporting_line` |
| **Rischio** | Può sembrare arrogante se non è supportata da prove nei case study |

---

### SA-03 — Metrica SagitterHub (VisureHub Module)

| Campo | Valore |
|-------|--------|
| **Contenuto** | TDD >90%, Hexagonal Architecture, DDD, CQRS, Event Sourcing |
| **Tipo** | Metrica tecnica + pattern architetturali |
| **Single source** | Case study SagitterHub (VisureHub module) |
| **Consumato in** | Projects overview card (subset: TDD >90%), About (implicito in "quality non-negotiable") |
| **Formato** | Dati da validare con Christian — TDD >90% è un valore reale confermato |
| **Rischio** | Se il case study non spiega il perché di ogni scelta, la lista diventa un tech bingo |

---

### SA-04 — Metrica Azure Migration

| Campo | Valore |
|-------|--------|
| **Contenuto** | €380/mese → €100-160/mese, risparmio €280/mese, 46 risorse, Terraform IaC |
| **Tipo** | Metrica di business impact |
| **Single source** | Case study Azure Infrastructure |
| **Consumato in** | Projects overview card (hook: "€280/month saved"), About (implicito in "business impact") |
| **Formato** | Numeri da verificare con Christian prima della pubblicazione |
| **Rischio** | I range (€100-160) devono essere spiegati nel case study — range non documentato = imprecisione |

---

### SA-05 — Framing ADHD

| Campo | Valore |
|-------|--------|
| **Contenuto** | "Radical curiosity, hyperfocus on interesting problems, whole-system view" |
| **Tipo** | Narrativa identitaria — pattern di funzionamento |
| **Single source** | About section |
| **Consumato in** | Projects (implicito nella struttura multi-livello dei case study), Hero (implicito in "systems thinker") |
| **Formato** | Testo narrativo — non una lista di sintomi, un pattern di comportamento |
| **Rischio** | Tono clinico vs tono professionale — deve sempre rimanere nel registro professionale |

---

### SA-06 — Technology Philosophy

| Campo | Valore |
|-------|--------|
| **Contenuto** | "I choose technologies based on the problem, not based on what I know or feel comfortable with." |
| **Tipo** | Frase valoriale — citazione quasi letterale da discovery |
| **Single source** | About section |
| **Consumato in** | Case study (implicito nelle scelte tecnologiche documentate), Contact (implicito nel tono) |
| **Formato** | Stringa localizzabile — chiave i18n: `about.tech_philosophy` |
| **Rischio** | Deve essere confermata dai case study — se SagitterHub/VisureHub usa uno stack per convenienza, la frase si smentisce |

---

### SA-07 — Tone of Voice

| Campo | Valore |
|-------|--------|
| **Contenuto** | Diretto, onesto, non formale, non commerciale, nessun gergo marketing |
| **Tipo** | Vincolo di stile — trasversale a tutte le sezioni |
| **Single source** | Definito in Hero, About |
| **Consumato in** | Projects (case study language), Contact (headline, subtext, success state), Error states |
| **Formato** | Principio editoriale — non una stringa, una regola |
| **Rischio** | Una sola frase di marketing language rompe la coerenza dell'intero sito |
| **Test**: | "Blazing fast", "passionate about", "results-driven" = violazione immediata del tone |

---

### SA-08 — Form Contact Fields

| Campo | Valore |
|-------|--------|
| **Contenuto** | name (opzionale), email (obbligatorio), message (opzionale) |
| **Tipo** | Schema dati — form di contatto |
| **Single source** | Contact section |
| **Consumato in** | Backend service (Formspree/Resend), success state, error state |
| **Formato** | HTML form fields + validazione client-side |
| **Rischio** | Se il servizio esterno richiede campi aggiuntivi, il form deve essere aggiornato di conseguenza |
| **Dipendenza**: | Formspree free tier: 50 submissions/mese — sufficiente per v1 |

---

### SA-09 — Stack Tecnologico Dichiarato

| Campo | Valore |
|-------|--------|
| **Contenuto** | Per ogni progetto: lista tecnologie effettivamente usate |
| **Tipo** | Metadato — tecnologie per progetto |
| **Single source** | Case study di ogni progetto |
| **Consumato in** | Projects overview card (subset sintetico), About (implicito) |
| **Formato** | Lista tag — non narrativa, non valutativa |
| **Rischio** | La lista non deve essere il protagonista del case study — è un'appendice |

---

### SA-10 — Contact Success State

| Campo | Valore |
|-------|--------|
| **Contenuto** | "Message sent. I'll get back to you within a few days." |
| **Tipo** | Testo UI — stato post-azione |
| **Single source** | Contact section |
| **Consumato in** | Nessuna altra sezione — artefatto terminale |
| **Formato** | Stringa localizzabile — chiave i18n: `contact.success_message` |
| **Rischio** | Tono deve essere coerente con SA-07 — nessun marketing, nessuna promessa non mantenibile |

---

## Dipendenze di Integrazione

```
Hero (SA-01, SA-02)
    │
    ├──► About (SA-05, SA-06) ──► Conferma le promesse dell'Hero
    │
    └──► Projects (SA-03, SA-04, SA-09) ──► Prova le promesse dell'Hero
              │
              └──► Contact (SA-07, SA-08, SA-10) ──► Chiude il journey
```

---

## Checkpoints di Integrazione

| Checkpoint | Domanda | Stato |
|------------|---------|-------|
| IC-01 | La frase identitaria (SA-01) è coerente con il tono dei case study? | Da validare in DESIGN |
| IC-02 | Le metriche nelle card (SA-03, SA-04) corrispondono ai valori nei case study? | Numeri da confermare con Christian |
| IC-03 | La technology philosophy (SA-06) è dimostrata dalle scelte nei case study? | Da validare in DESIGN |
| IC-04 | Il tone of voice (SA-07) è rispettato in ogni stato del form (default, error, success)? | Da validare in DESIGN |
| IC-05 | Tutte le stringhe user-facing hanno una chiave i18n? | Da verificare in implementazione |
| IC-06 | Il form (SA-08) funziona con il servizio esterno scelto senza campi aggiuntivi? | Da testare nel Walking Skeleton |

---

## Variabili Ancora Non Risolte

| ID | Variabile | Dove appare | Azione richiesta |
|----|-----------|-------------|------------------|
| V-01 | Cognome esatto per dominio | Dominio .dev | Confermare cognome esatto con Christian |
| V-02 | Range €100-160 Azure | Case study Azure | Spiegare il range nel case study (dipende da utilizzo?) |
| V-03 | Numero risorse post-migrazione | Case study Azure | Quante risorse rimangono dopo la consolidazione? |
| V-04 | Servizio form: Formspree o Resend | Contact + Walking Skeleton | Decidere in Feature 0 — Formspree ha free tier più semplice |
| V-05 | Data di lancio target | Walking Skeleton | Definire con Christian per evitare perfezionismo indefinito |
