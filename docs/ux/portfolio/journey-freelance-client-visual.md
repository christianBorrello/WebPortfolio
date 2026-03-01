# Journey Map — Cliente Freelance
# Portfolio CV Site — Christian Borrello

**Persona**: Giulia Marchetti, Founder/CTO di una startup early-stage
**Contesto**: Sta cercando un Software Engineer senior con cui collaborare su un progetto complesso. Non ha un team interno tecnico strutturato. Ha avuto esperienze negative con freelance che consegnavano codice funzionante ma non mantenibile. Arriva sul sito via referral da un contatto comune.
**Entry point**: Link condiviso direttamente ("conosco qualcuno che potrebbe fare al caso tuo")

---

## Arco Emotivo Complessivo

```
INIZIO            METÀ              FINE
Diffidente  ──►  Rassicurata  ──►  Entusiasta
    │                 │                 │
    │                 │                 │
"Sarà l'ennesimo   "Questo sa         "Voglio lavorare
 freelance che     cosa sta           con questa
 sparisce dopo     facendo davvero"   persona"
 la prima sprint"
```

---

## La paura primaria del cliente freelance

Prima di tutto: il cliente freelance non ha paura che tu non sia bravo. Ha paura di:

```
┌─────────────────────────────────────────────────────┐
│  Le 3 paure reali                                   │
│                                                     │
│  1. "Sparirà a metà progetto"                       │
│     → Segnale cercato: affidabilità e continuità    │
│                                                     │
│  2. "Consegnerà codice che non capisco e            │
│      non posso mantenere"                           │
│     → Segnale cercato: chiarezza comunicativa       │
│                                                     │
│  3. "Junior che si spaccia per senior"              │
│     → Segnale cercato: prove concrete, non claim    │
│                                                     │
│  Vulnerabilità di Christian:                        │
│  Profilo junior percepito, laurea non conclusa      │
│                                                     │
│  Risposta narrativa del sito:                       │
│  "Non ho il titolo. Ho VisureHub, €280/mese         │
│   risparmiati, TDD >90%, e il ragionamento          │
│   che ha portato a quei risultati."                 │
│  → Giudica dal lavoro, non dal titolo.              │
└─────────────────────────────────────────────────────┘
```

---

