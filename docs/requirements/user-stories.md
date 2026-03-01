# User Stories — Personal Portfolio CV Site
# Christian Borrello
# Wave: DISCUSS — 2026-03-01

---

## US-00: Walking Skeleton — Architettura End-to-End Deployata

### Problema (The Pain)
Christian Borrello è un Software Engineer che sta costruendo il suo portfolio personale da zero. Non ha ancora nessuna architettura deployata. Se inizia a costruire le sezioni del sito senza verificare che il flusso end-to-end funzioni, rischia di scoprire problemi di integrazione infrastrutturale solo alla fine — quando cambiarli è costoso.

### Who (The User)
- Christian in veste di sviluppatore del proprio sito
- Primo contributo al progetto da zero (greenfield)
- Obiettivo: avere una prova che tutto il flusso funziona prima di costruire il contenuto reale

### Solution (What We Build)
Un progetto Next.js scaffoldato, connesso a Git, deployato su Vercel con dominio .dev, con una pagina placeholder visibile e un form di contatto minimo wired a un servizio esterno. La submission del form viene ricevuta da Christian.

### Domain Examples

**Example 1: Happy Path — Deploy automatico funzionante**
Christian crea il progetto Next.js in locale. Fa push su GitHub. Vercel rileva il push e deploya automaticamente. L'URL `christianborrello.dev` mostra la pagina placeholder. Il deployment richiede meno di 2 minuti.

**Example 2: Form di contatto wired**
Marco Ferretti, in fase di test pre-lancio, va sull'URL di staging e compila il form con la sua email. Clicca "Send message". Il messaggio arriva a Christian via Formspree. Marco vede la success state.

**Example 3: i18n structure verificata**
Un developer (o Christian stesso) apre il codebase e cerca testo hardcoded nei componenti. Non trova nulla — tutte le stringhe sono in `/locales/en/`. Aggiungere `/locales/it/` non richiederebbe nessun cambio ai componenti React.

### UAT Scenarios (BDD)

```gherkin
Scenario: Deploy automatico da Git push
  Given il progetto Next.js è connesso a GitHub
  And Vercel è configurato per deployare da main branch
  When Christian fa push di un commit
  Then Vercel deploya automaticamente il sito
  And il sito è raggiungibile all'URL di produzione entro 2 minuti

Scenario: Pagina placeholder visibile in produzione
  Given il walking skeleton è deployato
  When qualsiasi visitatore raggiunge l'URL di produzione
  Then vede una pagina placeholder senza errori di build
  And il server risponde con status 200

Scenario: Form di contatto funzionante end-to-end
  Given il form è wired a Formspree o Resend
  When un visitatore inserisce un'email valida e clicca "Send message"
  Then Christian riceve una notifica con il contenuto del form
  And il visitatore vede la success state

Scenario: Struttura i18n verificabile
  Given il progetto è scaffoldato
  When un developer ispeziona i componenti React
  Then nessun testo user-facing è hardcoded nei componenti
  And tutte le stringhe sono in file di locale sotto /locales/en/
```

### Acceptance Criteria
- [ ] URL di produzione raggiungibile con status 200
- [ ] Push su main branch trigghera deployment Vercel entro 2 minuti
- [ ] Form submission raggiunge Christian via servizio esterno
- [ ] Nessuna stringa hardcoded nei componenti React
- [ ] Dominio .dev risolve all'URL Vercel

### Technical Notes
- Stack: Next.js (SSG), Tailwind CSS, Vercel, Formspree (o Resend)
- i18n: next-intl o next-i18next — struttura pronta, EN only
- Il dominio .dev richiede acquisto prima del go-live (Cloudflare Registrar consigliato)
- Iniziare il walking skeleton con il subdomain Vercel gratuito per non bloccarsi sul dominio

**Dimensione stimata**: 1-2 giorni
**Tipo**: Walking Skeleton (Feature 0)

---

## US-01: Hero — Identità Professionale in 30 Secondi

### Problema (The Pain)
Marco Ferretti, Technical Recruiter, valuta 15-20 profili a settimana. Ogni portfolio dice "passionate developer with X years of experience". Nei primi 5 secondi, nulla lo ferma. Christian Borrello ha un differenziatore reale — pensiero sistemico, qualità come valore, lavora per costruire qualcosa di cui essere fiero — ma questo non è visibile da nessun canale esistente.

