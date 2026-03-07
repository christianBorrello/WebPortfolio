# US-ET-006: La timeline e' accessibile per screen reader, tastiera e utenti con sensibilita' al movimento

## Problema (Il Dolore)

Un visitatore che naviga con screen reader atterra sulla homepage e
scrolla fino alla sezione Experience. Sente annunciare "Experience"
come heading, ma le entry della timeline non sono strutturate come lista.
Lo screen reader legge un flusso di testo non organizzato: titoli, date
e descrizioni si mescolano senza contesto. Il visitatore non capisce
dove finisce un'entry e dove inizia la successiva. Le project card
annidate nelle work entry non sono annunciate come contenuto subordinato.

Un altro visitatore naviga solo con tastiera. I link "Read case study"
non hanno indicatori di focus visibili. Il tab order salta tra le entry
in modo imprevedibile.

## Chi (L'Utente)

- Visitatori che usano screen reader (VoiceOver, NVDA, JAWS)
- Visitatori che navigano solo con tastiera
- Visitatori con sensibilita' al movimento (prefers-reduced-motion)
- Visitatori con deficit visivi che dipendono dal contrasto dei colori

## Soluzione (Cosa Costruiamo)

La timeline e' strutturata semanticamente come lista ordinata. Ogni entry
ha un ruolo chiaro con tipo, titolo, organizzazione e periodo annunciati.
Le project card sono annidate come sotto-lista. Il tab order segue l'ordine
cronologico. Gli indicatori di focus sono chiaramente visibili. Le animazioni
rispettano `prefers-reduced-motion`. I badge di tipo hanno contrasto
sufficiente.

## Esempi di Dominio

### Esempio 1: Screen reader annuncia la struttura della timeline

Anna Rossi usa VoiceOver su macOS. Naviga la sezione Experience e sente:
"Experience, heading level 2". Poi: "List, 6 items". Primo item:
"Work. Senior Software Engineer, Sagitter S.p.A., 2022 to Present."
Poi: "List, 2 items" (le project card). "SagitterHub, Enterprise platform
built right. TDD greater than 90%. Link, Read case study." Anna capisce
la struttura gerarchica senza vederla.

### Esempio 2: Navigazione con tastiera

Paolo Bianchi naviga con tastiera. Preme Tab dalla sezione About e il
focus si sposta al primo elemento interattivo nella sezione Experience:
il link "Read case study" della prima project card (SagitterHub). L'anello
di focus e' chiaramente visibile (bordo blu su sfondo chiaro). Preme Tab
e il focus si sposta alla seconda project card (Azure Infrastructure).
Continua a premere Tab e il focus raggiunge il link "Read case study"
dell'entry project Unity Soulslike Game. L'ordine segue la cronologia.

### Esempio 3: Utente con prefers-reduced-motion

Anna Rossi ha abilitato "Reduce motion" nel suo sistema operativo. Carica
la homepage. Quando scrolla fino alla sezione Experience, tutte le entry
sono immediatamente visibili. Nessun fade-in, nessun translate. La
timeline e' pienamente leggibile senza alcuna animazione.

## Scenari UAT (BDD)

### Scenario: Screen reader annuncia la sezione e la struttura
Given l'utente naviga con screen reader
When raggiunge la sezione Experience
Then l'heading "Experience" e' annunciato come heading di livello 2
And la timeline e' annunciata come lista ordinata
And il numero di entry e' annunciato

### Scenario: Screen reader annuncia ogni entry con tipo e dettagli
Given l'utente naviga con screen reader
When raggiunge una entry work
Then lo screen reader annuncia il tipo "Work"
And annuncia il titolo del ruolo "Senior Software Engineer"
And annuncia l'organizzazione "Sagitter S.p.A."
And annuncia il periodo "2022 to Present"

### Scenario: Screen reader annuncia le project card come contenuto annidato
Given l'utente naviga con screen reader
When raggiunge le project card dentro una work entry
Then le card sono annunciate come sotto-lista
And ogni card annuncia titolo e descrizione
And il link "Read case study" e' chiaramente annunciato come link

### Scenario: Navigazione con tastiera segue l'ordine cronologico
Given l'utente naviga con tastiera
When preme Tab attraverso la sezione Experience
Then il focus si sposta attraverso i link nell'ordine cronologico delle entry
And ogni link ha un indicatore di focus chiaramente visibile
And il focus non salta a elementi fuori dall'ordine cronologico

### Scenario: I badge di tipo hanno contrasto sufficiente
Given la sezione Experience mostra badge per "Work", "Education", "Project"
Then ogni badge ha un rapporto di contrasto di almeno 4.5:1 per il testo
And i badge sono distinguibili anche in scala di grigi

## Criteri di Accettazione

- [ ] La timeline usa un elemento `<ol>` (lista ordinata) come struttura semantica
- [ ] Ogni entry ha attributi aria appropriati che comunicano tipo, titolo, org e periodo
- [ ] Le project card annidate sono in una sotto-lista dentro l'entry work
- [ ] Il tab order segue l'ordine cronologico delle entry
- [ ] Gli indicatori di focus sono chiaramente visibili su tutti gli elementi interattivi
- [ ] Con `prefers-reduced-motion` attivo, nessuna animazione viene applicata
- [ ] I badge di tipo hanno rapporto di contrasto >= 4.5:1
- [ ] La sezione ha un heading di livello 2 accessibile

## Note Tecniche

- Struttura HTML: `<section>` con `<h2>`, contiene `<ol>` con `<li>` per ogni entry
- Le project card dentro le work entry sono in un `<ul>` annidato nel `<li>` dell'entry
- Focus styling: Tailwind `focus-visible:` classes per indicatori di focus
- prefers-reduced-motion: media query CSS che disabilita transitions e animations
- Contrasto: verificare i colori dei badge contro WCAG 2.1 AA (4.5:1 per testo normale)
- Dipendenza: US-ET-001 (struttura della timeline), US-ET-002 (animazione con reduced motion)
