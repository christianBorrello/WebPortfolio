## Profilo — Source of Truth (LinkedIn)

Questi dati sono la fonte autorevole per tutti i contenuti del sito.

### Anagrafica

- **Nome**: Christian Borrello
- **Email**: christian.borrello@live.it
- **LinkedIn**: https://www.linkedin.com/in/christianborrello99
- **GitHub**: https://github.com/christianBorrello
- **Sede**: Italia
- **Universita'**: Universita' degli Studi di Milano-Bicocca — Laurea L in Scienze e Tecnologie Informatiche (da ottobre 2022, in corso)
- **Certificazioni**: Bbetween Lingue — Inglese B2

### Titolo professionale

Software Engineer | Software Craftsmanship · TDD · AI-Augmented Development

### Competenze principali

Test Driven Development, Architettura Software, Domain Driven Design

### Riepilogo

Carriera da Software Engineer nella tradizione dell'eXtreme Programming e del Software Craftsmanship. Le tecnologie sono strumenti da scegliere in funzione del problema; quello che resta e' il metodo.

Pane quotidiano: TDD · Clean Architecture · DDD · Refactoring continuo · Design incrementale

AI workflow: Claude Code ogni giorno, affiancato da nWave (pipeline strutturata con agenti specializzati) e Context7 per contesto preciso. L'AI e' lo strumento piu' potente mai messo in mano a uno sviluppatore, ma senza test, architetture e principi il rischio e' produrre piu' codice, non codice migliore.

Oltre l'enterprise: studio Informatica a Milano-Bicocca, passione per game development — action RPG souls-like in Unity, graphics programming con OpenGL/C++.

Cosa cerco: team che investano sulla qualita' del metodo prima che sullo stack. Crescere accanto a sviluppatori piu' esperti, affinare le pratiche, contribuire con disciplina e entusiasmo.

### Esperienze lavorative

#### Sagitter SpA — Software Engineer (marzo 2025 – presente)

- Ruolo piu' significativo, maggiore autonomia operativa
- Formato sui principi XP e Software Craftsmanship da Alessandro Di Gioia (co-autore "Agile Technical Practices Distilled", co-fondatore nWave.ai)
- Rifattorizzazione progressiva con TDD Outside-In, walking skeleton, refactoring continuo
- Workflow AI-assisted (Claude Code + nWave) nel ciclo TDD
- Creazione di SagitterHub (modular monolith):
  - Estrazione automatizzata visure catastali/ipotecarie (Agenzia delle Entrate, autenticazione multi-step, CAPTCHA solving, sessioni concorrenti)
  - Estrazione visure camerali (integrazione servizio esterno)
  - Invio automatizzato comunicazioni ai Centri per l'Impiego (mappatura sedi tramite scraping AI-assisted)
  - RateWatch: monitoraggio tassi europei (BCE, Euribor, IRS) con storicizzazione e notifiche email
- Consolidamento infrastruttura cloud: 46 risorse su 4 app legacy → architettura unificata, costi da €380 a €100-160/mese (−60/70%) tramite IaC
- Stack: C#, .NET, React, TypeScript, Azure, Terraform, xUnit, Git, Claude Code, nWave

#### Vis Software Solutions — Software Developer (maggio 2024 – ottobre 2024)

- Sviluppo full-stack su piattaforma SaaS in ASP.NET MVC
- Progettazione e implementazione sistema di internazionalizzazione: middleware custom di geolocalizzazione IP per rilevamento automatico lingua, integrato con API di traduzione esterna
- Stack: C#, ASP.NET MVC, Telerik UI, SQL Server, HTML, CSS, JavaScript

### Link sociali per CTA nel sito

- LinkedIn: https://www.linkedin.com/in/christianborrello99
- GitHub: https://github.com/christianBorrello

---

## Task Tracker

Il file `TASKS.yaml` nella root e' il tracker centralizzato dei task.

### Regole

1. **Leggi TASKS.yaml all'inizio di ogni sessione** per capire il quadro d'insieme.
2. **Conferma obbligatoria per OGNI operazione**. Non creare task e non cambiare status senza conferma esplicita di Christian.
3. **Formato conferma creazione**: `Nuovo task rilevato: "[titolo]". Registro?`
4. **Formato conferma stato**: `task-NNN "[titolo]" e' [status_attuale]. Aggiorno a [nuovo_status]?`
5. **Formato conferma completamento**: `task-NNN "[titolo]" completato. Segno come done?`
6. **Dopo conferma completamento**: archivia il task in `docs/archive/tasks-YYYY.yaml` (anno corrente). Messaggio: `task-NNN archiviato in docs/archive/tasks-YYYY.yaml.`
7. **Mantieni ordine per priorita'**: high > normal > low. Dentro la stessa priorita', i task piu' urgenti prima.
8. **ID auto-incrementale**: il prossimo id e' `task-NNN` dove NNN = max id esistente + 1.
9. **Aggiorna `last_updated` e `updated_by`** ad ogni modifica.
10. **TASKS.yaml e' un puntatore**: titolo + status + refs. Non duplicare contenuti dei roadmap o altri file.

### Lingua

Contenuti (titoli, contesto, note): **italiano**.
Campi YAML e valori enum (status, priority, wave): **inglese**.

### Status validi

`open` | `in-progress` | `blocked` | `done` | `cancelled`

Transizioni: open -> in-progress. open -> cancelled. in-progress -> done. in-progress -> blocked. blocked -> in-progress. blocked -> cancelled.

### Wave valide

`brainstorm` | `discover` | `discuss` | `design` | `devops` | `distill` | `deliver` | `done` | `skipped`

### Archiviazione

I task `done` vengono spostati (non copiati) da TASKS.yaml a `docs/archive/tasks-YYYY.yaml`.
Il file di archivio e' append-only: contiene solo la lista `tasks`, senza header (schema_version, last_updated).
Se il file o la directory non esistono, creali.

### Se TASKS.yaml non esiste

Segnala l'assenza. Non creare il file autonomamente.

### Se TASKS.yaml e' malformato

Se il parse YAML fallisce:
1. Segnala l'errore specifico (riga, tipo di errore).
2. Proponi una correzione e chiedi conferma a Christian.
3. Non procedere con nessuna operazione finche' il file non e' valido.
4. Se l'errore non e' chiaro, suggerisci `git diff HEAD~1 TASKS.yaml` per identificare la modifica che ha introdotto il problema.

### Validazione refs

Quando leggi TASKS.yaml a inizio sessione, verifica che i path in `refs` esistano. Se un ref punta a un file inesistente, segnalalo: `task-NNN: ref invalido: path/non/esiste`. Non rimuovere il ref automaticamente.

### Schema version

Se `schema_version` e' diverso da `"1.0"`, segnala l'anomalia e non procedere senza conferma di Christian.