### Who (The User)
- Marco Ferretti, Technical Recruiter, cerca Senior Software Engineer full-remote
- Giulia Marchetti, founder early-stage, cerca engineer senior per progetto complesso
- Entrambi vedono la hero section come primo impatto — è l'unica sezione che leggono tutti

### Solution (What We Build)
Una hero section che rompe il pattern dei portfolio generici con una frase identitaria autentica, una supporting line che nomina il differenziatore, e due CTA chiare. Nessuna lista di tecnologie. Tono diretto e onesto.

### Domain Examples

**Example 1: Marco arriva da LinkedIn**
Marco clicca il link nel profilo LinkedIn di Christian. Atterra sulla homepage. Legge "I don't work for duty or money. I work to build something I'm proud of." Poi "I see architectures where others see tasks." Si ferma. Dice tra sé "questo è diverso dagli altri". Scorre verso il basso.

**Example 2: Giulia arriva da referral**
Un contatto comune ha mandato il link a Giulia. Lei atterra sulla homepage con aspettative scettiche — ha già avuto esperienze negative con freelance. Legge la frase identitaria. Non è marketing — è una dichiarazione di posizione. La tono è coerente con qualcuno che ha qualcosa da dimostrare. Continua a leggere.

**Example 3: Visitatore bounces immediatamente (caso negativo gestito)**
Un HR generalista cerca qualcuno con una certificazione specifica e un template di CV standard. Legge la hero. Il tono è troppo idiosincratico per quello che cerca. Esce. Questo è il comportamento corretto — il sito fa selezione naturale dei visitatori. Chi non è il target giusto non deve essere convertito.

### UAT Scenarios (BDD)

```gherkin
Scenario: Marco si ferma nella hero
  Given Marco Ferretti atterra sulla homepage dopo 15 profili generici
  When legge la hero section
  Then vede una frase primaria che non usa "passionate", "results-driven" o simili
  And vede una supporting line che nomina il differenziatore sistemico
  And non vede una lista di tecnologie nella hero
  And vede una CTA per vedere il lavoro e una per il contatto

Scenario: Tono della hero coerente con il resto del sito
  Given qualsiasi visitatore ha letto la hero e poi l'About
  When confronta il tono delle due sezioni
  Then il tono è coerente — diretto, onesto, non commerciale
  And non trova frasi di marketing language in nessuna delle due sezioni

Scenario: Hero è localizzabile senza refactoring
  Given il progetto è in produzione
  When un developer aggiunge /locales/it/hero.json
  Then la hero è disponibile in italiano senza modificare i componenti React
```

### Acceptance Criteria
- [ ] Frase identitaria primaria presente e non generica
- [ ] Supporting line nomina il differenziatore sistemico
- [ ] Nessuna lista di tecnologie nella hero
- [ ] Due CTA visibili: "View my work" e "Get in touch"
- [ ] Nessun testo hardcoded — tutto via chiavi i18n
- [ ] Tono coerente con About e Contact

### Technical Notes
- Nessuna tecnologia prescritta — il DESIGN wave decide l'implementazione
- Il contenuto esatto della frase identitaria è validato con Christian prima del lancio

**Dimensione stimata**: 1 giorno
**Tipo**: User Story

---

## US-02: About — Layer Umano e Professionale

### Problema (The Pain)
Marco Ferretti ha visto la hero ed è incuriosito. Ma non sa ancora se Christian è il tipo di persona che si integra nel suo team. Giulia Marchetti ha già visto i progetti e vuole capire se Christian scomparirà a metà progetto. Entrambi hanno bisogno di capire chi è Christian come persona e professionista — non un secondo CV, ma un profilo umano autentico.

### Who (The User)
- Marco Ferretti: cerca fit culturale — vuole ownership, non esecuzione
- Giulia Marchetti: cerca affidabilità e comunicazione onesta
- Entrambi leggono l'About con lenti diverse ma trovano risposte diverse nello stesso contenuto

