# US-ET-001: Il visitatore vede una timeline unificata delle esperienze sulla homepage

## Problema (Il Dolore)

Marco Ferretti e' un recruiter tecnico che valuta 15-20 profili a settimana.
Quando atterra sul portfolio di Christian, trova una griglia di card di
progetto senza contesto temporale. Non vede il ruolo attuale, l'azienda,
la durata dell'esperienza ne' la traiettoria professionale. Deve cliccare
in ogni card per ricostruire mentalmente chi e' questa persona. Dopo
30 secondi senza un quadro d'insieme, passa al prossimo candidato.

## Chi (L'Utente)

- Recruiter tecnico che scansiona rapidamente profili (20-30 secondi sulla sezione)
- Hiring manager che legge in profondita' cercando traiettoria e crescita (2-3 minuti sulla sezione)
- Entrambi arrivano dalla homepage, scrollano attraverso Hero e About prima di raggiungere la sezione

## Soluzione (Cosa Costruiamo)

Una sezione "Experience" sulla homepage che sostituisce la griglia Projects.
La sezione mostra una timeline verticale in ordine cronologico inverso
con tre tipi di entry (work, education, project), ciascuno differenziato
visivamente. Le entry work contengono card dei progetti collegati come
contenuto annidato. Le entry project linkano direttamente al case study.

## Esempi di Dominio

### Esempio 1: Marco scansiona la timeline e classifica il candidato

Marco Ferretti atterra sulla homepage di Christian da un link LinkedIn.
Scrolla oltre Hero e About e vede la sezione "Experience". La prima entry
mostra: "Senior Software Engineer" presso "Sagitter S.p.A.", "2022 - Present",
con tag .NET, React, Azure, DDD, CQRS. Sotto l'entry ci sono due card:
SagitterHub (TDD >90%) e Azure Infrastructure (46 risorse, -60% costi).
Marco scrolla e vede altri 3 progetti personali (Unity, iOS, OpenGL) e
la formazione (Laurea in Informatica). In 25 secondi ha classificato
Christian come mid-senior con stack enterprise .NET/Azure, curiosita'
orizzontale (C++, Swift, Unity), e formazione in informatica. Non ha
cliccato nessun link.

### Esempio 2: Laura naviga dalla timeline al case study e ritorna

Laura Chen e' una engineering manager che ha ricevuto il link dal recruiter.
Legge la timeline con attenzione, costruendo la narrativa di crescita.
Clicca "Read case study" sulla card SagitterHub per verificare la
profondita' di pensiero architetturale. Dopo aver letto il case study,
clicca "Back to experience" e torna alla sezione Experience della homepage
per esplorare il progetto Unity Soulslike Game. Legge il case study del
progetto personale e conferma la coerenza tra lavoro e passione.

### Esempio 3: Timeline con una sola entry work (scenario minimo)

Christian ha appena lanciato il portfolio con una sola esperienza lavorativa
e la formazione. La timeline mostra due entry: "Senior Software Engineer"
at Sagitter (con 2 project card) e "Laurea in Informatica". La sezione
e' comunque leggibile e la struttura timeline e' chiara anche con poche
entry. L'aggiunta di nuove entry in futuro non richiede modifiche strutturali.

## Scenari UAT (BDD)

### Scenario: La sezione Experience sostituisce Projects sulla homepage
Given il visitatore carica la homepage
When la pagina e' completamente renderizzata
Then la sezione "Experience" e' visibile con id "experience"
And la sezione "Projects" con la griglia di card non e' piu' presente
And la sezione Experience si trova tra About e Contact

### Scenario: Le entry sono ordinate in ordine cronologico inverso
Given la sezione Experience e' caricata con tutte le entry
When il visitatore guarda la timeline
Then la prima entry e' la posizione lavorativa corrente (la piu' recente)
And l'ultima entry e' il record formativo piu' antico
And tutti i tipi di entry (work, education, project) sono mescolati cronologicamente

### Scenario: Un'entry work mostra tutti i campi richiesti
Given la sezione Experience contiene un'entry work "Senior Software Engineer"
Then l'entry mostra il titolo del ruolo "Senior Software Engineer"
And l'entry mostra l'organizzazione "Sagitter S.p.A."
And l'entry mostra il periodo "2022 - Present"
And l'entry mostra una descrizione di una riga
And l'entry mostra i tag tecnologici
And l'entry mostra le project card annidate per i case study collegati

### Scenario: Un'entry education mostra i campi richiesti senza link
Given la sezione Experience contiene un'entry education
Then l'entry mostra il titolo del diploma/laurea
And l'entry mostra il nome dell'istituzione
And l'entry mostra il periodo
And l'entry non mostra project card ne' link a case study

### Scenario: Un'entry project mostra il link al case study
Given la sezione Experience contiene un'entry project "Unity Soulslike Game"
Then l'entry mostra il titolo del progetto
And l'entry mostra il periodo "2023"
And l'entry mostra una descrizione che spiega la motivazione
And l'entry mostra i tag tecnologici
And l'entry mostra un link "Read case study" che porta alla pagina del case study

### Scenario: I tre tipi di entry sono distinguibili visivamente
Given il visitatore sta scrollando la timeline
When guarda le entry
Then le entry work hanno un indicatore visivo e un badge "Work" distinti
And le entry education hanno un indicatore visivo e un badge "Education" distinti
And le entry project hanno un indicatore visivo e un badge "Project" distinti
And il tipo di ogni entry e' identificabile senza leggere il contenuto

### Scenario: Le project card sono visivamente subordinate alla work entry
Given il visitatore guarda l'entry work "Senior Software Engineer"
When le project card "SagitterHub" e "Azure Infrastructure" sono visibili
Then le card sono indentate rispetto all'entry work
And le card hanno un aspetto visivo che le distingue dall'entry (bordo, sfondo)
And le card sono chiaramente percepite come contenuto annidato, non come entry separate

## Criteri di Accettazione

- [ ] La sezione Experience e' presente sulla homepage tra About e Contact con id="experience"
- [ ] La griglia Projects non e' piu' presente sulla homepage
- [ ] Le entry sono ordinate in ordine cronologico inverso
- [ ] Le entry work mostrano: titolo ruolo, organizzazione, periodo, descrizione, tag, project card
- [ ] Le entry education mostrano: titolo, istituzione, periodo, descrizione (no link)
- [ ] Le entry project mostrano: titolo, periodo, descrizione motivazionale, tag, link case study
- [ ] I tre tipi di entry sono distinguibili visivamente tramite indicatore e badge
- [ ] Le project card dentro le work entry sono visivamente subordinate (annidate)
- [ ] I link "Read case study" portano alla pagina corretta del case study

## Note Tecniche

- Dipendenza: i dati vengono da `content/experience/{locale}.yaml` (nuovo file da creare)
- Dipendenza: le project card riusano il componente `ProjectCard` esistente
- Dipendenza: le project summary sono caricate tramite `content-loader.ts` esistente
- Vincolo: il componente timeline e' un client component (per le animazioni), ma i dati sono caricati nel server component `page.tsx` e passati come props
- Vincolo: la sezione deve funzionare anche con un numero minimo di entry (1 work + 1 education)
