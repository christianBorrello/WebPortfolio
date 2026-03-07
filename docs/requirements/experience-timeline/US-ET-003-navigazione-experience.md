# US-ET-003: La navigazione del sito riflette la nuova sezione Experience

## Problema (Il Dolore)

Laura Chen ha letto il case study di SagitterHub dalla timeline e vuole
tornare alla sezione Experience per esplorare un progetto personale.
Clicca "Back to projects" nella navigazione e atterra in cima alla homepage.
Deve ri-scrollare fino alla sezione che ora si chiama Experience ma il link
diceva ancora "Projects". La disconnessione tra il nome nella navigazione
e la sezione sulla pagina crea confusione. Laura perde 10 secondi e un po'
di fiducia nella coerenza del sito.

## Chi (L'Utente)

- Qualsiasi visitatore che usa la navigazione per spostarsi tra le sezioni
- L'hiring manager che fa avanti-e-indietro tra timeline e case study (2-3 volte per sessione)
- Il recruiter che clicca "View my work" nel hero per saltare alla sezione rilevante

## Soluzione (Cosa Costruiamo)

Aggiornamento di tutti i riferimenti di navigazione: la voce di menu
cambia da "Projects" a "Experience", l'ancora cambia da `#projects`
a `#experience`, il link di ritorno dal case study cambia da
"Back to projects" a "Back to experience" e punta a `/#experience`
(non alla cima della pagina). Il CTA "View my work" nel hero punta
a `#experience`.

## Esempi di Dominio

### Esempio 1: Marco clicca "Experience" nella navigazione

Marco Ferretti e' sul portfolio in inglese. Nella barra di navigazione
vede tre voci: "About", "Experience", "Contact". Clicca "Experience".
La pagina scrolla dolcemente fino alla sezione con id="experience"
dove inizia la timeline. Marco non vede piu' la voce "Projects".

### Esempio 2: Laura torna dal case study alla sezione Experience

Laura Chen sta leggendo il case study di SagitterHub. Nella navigazione
vede il link "Back to experience" con una freccia. Clicca il link.
La pagina la porta alla homepage, posizionata all'inizio della sezione
Experience. Non atterra in cima alla pagina. Laura vede la timeline
e puo' continuare la sua esplorazione.

### Esempio 3: Navigazione in italiano

Marco visita il portfolio in italiano. La navigazione mostra
"Chi sono", "Esperienze", "Contatti". Dalla pagina case study,
il link di ritorno dice "Torna alle esperienze". Tutto e' coerente
nella lingua selezionata.

## Scenari UAT (BDD)

### Scenario: La voce di navigazione mostra "Experience" in inglese
Given il visitatore e' sulla homepage in inglese
When guarda la barra di navigazione
Then vede la voce "Experience" al posto di "Projects"
And la voce "Projects" non e' piu' presente

### Scenario: La voce di navigazione mostra "Esperienze" in italiano
Given il visitatore e' sulla homepage in italiano
When guarda la barra di navigazione
Then vede la voce "Esperienze" al posto di "Progetti"

### Scenario: Click su "Experience" scrolla alla sezione corretta
Given il visitatore e' in cima alla homepage
When clicca "Experience" nella navigazione
Then la pagina scrolla alla sezione con id="experience"
And la sezione Experience e' visibile nel viewport

### Scenario: Il link di ritorno dal case study porta alla sezione Experience
Given il visitatore e' sulla pagina case study di "SagitterHub"
And la navigazione mostra "Back to experience"
When clicca "Back to experience"
Then atterra sulla homepage alla sezione Experience
And non atterra in cima alla homepage

### Scenario: Il link di ritorno in italiano dice "Torna alle esperienze"
Given il visitatore e' sulla pagina case study in italiano
Then la navigazione mostra "Torna alle esperienze"
When clicca il link
Then atterra sulla homepage alla sezione Esperienze

### Scenario: Il CTA "View my work" punta alla sezione Experience
Given il visitatore e' sulla homepage nella sezione Hero
When clicca "View my work"
Then la pagina scrolla alla sezione Experience con id="experience"

### Scenario: La navigazione mobile mostra "Experience"
Given il visitatore e' sulla homepage da dispositivo mobile (larghezza < 768px)
When apre il menu hamburger
Then vede la voce "Experience" nel menu
And cliccando "Experience" il menu si chiude e la pagina scrolla alla sezione

## Criteri di Accettazione

- [ ] La navigazione mostra "Experience" (EN) / "Esperienze" (IT) al posto di "Projects" / "Progetti"
- [ ] Click su "Experience" nel nav scrolla alla sezione `#experience`
- [ ] Il link di ritorno dal case study dice "Back to experience" (EN) / "Torna alle esperienze" (IT)
- [ ] Il link di ritorno porta a `/{locale}/#experience`, non alla cima della homepage
- [ ] Il CTA "View my work" nel hero punta a `#experience`
- [ ] La navigazione mobile mostra "Experience" nel menu hamburger
- [ ] Il menu mobile si chiude dopo il click su "Experience"

## Note Tecniche

- Modifica: `src/shared/ui/navigation.tsx` -- NAV_LINKS array (key e href)
- Modifica: `src/shared/ui/navigation.tsx` -- back link href e regex isCaseStudyPage
- Modifica: `messages/en/common.json` -- chiavi nav.projects -> nav.experience, nav.back_to_projects -> nav.back_to_experience
- Modifica: `messages/it/common.json` -- stesse chiavi
- Verifica: `messages/en/hero.json` / `messages/it/hero.json` -- se il CTA "View my work" ha un href hardcoded
- Dipendenza: US-ET-001 (la sezione Experience deve esistere con id="experience")