### Solution (What We Build)
Una sezione About che racconta l'identità professionale e umana di Christian in modo autentico: pensiero sistemico, ADHD come pattern funzionale, filosofia come disciplina del pensiero, valori non negoziabili, cosa cerca in un team o collaborazione.

### Domain Examples

**Example 1: Marco legge l'About e capisce il fit culturale**
Marco legge "I choose technologies based on the problem, not based on what I know or feel comfortable with." Riconosce il tipo di ingegnere che cerca — non qualcuno che impone il proprio stack preferito, ma qualcuno che ragiona per problema. Continua verso Projects.

**Example 2: Giulia legge l'About e la sua paura diminuisce**
Giulia legge che Christian ha valori non negoziabili e che non è disposto a lavorare per chiunque a qualsiasi cifra. Interpreta questo come: non scomparirà per un cliente che paga di più. Ha rispetto per il proprio lavoro. È quello che cerca.

**Example 3: Un visitatore capisce l'ADHD framing senza fraintenderlo**
Un recruiter legge la sezione ADHD. Non è un disclaimer né una scusa — è una descrizione di come funziona il pensiero di Christian: curiosità radicale, iperfocus su problemi stimolanti, visione sistemica. Il recruiter lo legge come un punto di forza contestualizzato.

### UAT Scenarios (BDD)

```gherkin
Scenario: Marco capisce il fit culturale dall'About
  Given Marco ha letto la hero e arriva all'About
  When legge la sezione completa
  Then legge che Christian cerca team remote-first e ownership-driven
  And legge che ADHD è descritto come pattern funzionale, non limitazione
  And legge la frase sulla technology philosophy
  And non legge una lista di competenze tecniche o certificazioni

Scenario: Giulia legge l'About e la sua paura primaria è affrontata
  Given Giulia ha già letto i Projects e arriva all'About
  When legge la sezione
  Then legge contenuto che implica affidabilità e continuità
  And legge che Christian ha valori non negoziabili
  And legge che sceglie le tecnologie per il problema, non per comodità
  And interpreta questo come: non sparirà per un'offerta migliore

Scenario: Il layer filosofico è presente senza essere dominante
  Given qualsiasi visitatore legge l'About
  When finisce di leggere
  Then capisce che Christian legge filosofia come disciplina del pensiero
  And capisce il punto di vista su coraggio vs fortuna
  And la sezione non si legge come un saggio filosofico — è un paragrafo, non un capitolo
```

### Acceptance Criteria
- [ ] Presente: ADHD framing come pattern funzionale
- [ ] Presente: Technology philosophy (frase quasi letterale dalla discovery)
- [ ] Presente: Valori non negoziabili (umanità, onestà, rispetto reciproco)
- [ ] Presente: Layer filosofico (filosofia come disciplina del pensiero)
- [ ] Presente: Cosa cerca in un team/collaborazione
- [ ] Assente: Lista di competenze tecniche
- [ ] Assente: Menzione esplicita di "non ho la laurea"
- [ ] Tono coerente con SA-07

### Technical Notes
- Contenuto da scrivere con Christian in DESIGN wave — il template è definito, il testo è da produrre
- La sezione deve essere leggibile in 90 secondi circa

**Dimensione stimata**: 1 giorno (implementazione) + tempo separato per scrittura contenuto
**Tipo**: User Story

---

## US-03: Projects — Case Study che Dimostrano il Pensiero

### Problema (The Pain)
Marco Ferretti è arrivato alla sezione Projects. Ha visto la hero e l'about — ora vuole le prove. La maggior parte dei portfolio mostra una lista di tecnologie e uno screenshot. Non c'è nessuna traccia del ragionamento, dei criteri, dei limiti, dell'iniziativa. Marco non sa se Christian sa davvero quello che fa o se ha semplicemente seguito un tutorial.

### Who (The User)
- Marco Ferretti: vuole vedere ragionamento esplicito, criteri di scelta, limiti onesti, agency
- Giulia Marchetti: vuole vedere business impact misurabile e onestà sulle difficoltà
- Entrambi devono trovare prove concrete delle promesse fatte in Hero e About

### Solution (What We Build)
Cinque case study strutturati con il template a 8 sezioni: problema in linguaggio accessibile, ragionamento esplicito, decisioni con criteri, agency, limiti onesti, lettura multi-livello, accessibilità per non-specialisti, stack come appendice.

