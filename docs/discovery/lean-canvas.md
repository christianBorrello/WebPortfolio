# Lean Canvas — Personal Portfolio / CV Site

**Fase**: Discovery — Fase 4
**Data**: 2026-03-01
**Stato gate G4**: Superato

---

## Lean Canvas

### 1. Problema

**Problema principale (validato)**
I canali professionali esistenti di Christian — LinkedIn, GitHub, CV cartaceo — non comunicano la sua identità professionale autentica. I visitatori non riescono a distinguerlo da un profilo ordinario e non possono riconoscere il fit culturale e tecnico.

**Problemi secondari**
- GitHub mostra repos incompleti senza contesto — segnale negativo per chi valuta la qualità del lavoro
- LinkedIn non è aggiornato e non trasmette l'approccio ingegneristico
- Nessun canale mostra il pensiero decisionale dietro i progetti (il "perché" delle scelte architetturali)

**Canali alternativi esistenti e perché non bastano**
| Canale | Limite |
|---|---|
| LinkedIn | Non dimostra le capacità tecniche concretamente |
| GitHub | Disorganizzato, repos senza documentazione |
| CV cartaceo | Statico, racconta output non decisioni |

---

### 2. Segmento clienti

**Audience primaria (obiettivo immediato)**
Recruiter tecnico in aziende con queste caratteristiche:
- Team piccolo o in forte crescita (5-50 persone)
- Cultura full-remote
- Stack moderni (.NET, React, cloud-native, Azure/AWS)
- Autonomia operativa valorizzata
- Ruoli dove l'ingegnere impatta le decisioni architetturali

**Profilo cercato**: Software Engineer junior/mid (~1.5 anni di esperienza, laurea in corso). Non il recruiter di grandi corporate che richiede 5+ anni e laurea magistrale — il recruiter di team piccoli che valuta il pensiero, non il CV formale.

**Segnale di fit del recruiter**: Cerca ownership, non esecuzione. Cerca qualcuno che pensi oltre il ticket assegnato. Sa riconoscere la qualità del lavoro indipendentemente dagli anni di esperienza.

**Audience secondaria (obiettivo lungo termine)**
Potenziale cliente freelance che cerca un Software Engineer con pensiero sistemico per progetti complessi.

**Segmentazione per job-to-be-done, non per demografia**
- JOB-1: Capire rapidamente se vale la pena approfondire (< 90 secondi)
- JOB-2: Valutare la profondità tecnica reale
- JOB-3: Capire il fit culturale

---

### 3. Proposta di valore unica

**Per il recruiter tecnico**
Un Software Engineer che non consegna feature — costruisce sistemi. Che non aspetta di essere guidato — identifica autonomamente cosa farebbe davvero la differenza. Che non lavora per obbligo — costruisce cose di cui essere fiero.

**Frase identitaria (in parole di Christian, da usare nel sito)**
> "I don't work for duty or money. I work to build something I'm proud of."

**Il sito come portfolio piece**
Il sito stesso è evidenza dell'approccio: la scelta dello stack, l'architettura, la qualità del codice, la cura dell'esperienza utente comunicano il livello direttamente.

---

### 4. Soluzione

**Struttura del sito validata dalla discovery**

