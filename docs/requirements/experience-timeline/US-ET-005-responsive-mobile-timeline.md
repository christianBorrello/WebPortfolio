# US-ET-005: La timeline e' leggibile e navigabile su dispositivi mobili

## Problema (Il Dolore)

Marco Ferretti sta viaggiando in treno e controlla il portfolio di Christian
dal telefono. La timeline che su desktop mostra chiaramente la linea
verticale con entry alternate diventa illeggibile su uno schermo da 375px.
Le project card annidate nelle work entry debordano, il testo si
sovrappone, e Marco deve fare zoom per leggere. Se il portfolio non
funziona su mobile, Marco lo chiude e passa al prossimo candidato --
perche' il prossimo portfolio funziona.

## Chi (L'Utente)

- Recruiter che controlla profili in mobilita' (treno, pausa pranzo)
- Hiring manager che riceve il link su Slack e lo apre dal telefono per una prima occhiata
- Qualsiasi visitatore su dispositivo con larghezza < 768px

## Soluzione (Cosa Costruiamo)

Layout responsive della timeline che su mobile (< 768px) diventa una
colonna verticale compatta. Le project card dentro le work entry si
impilano verticalmente. Il testo non viene troncato ne' si sovrappone.
Tutti i link e le interazioni restano accessibili senza zoom.

## Esempi di Dominio

### Esempio 1: Marco legge la timeline su iPhone 15 (390px)

Marco apre il portfolio su iPhone 15 in modalita' portrait. La sezione
Experience mostra la timeline come una singola colonna. Ogni entry occupa
la piena larghezza dello schermo (meno il padding). L'entry work
"Senior Software Engineer" mostra titolo, azienda, periodo e tag su righe
separate. Le project card SagitterHub e Azure Infrastructure si impilano
verticalmente sotto l'entry, ciascuna occupando la piena larghezza.
Marco puo' leggere tutto senza scroll orizzontale ne' zoom.

### Esempio 2: Laura su tablet in landscape (1024px)

Laura Chen apre il link su un iPad in landscape. La timeline si mostra
con il layout desktop (la larghezza e' sufficiente). Le project card
si affiancano se c'e' spazio. L'esperienza e' identica al desktop.

### Esempio 3: Schermo molto piccolo (320px, iPhone SE)

Su un iPhone SE da 320px, la timeline resta leggibile. I tag tecnologici
vanno a capo se non c'e' spazio in una riga. Le project card mostrano
titolo e hook su righe separate. Il link "Read case study" e' sempre
raggiungibile senza scroll orizzontale.

## Scenari UAT (BDD)

### Scenario: Timeline leggibile su mobile
Given il visitatore visualizza la homepage su dispositivo mobile (larghezza < 768px)
When la sezione Experience si carica
Then la timeline si mostra come una singola colonna verticale compatta
And il contenuto delle entry non viene troncato ne' si sovrappone
And non c'e' scroll orizzontale

### Scenario: Project card si impilano verticalmente su mobile
Given il visitatore e' su mobile
When guarda un'entry work con project card annidate
Then le project card si impilano verticalmente
And ogni card occupa la piena larghezza disponibile
And i link "Read case study" sono raggiungibili con il tocco

### Scenario: Tag tecnologici vanno a capo su schermi stretti
Given il visitatore e' su un dispositivo con larghezza 320px
When guarda un'entry con molti tag tecnologici
Then i tag vanno a capo sulla riga successiva
And nessun tag viene nascosto o troncato

### Scenario: Target di tocco sufficientemente grandi
Given il visitatore naviga la timeline con il tocco su mobile
When tocca un link "Read case study" o una project card
Then il target di tocco ha almeno 44x44 punti
And non ci sono link o pulsanti troppo vicini che causino tocchi accidentali

### Scenario: Layout tablet mantiene la vista desktop
Given il visitatore visualizza la homepage su tablet in landscape (larghezza >= 768px)
When la sezione Experience si carica
Then la timeline usa il layout desktop con spazio adeguato
And le project card possono affiancarsi se lo spazio lo permette

## Criteri di Accettazione

- [ ] Su mobile (< 768px), la timeline e' una colonna verticale compatta
- [ ] Le project card si impilano verticalmente su mobile
- [ ] Nessun scroll orizzontale su qualsiasi larghezza di schermo (>= 320px)
- [ ] Il testo non viene troncato ne' si sovrappone
- [ ] I tag tecnologici vanno a capo senza essere nascosti
- [ ] I target di tocco hanno almeno 44x44 punti
- [ ] Su tablet landscape (>= 768px), il layout e' equivalente al desktop

## Note Tecniche

- Breakpoint: Tailwind CSS 4 responsive classes (sm:, md:, lg:)
- Le project card dentro le work entry usano grid/flex con wrap
- I tag usano flex-wrap per andare a capo naturalmente
- Il componente ProjectCard esistente e' gia' responsive (verificare)
- Dipendenza: US-ET-001 (la sezione Experience deve esistere)