### Domain Examples

**Example 1: Marco legge SagitterHub e si convince**
Marco apre il case study SagitterHub. Legge la sezione dedicata al modulo VisureHub e "The decisions": Christian spiega perché ha scelto Hexagonal Architecture invece di MVC — non perché "è meglio", ma perché il dominio era abbastanza complesso da giustificare la separazione delle responsabilità. Legge i trade-off accettati. Legge cosa non ha funzionato. Dice: "Questo sa ragionare. Voglio parlargli."

**Example 2: Giulia legge Azure migration e la sua paura si riduce**
Giulia apre il case study Azure. Legge il problema in linguaggio accessibile: l'azienda pagava €380/mese per risorse dimenticate e non documentate. Legge il risultato: €100-160/mese. Legge "What I would do differently" — Christian ammette che avrebbe documentato meglio le dipendenze prima di iniziare. Pensa: "Sa dove ha sbagliato. È onesto. Mi fido."

**Example 3: Un non-specialista capisce OpenGL Renderer**
La fidanzata di Marco (non tecnica) guarda il portfolio per dargli un feedback. Apre OpenGL Renderer. Legge "For non-specialists": "Solitamente i programmi che disegnano cose sullo schermo usano librerie che fanno tutto il lavoro per te. Io volevo capire come funziona davvero quello strato sotto — come i pixel vengono calcolati e disegnati. È come smontare un orologio per capire come segna il tempo." Capisce. È impressionata dall'approccio.

### UAT Scenarios (BDD)

```gherkin
Scenario: Marco legge SagitterHub e trova ragionamento esplicito
  Given Marco clicca sul case study SagitterHub
  When legge il case study completo
  Then legge il problema di business in linguaggio non tecnico
  And legge perché è stata scelta Hexagonal Architecture e non MVC
  And legge i criteri che hanno guidato la scelta di DDD e CQRS
  And legge cosa Christian ha fatto oltre l'assignment
  And legge almeno una cosa che Christian rifarebbe diversamente
  And legge una sezione che connette il progetto a un'idea più grande

Scenario: Giulia legge Azure migration e il business impact è chiaro
  Given Giulia clicca sul case study Azure Infrastructure
  When legge il case study
  Then legge il costo iniziale (€380/mese) e quello finale (€100-160/mese) in linguaggio accessibile
  And legge la motivazione dietro Terraform IaC come decisione per il futuro
  And legge almeno una cosa onesta sulle difficoltà incontrate
  And non legge gergo cloud senza spiegazione

Scenario: I progetti personali sono framing come esplorazione attiva
  Given qualsiasi visitatore guarda i progetti personali (OpenGL, iOS, Unity)
  When legge le card e i case study
  Then nessun progetto è presentato come "incompleto" o con linguaggio apologetico
  And ogni progetto ha un framing che spiega cosa stava esplorando e perché
  And la curiosità è il motore narrativo visibile

Scenario: La sezione projects overview mostra metriche, non tech lists
  Given qualsiasi visitatore arriva alla griglia dei progetti
  When scansiona le card
  Then ogni card ha un hook concreto (metrica o framing curioso)
  And nessuna card è solo una lista di tecnologie senza contesto
```

### Acceptance Criteria
- [ ] 5 progetti presenti con card nella overview
- [ ] SagitterHub case study: tutte e 8 le sezioni del template presenti (con focus sul modulo VisureHub)
- [ ] Azure migration case study: tutte e 8 le sezioni del template presenti
- [ ] Progetti personali: framing come esplorazione attiva, nessun linguaggio apologetico
- [ ] Ogni card ha un hook (metrica o framing) — nessuna tech list senza contesto
- [ ] Sezione "What didn't work" presente in ogni case study lavorativo
- [ ] Sezione "For non-specialists" presente in ogni case study

### Technical Notes
- Il contenuto dei case study è il bottleneck principale — richiede tempo di scrittura da Christian
- Il template di DESIGN wave deve supportare anchor navigation interna ai case study lunghi
- I valori numerici (€280, TDD >90%) devono essere verificati con Christian prima della pubblicazione