| Sezione | Job soddisfatto | Contenuto chiave |
|---|---|---|
| Hero | JOB-1 | Identità in 1-2 frasi. Non "Hi, I'm a developer" — l'approccio sistemico fin dalla prima riga |
| About | JOB-3 | Valori espliciti, tipo di realtà cercata, ADHD come pattern di funzionamento (curiosità, visione d'insieme) |
| Projects | JOB-2 | Case study con struttura: problema → decisione → perché → risultato misurabile |
| Contact | Tutti | Sezione unificata con apertura sia a posizioni da dipendente che a proposte freelance |

**Progetti da includere in v1**

Lavorativi (top 2 per impatto):
1. SagitterHub — piattaforma enterprise unificata; il modulo VisureHub dimostra la profondità architetturale (Hexagonal, DDD, CQRS, TDD >90%)
2. Migrazione Azure — impatto business misurabile (€280/mese risparmiati, 46 risorse)

Personali (top 3 per narrativa):
1. OpenGL-Renderer — curiosità tecnica radicale, "vado al livello più basso per capire davvero"
2. Habit Tracker iOS/Swift — esplorazione fuori dallo stack principale, scelta tecnologica motivata dal problema
3. Videogioco soulslike Unity — esplorazione di un dominio completamente diverso

**Lingua**: Inglese per v1. Architettura i18n pronta (stringhe esternalizzate) per espansione futura.

---

### 5. Canali

**Canali di acquisizione visite (tracking con UTM parameters)**
- LinkedIn (profilo aggiornato con link al sito)
- GitHub (README aggiornati con link al sito)
- Candidature dirette (link nel CV/email)
- Passaparola (rete professionale esistente)

**Obiettivo misurazione**: Source attribution per capire quale canale porta visite di qualità, non solo volume.

---

### 6. Flusso di ricavi

**Obiettivo immediato**: Nessun ricavo diretto. Il sito è uno strumento di acquisizione per posizioni da dipendente.

**Obiettivo lungo termine**: Generazione di lead freelance qualificati attraverso la sezione contatti.

**Valore indiretto misurabile**: Posizione da dipendente ottenuta con condizioni migliori (salario, cultura, autonomia) rispetto a quanto i canali esistenti permettono.

---

### 7. Struttura dei costi

**Costi tecnici stimati per v1**
- Dominio: ~€15/anno
- Hosting: variabile per stack scelto (da €0 per soluzioni serverless/static a €10-20/mese per server dedicato)
- Analytics: Plausible o Umami self-hosted (privacy-first, GDPR compliant) o Vercel Analytics se su Vercel

**Costo principale**: Tempo di sviluppo (non monetario — è il portfolio piece).

---

### 8. Metriche chiave

**Metriche primarie (prime 4-6 settimane)**
- Visite uniche: target 100
- Source breakdown: % da LinkedIn, GitHub, candidature dirette
- Tasso di rimbalzo: indicatore di pertinenza dei visitatori

**Metriche secondarie (settimane 6-12)**
- Contatti inbound ricevuti (numero e qualità)
- Tipo di messaggio ricevuto (offerte di lavoro, proposte freelance, networking)
- Conversione visite → colloquio

**Segnale di successo qualitativo**
Un recruiter che cita nel primo messaggio qualcosa di specifico letto sul sito — non solo "ho visto il tuo profilo".

---

### 9. Vantaggio sleale

**Il sito stesso è il vantaggio**
La qualità dell'implementazione tecnica, la coerenza narrativa e la cura dell'esperienza utente sono verificabili direttamente da chi visita. Non è un CV che descrive competenze — è competenza dimostrata in atto.

**L'autenticità è il differenziatore**
Il posizionamento su valori reali ("realizzare qualcosa di cui possa essere fiero") è difficile da copiare perché è identitario, non strategico.

---

## I 4 rischi validati

### Rischio 1 — Valore (value risk)
**Domanda**: Il sito comunicherà davvero l'identità autentica meglio dei canali esistenti?

**Valutazione**: Rischio basso. Il problema è documentato e la soluzione è direttamente controllabile. La narrativa è chiara, i casi studio esistono, la frase identitaria è definita.

### Rischio 2 — Usabilità (usability risk)
**Domanda**: I visitatori riusciranno a navigare e trovare le informazioni che cercano?

**Valutazione**: Rischio medio. Da testare con feedback reale dopo il lancio. La struttura in 4 sezioni (Hero, About, Projects, Contact) è semplice per definizione.

### Rischio 3 — Fattibilità (feasibility risk)
**Domanda**: Christian riesce a costruire e lanciare il sito in tempi utili per la ricerca attiva?

**Valutazione**: Rischio medio-basso. Stack .NET + React è padroneggiato. Il rischio principale è la perfezionismo — il sito deve uscire come MVP di qualità, non come capolavoro definitivo. Determinare una data di lancio fissa è raccomandato.

### Rischio 4 — Viabilità (viability risk)
**Domanda**: Il sito attirerà i visitatori giusti?

**Valutazione**: Rischio medio. Dipende dalla distribuzione (LinkedIn, GitHub, candidature). Il sito da solo non genera traffico — deve essere amplificato dai canali esistenti. Azione: aggiornare LinkedIn e GitHub con link prima del lancio.

---

## Gate G4 — Criteri e valutazione

| Criterio | Target | Risultato | Stato |
|---|---|---|---|
| Lean Canvas completo | Sì | Tutte le 9 sezioni compilate | Superato |
| Rischio valore affrontato | Sì | Basso — problema validato, soluzione controllabile | Superato |
| Rischio usabilità affrontato | Sì | Medio — da testare post-lancio | Superato |
| Rischio fattibilità affrontato | Sì | Medio-basso — stack padroneggiato | Superato |
| Rischio viabilità affrontato | Sì | Medio — dipende da distribuzione attiva | Superato |
| Metriche di successo definite | Sì | 100 visite in 4-6 settimane con source attribution | Superato |
| Decisioni chiave documentate | Sì | Lingua, struttura, progetti, posizionamento | Superato |

**Verdetto G4**: Superato. Discovery completa. Pronto per handoff al product-owner.