## Mappa del Journey

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 1 — Arrivo                                                            │
│  Canale: Referral diretto — link condiviso da contatto comune               │
│  Pagina: Hero section                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  COSA VEDE (mockup):                                                        │
│  ┌───────────────────────────────────────────────┐                         │
│  │                                               │                         │
│  │   I don't work for duty or money.             │                         │
│  │   I work to build something I'm proud of.     │                         │
│  │                                               │                         │
│  │   Christian Borrello                          │                         │
│  │   Software Engineer — Systems Thinker         │                         │
│  │                                               │                         │
│  │   I see architectures where others see tasks. │                         │
│  │                                               │                         │
│  │   [View my work]          [Get in touch]      │                         │
│  │                                               │                         │
│  └───────────────────────────────────────────────┘                         │
│                                                                             │
│  COME SI SENTE: Diffidente → Interessata                                   │
│  PENSIERO: "Sembra diverso dagli altri. Ma tutti sembrano diversi.         │
│             Vediamo se il lavoro lo conferma."                              │
│                                                                             │
│  AZIONE: Va direttamente a Projects (non About — vuole le prove)           │
│                                                                             │
│  DIFFERENZA rispetto al recruiter: Il cliente freelance salta About        │
│  e va prima alle prove concrete. L'About lo legge dopo.                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 2 — Scan dei progetti                                                 │
│  Pagina: Projects section — cards overview                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  COSA VEDE:                                                                 │
│  ┌───────────────────────────────────────────────┐                         │
│  │                                               │                         │
│  │   Projects                                    │                         │
│  │                                               │                         │
│  │   ┌─────────────────────┐  ┌───────────────┐ │                         │
│  │   │ VisureHub           │  │ Azure Infra   │ │                         │
│  │   │                     │  │ Consolidation │ │                         │
│  │   │ Enterprise platform │  │               │ │                         │
│  │   │ built right.        │  │ Saved €280/mo │ │                         │
│  │   │                     │  │ on cloud      │ │                         │
│  │   │ [Read case study]   │  │ infrastructure│ │                         │
│  │   └─────────────────────┘  └───────────────┘ │                         │
│  │                                               │                         │
│  └───────────────────────────────────────────────┘                         │
│                                                                             │
│  COME SI SENTE: Interessata → Rassicurata parzialmente                     │
│  PENSIERO: "Progetti enterprise reali. Non solo side projects.             │
│             Ma sarà in grado di lavorare sul mio problema specifico?"       │
│                                                                             │
│  AZIONE: Clicca su Migrazione Azure (il risparmio concreto la              │
│          colpisce — lei ha un budget limitato)                              │
│                                                                             │
│  PATTERN SPECIFICO: Il cliente freelance è attratto dal business impact    │
│  misurabile, non dall'eleganza architetturale                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 3 — Lettura case study                                                │
│  Pagina: Azure Infrastructure case study                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  COSA VEDE (struttura case study — sezione rilevante per il freelance):     │
│  ┌───────────────────────────────────────────────┐                         │
│  │                                               │                         │
│  │   Azure Infrastructure Consolidation          │                         │
│  │                                               │                         │
│  │   The problem (in plain language)             │                         │
│  │   "The company was paying €380/month for 46   │                         │
│  │    Azure resources. Many were redundant,      │                         │
│  │    some forgotten, none documented."          │                         │
│  │                                               │                         │
│  │   What I saw that others missed               │                         │
│  │   [Ragionamento sistemico: come ho mappato    │                         │
│  │    le dipendenze, cosa ho trovato, perché     │                         │
│  │    era più complesso di quanto sembrava]      │                         │
│  │                                               │                         │
│  │   The decisions                               │                         │
│  │   [Terraform IaC: perché questa scelta,       │                         │
│  │    cosa significa per il futuro]              │                         │
│  │                                               │                         │
│  │   Result                                      │                         │
│  │   €100-160/month — saving €280/month          │                         │
│  │   46 → [N] resources, fully documented        │                         │
│  │   Infrastructure as Code — reproducible       │                         │
│  │                                               │                         │
│  │   What I'd do differently                     │                         │
│  │   [Limiti onesti: cosa avrei cambiato,        │                         │
│  │    cosa non ho ancora capito bene]            │                         │
│  │                                               │                         │
│  └───────────────────────────────────────────────┘                         │
│                                                                             │
│  COME SI SENTE: Rassicurata → Impressionata                                │
│  PENSIERO: "Sa spiegare una cosa complessa in modo semplice.               │
│             Sa dove ha sbagliato. Non si vende come perfetto.              │
│             Questo mi fido."                                                │
│                                                                             │
│  AZIONE: Torna ai Projects, legge anche VisureHub in diagonale,            │
│          poi va a About                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 4 — Chi è questa persona?                                             │
│  Pagina: About section (letta DOPO i progetti, non prima)                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  COSA VEDE:                                                                 │
│  ┌───────────────────────────────────────────────┐                         │
│  │                                               │                         │
│  │   About                                       │                         │
│  │                                               │                         │
│  │   [Stessa sezione vista dal recruiter —       │                         │
│  │    ma il freelance client la legge con        │                         │
│  │    lenti diverse]                             │                         │
│  │                                               │                         │
│  │   → "I choose technologies based on           │                         │
│  │      the problem" = non mi vendo un           │                         │
│  │      stack che non serve                      │                         │
│  │                                               │                         │
│  │   → "I value honesty" = se qualcosa           │                         │
│  │      non va, lo dico                          │                         │
│  │                                               │                         │
│  │   → "I'm looking for meaningful work" =       │                         │
│  │      non sparirà dopo la prima sprint         │                         │
│  │                                               │                         │
│  └───────────────────────────────────────────────┘                         │
│                                                                             │
│  COME SI SENTE: Impressionata → Entusiasta                                 │
│  PENSIERO: "Non cerca solo i soldi. Non sparirà. Sa lavorare in            │
│             autonomia. Questo è esattamente quello che cerco."             │
│                                                                             │
│  AZIONE: Va a Contact                                                      │
│                                                                             │
│  NOTA CRITICA: Il cliente freelance legge l'About con lenti diverse        │
│  dal recruiter. Gli stessi contenuti rispondono a paure diverse.           │
│  Il sito non deve cambiare — deve essere abbastanza ricco da               │
│  rispondere a entrambe le letture.                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 5 — Il contatto                                                       │
│  Pagina: Contact section                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  COSA VEDE:                                                                 │
│  ┌───────────────────────────────────────────────┐                         │
│  │                                               │                         │
│  │   Let's talk                                  │                         │
│  │                                               │                         │
│  │   Whether you're looking for a new team       │                         │
│  │   member or want to collaborate on something  │                         │
│  │   meaningful — I'm open to conversations.     │                         │
│  │                                               │                         │
│  │   Name                                        │                         │
│  │   ┌─────────────────────────────────────┐     │                         │
│  │   │                                     │     │                         │
│  │   └─────────────────────────────────────┘     │                         │
│  │                                               │                         │
│  │   Email *                                     │                         │
│  │   ┌─────────────────────────────────────┐     │                         │
│  │   │                                     │     │                         │
│  │   └─────────────────────────────────────┘     │                         │
│  │                                               │                         │
│  │   Message                                     │                         │
│  │   ┌─────────────────────────────────────┐     │                         │
│  │   │                                     │     │                         │
│  │   │                                     │     │                         │
│  │   └─────────────────────────────────────┘     │                         │
│  │                                               │                         │
│  │   [Send message]                              │                         │
│  │                                               │                         │
│  └───────────────────────────────────────────────┘                         │
│                                                                             │
│  COME SI SENTE: Entusiasta → Decisa                                        │
│  PENSIERO: "Nessun impegno richiesto. Posso spiegare il problema           │
│             e vedere se c'è interesse reciproco."                           │
│                                                                             │
│  AZIONE: Compila e invia. Il messaggio è probabilmente più lungo           │
│          di quello del recruiter — descrive il problema specifico.          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Differenze chiave tra i due journey

