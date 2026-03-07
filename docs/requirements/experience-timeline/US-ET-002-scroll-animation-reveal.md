# US-ET-002: Le entry della timeline si rivelano progressivamente con lo scroll

## Problema (Il Dolore)

Marco Ferretti atterra sulla homepage e vede la sezione Experience. Se tutte
le entry fossero visibili simultaneamente, la sezione sarebbe una lunga lista
statica che non guida la lettura. Marco scansiona a caso, perde il filo
cronologico e non percepisce la progressione professionale. Il risultato e'
lo stesso della griglia Projects: un catalogo da consumare a pezzi.

Laura Chen, engineering manager, vuole leggere la timeline come una storia.
Una lista piatta non comunica ritmo ne' progressione. Ogni entry deve
"arrivare" al momento giusto per costruire la narrativa di crescita.

## Chi (L'Utente)

- Qualsiasi visitatore che scrolla la sezione Experience sulla homepage
- Il recruiter che scansiona rapidamente (l'animazione guida lo sguardo senza rallentarlo)
- L'hiring manager che legge in profondita' (l'animazione crea ritmo narrativo)
- Utenti con preferenza di riduzione del movimento (devono vedere tutto senza animazioni)

## Soluzione (Cosa Costruiamo)

Un'animazione di reveal basata sullo scroll: ogni entry nella timeline
inizia invisibile e si rivela con un fade-in + leggero translateY quando
entra nel viewport. L'animazione usa Intersection Observer + CSS transitions
(zero dipendenze esterne). Rispetta `prefers-reduced-motion` disabilitando
completamente le transizioni.

## Esempi di Dominio

### Esempio 1: Marco scrolla e le entry appaiono in sequenza

Marco Ferretti scrolla la sezione Experience. La prima entry (Senior Software
Engineer, Sagitter) e' gia' visibile perche' e' nel viewport iniziale.
Quando scrolla, l'entry Unity Soulslike Game appare con un fade-in sottile
(0.6s ease-out). Dopo 100ms, appare l'entry iOS Habit Tracker. Dopo altri
100ms, OpenGL Renderer. L'effetto e' di svelamento progressivo -- Marco
percepisce una sequenza, non una lista.

### Esempio 2: Laura torna dalla pagina case study

Laura Chen ha letto il case study di SagitterHub e torna alla homepage
cliccando "Back to experience". La pagina atterra sulla sezione Experience.
Le entry gia' scrollate in precedenza sono visibili (non si ri-animano).
Le entry piu' in basso che non ha ancora visto si riveleranno quando scrolla.

### Esempio 3: Utente con prefers-reduced-motion abilitato

Anna Rossi e' una hiring manager con sensibilita' al movimento. Ha
abilitato "Reduce motion" nelle impostazioni del sistema operativo. Quando
carica la homepage e scrolla fino alla sezione Experience, tutte le entry
sono immediatamente visibili senza alcuna animazione di fade-in o
translate. La timeline e' pienamente leggibile dal primo istante.

## Scenari UAT (BDD)

### Scenario: Le entry si rivelano quando entrano nel viewport
Given la sezione Experience ha 6 entry nella timeline
And la prima entry e' nel viewport iniziale
When il visitatore scrolla verso il basso
Then le entry che entrano nel viewport diventano visibili con una transizione
And le entry non ancora nel viewport rimangono invisibili
And ogni entry ha un ritardo di stagger rispetto alla precedente

### Scenario: La prima entry e' visibile senza scroll
Given il visitatore ha scrollato fino all'inizio della sezione Experience
When la sezione e' visibile
Then la prima entry (la piu' recente) e' immediatamente visibile
And non richiede scroll aggiuntivo per apparire

### Scenario: Le entry gia' rivelate non si ri-animano
Given il visitatore ha scrollato attraverso tutta la timeline
And tutte le entry sono state rivelate
When il visitatore scrolla verso l'alto e poi di nuovo verso il basso
Then le entry gia' rivelate restano visibili senza ripetere l'animazione

### Scenario: L'animazione rispetta prefers-reduced-motion
Given l'utente ha abilitato "prefers-reduced-motion" nelle impostazioni del SO
When la sezione Experience si carica
Then tutte le entry sono immediatamente visibili senza animazione
And nessuna transizione fade-in o translate viene applicata

### Scenario: L'animazione non blocca l'interazione
Given il visitatore sta scrollando la sezione Experience
When un'entry sta completando la sua animazione di reveal
Then il visitatore puo' comunque cliccare sui link e sulle card
And lo scroll non viene bloccato dall'animazione

## Criteri di Accettazione

- [ ] Le entry iniziano invisibili (opacity: 0, translateY: 20px)
- [ ] Le entry si rivelano quando entrano nel viewport (opacity: 1, translateY: 0)
- [ ] La transizione dura 0.6s con easing ease-out
- [ ] Ogni entry successiva ha uno stagger di 100ms
- [ ] La prima entry nel viewport iniziale e' immediatamente visibile
- [ ] Le entry gia' rivelate non si ri-animano allo scroll successivo
- [ ] Con `prefers-reduced-motion` attivo, tutte le entry sono immediatamente visibili
- [ ] L'animazione non blocca interazione (click, scroll)

## Note Tecniche

- Implementazione: Intersection Observer API con threshold ~0.1
- Custom hook: `useScrollReveal()` gestisce l'observer per tutte le entry
- CSS transitions, non JavaScript animations (performance GPU)
- Lo stagger si ottiene con CSS transition-delay calcolato dall'indice dell'entry
- Il componente `ExperienceTimeline` e' un client component (`"use client"`)
- Zero dipendenze esterne per le animazioni
