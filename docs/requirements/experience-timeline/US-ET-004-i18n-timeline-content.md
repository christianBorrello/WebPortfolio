# US-ET-004: Il contenuto della timeline si mostra nella lingua selezionata dal visitatore

## Problema (Il Dolore)

Marco Ferretti e' un recruiter italiano che lavora per un'azienda
internazionale. Visita il portfolio di Christian in italiano per capire
meglio il contesto, poi passa all'inglese per condividere il link con
il team. Se la sezione Experience non cambia lingua correttamente --
o se alcuni label restano in inglese mentre il contenuto e' in italiano
-- Marco percepisce il sito come incompleto e poco curato. Per un
portfolio che promette "quality is not negotiable", un'incoerenza
linguistica e' un segnale contraddittorio.

## Chi (L'Utente)

- Visitatori italiani che preferiscono leggere nella loro lingua
- Visitatori internazionali che usano la versione inglese
- Qualsiasi visitatore che usa il language switcher durante la visita

## Soluzione (Cosa Costruiamo)

La sezione Experience carica i dati dalla YAML localizzata corretta
(`content/experience/en.yaml` o `content/experience/it.yaml`) e tutti
i label UI dal file di messaggi corrispondente (`messages/{locale}/experience.json`).
Il language switcher cambia tutto il contenuto della timeline: heading,
descrizioni, badge di tipo, label "Present"/"Presente", link "Read case study".

## Esempi di Dominio

### Esempio 1: Visitatore italiano vede tutto in italiano

Marco Ferretti visita il portfolio in italiano. La sezione mostra
"Esperienze" come heading. L'entry lavorativa mostra il periodo
"2022 - Presente". Il badge dice "Lavoro". Le project entry mostrano
il badge "Progetto". Il link dice "Leggi il case study". La descrizione
dell'entry e' in italiano. Tutto il contenuto e' coerente nella lingua.

### Esempio 2: Switch da inglese a italiano durante la visita

Laura Chen sta leggendo la timeline in inglese. Vede "Experience",
badge "Work", periodo "2022 - Present". Clicca il language switcher
per passare all'italiano. La pagina si ricarica e la sezione mostra
"Esperienze", badge "Lavoro", periodo "2022 - Presente". Le descrizioni
delle entry sono ora in italiano.

### Esempio 3: Dati YAML mancanti per una lingua

Christian ha aggiunto una nuova entry nel file YAML inglese ma non ha
ancora aggiornato il file italiano. Il build del sito fallisce con un
errore chiaro che indica quale entry manca nel file `content/experience/it.yaml`,
invece di mostrare contenuto misto o vuoto al visitatore.

## Scenari UAT (BDD)

### Scenario: Contenuto in inglese
Given il visitatore e' sulla homepage in inglese
When la sezione Experience si carica
Then l'heading mostra "Experience"
And i badge di tipo mostrano "Work", "Education", "Project"
And il periodo in corso mostra "Present"
And i link mostrano "Read case study"
And le descrizioni delle entry sono in inglese

### Scenario: Contenuto in italiano
Given il visitatore e' sulla homepage in italiano
When la sezione Experience si carica
Then l'heading mostra "Esperienze"
And i badge di tipo mostrano "Lavoro", "Formazione", "Progetto"
And il periodo in corso mostra "Presente"
And i link mostrano "Leggi il case study"
And le descrizioni delle entry sono in italiano

### Scenario: Language switcher aggiorna tutta la timeline
Given il visitatore sta visualizzando la sezione Experience in inglese
When cambia lingua usando il language switcher
Then la pagina si ricarica in italiano
And tutti i label della sezione Experience sono in italiano
And le descrizioni delle entry sono in italiano
And nessun testo rimane in inglese

### Scenario: Le project card dentro le work entry rispettano la lingua
Given il visitatore e' sulla homepage in italiano
When guarda le project card annidate nella work entry
Then i titoli dei progetti sono in italiano
And i link "Leggi il case study" sono in italiano
And i tag tecnologici restano invariati (sono in inglese per convenzione)

## Criteri di Accettazione

- [ ] I dati timeline vengono caricati da `content/experience/{locale}.yaml` basandosi sul locale attivo
- [ ] L'heading usa la chiave i18n `experience.heading` (EN: "Experience", IT: "Esperienze")
- [ ] I badge tipo usano le chiavi `experience.type_work`, `experience.type_education`, `experience.type_project`
- [ ] Il periodo in corso usa la chiave `experience.present` (EN: "Present", IT: "Presente")
- [ ] Il link al case study usa la chiave `experience.read_case_study`
- [ ] Le descrizioni nelle entry vengono dal file YAML localizzato
- [ ] Il language switcher aggiorna tutto il contenuto della sezione
- [ ] I tag tecnologici restano in inglese indipendentemente dalla lingua (convenzione tecnica)

## Note Tecniche

- File dati: `content/experience/en.yaml` e `content/experience/it.yaml` -- Christian deve compilarli
- File messaggi: `messages/en/experience.json` e `messages/it/experience.json`
- Il loader `experience-loader.ts` segue lo stesso pattern di `content-loader.ts` (accetta locale come parametro)
- Il componente usa `useTranslations("experience")` per i label UI
- I tag tecnologici (es. ".NET", "React") sono gli stessi in entrambe le lingue per convenzione del settore
- Dipendenza: US-ET-001 (la sezione Experience deve esistere)