| Dimensione | Recruiter (Marco) | Freelance Client (Giulia) |
|------------|-------------------|---------------------------|
| Entry point | LinkedIn link | Referral diretto |
| Ordine di lettura | Hero → About → Projects | Hero → Projects → About |
| Paura primaria | "Non saprà lavorare in team" | "Sparirà o non saprà comunicare" |
| Prova cercata | Eleganza architetturale | Business impact misurabile |
| Case study preferito | VisureHub (architettura) | Azure migration (risparmio) |
| Decisione di contatto | Dopo il case study | Dopo l'About |
| Tipo di messaggio | Breve, proposta colloquio | Lungo, descrizione del problema |

---

## Arco Emotivo Dettagliato

| Step | Emozione | Intensità | Trigger |
|------|----------|-----------|---------|
| 1 — Hero | Diffidente → Interessata | Bassa svolta | "Diverso" non ancora provato |
| 2 — Projects scan | Interessata → Rassicurata | Media crescita | Business impact numerico |
| 3 — Case study | Rassicurata → Impressionata | Alta crescita | Onestà sui limiti, spiegazione semplice |
| 4 — About | Impressionata → Entusiasta | Picco | Valori coerenti con comportamento |
| 5 — Contact | Entusiasta → Decisa | Stabile | Low-friction, nessun impegno |

---

## Nota su Vulnerabilità e Narrativa

```
TENSIONE NARRATIVA DA GESTIRE:

  Profilo percepito:  Junior, laurea non conclusa
  Profilo reale:      Architetture enterprise, metriche concrete

STRATEGIA:
  Non nascondere la vulnerabilità.
  Non difenderla.
  Renderla irrilevante attraverso le prove.

  Il sito non dice mai "non ho la laurea ma...".
  Il sito mostra il lavoro.
  Chi ha bisogno del titolo non è il target giusto.
  Chi ha bisogno del lavoro troverà tutto quello che cerca.
```