**Dimensione stimata**: 2-3 giorni (implementazione template + 5 case study)
**Tipo**: User Story — potenzialmente splitta in US-03a (template + P-01 SagitterHub) e US-03b (P-02 + personali)

---

## US-04: Contact — Form Essenziale Low-Friction

### Problema (The Pain)
Marco Ferretti ha letto tutto il sito. È convinto. Vuole scrivere. Ma se il form chiede 8 campi, o ha un tono formale che implica un impegno, o non dà conferma dopo l'invio — esita. Il momento del contatto è il punto più fragile del journey: il visitatore è convinto ma può ancora rimbalzare per un attrito minimo.

### Who (The User)
- Marco Ferretti: vuole inviare un messaggio breve per proporre un colloquio
- Giulia Marchetti: vuole descrivere il suo problema e vedere se c'è interesse
- Entrambi devono sentirsi accolti, non valutati

### Solution (What We Build)
Un form con tre campi (nome opzionale, email obbligatoria, messaggio opzionale), headline conversazionale, subtext che esplicita apertura sia a posizioni da dipendente che a collaborazioni freelance, CTA "Send message", success state in plain language.

### Domain Examples

**Example 1: Marco invia un messaggio breve**
Marco, dopo aver letto il case study SagitterHub, va al form. Inserisce solo la sua email aziendale e un messaggio di 3 righe con il ruolo aperto. Clicca "Send message". Vede "Message sent. I'll get back to you within a few days." Non c'è nessuna promessa esagerata. È soddisfatto.

**Example 2: Giulia invia una descrizione del suo problema**
Giulia non conosce Christian. Vuole descrivere il suo progetto prima di impegnarsi a una call. Inserisce nome, email e un messaggio di 10 righe. Clicca "Send message". Il messaggio arriva a Christian completo. Lei vede la stessa success state di Marco.

**Example 3: Errore — email mancante**
Un visitatore compila nome e messaggio ma dimentica l'email. Clicca "Send message". Il form evidenzia il campo email con un messaggio in plain language. Il testo del messaggio che aveva scritto non viene cancellato — deve reinserire solo l'email.

### UAT Scenarios (BDD)

```gherkin
Scenario: Marco invia un messaggio con solo l'email
  Given Marco è arrivato al form di contatto
  When inserisce solo la sua email e clicca "Send message"
  Then la submission viene accettata
  And Marco vede il success state in plain language
  And Christian riceve il messaggio

Scenario: Giulia invia un messaggio completo
  Given Giulia ha compilato nome, email e un lungo messaggio
  When clicca "Send message"
  Then la submission viene accettata
  And Giulia vede il success state
  And Christian riceve nome, email e messaggio completo

Scenario: Email mancante mostra errore senza perdere il messaggio
  Given un visitatore ha scritto un messaggio ma non ha inserito l'email
  When clicca "Send message"
  Then il campo email viene evidenziato
  And viene mostrato un messaggio di errore in plain language
  And il testo del messaggio scritto non viene cancellato

Scenario: Il subtext esplicita apertura a entrambi i percorsi
  Given qualsiasi visitatore arriva al form
  When legge headline e subtext
  Then capisce che può scrivere sia per una posizione da dipendente
  And capisce che può scrivere per una collaborazione freelance
  And non si sente in imbarazzo per nessuno dei due motivi
```

### Acceptance Criteria
- [ ] Form con 3 campi: nome (opzionale), email (obbligatorio), messaggio (opzionale)
- [ ] Success state: "Message sent. I'll get back to you within a few days."
- [ ] Error state: campo email evidenziato, testo messaggio preservato
- [ ] Headline: "Let's talk" o equivalente conversazionale
- [ ] Subtext: apertura esplicita a entrambi i percorsi (employment e freelance)
- [ ] Christian riceve la submission via servizio esterno
- [ ] Nessun campo aggiuntivo, nessun CAPTCHA in v1

### Technical Notes
- Dipendenza: Formspree free tier (50 submissions/mese) o Resend
- La scelta tra Formspree e Resend va fatta nel Walking Skeleton (US-00)
- Nessun backend proprietario richiesto

**Dimensione stimata**: 1 giorno
**Tipo**: User Story
