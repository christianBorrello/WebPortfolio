# Validazione del Problema: Sistema Centralizzato di Task Tracking

## Contesto

Questo non e' un prodotto per utenti esterni. E' un sistema di workflow per uno sviluppatore solo (Christian) che lavora con Claude Code. La validazione del problema non avviene tramite interviste tradizionali, ma tramite **evidenza diretta dal repository e dall'esperienza di lavoro**.

---

## Problema Identificato

I task del progetto WebPortfolio sono frammentati tra sessioni di Claude Code. Non esiste un singolo punto di riferimento che raccolga tutti i task e il loro stato di avanzamento.

## Evidenze dal Repository (Comportamento Passato)

### E1: Frammentazione della documentazione

La struttura attuale di `docs/` contiene **47+ file** distribuiti in 12 sottodirectory:

```
docs/
  analysis/          (1 file)
  brainstorm/        (2 file)
  design/            (5 file + 7 ADR)
  devops/            (4 file)
  discovery/         (5 file)
  distill/           (2 file)
  evolution/         (3 file)
  feature/           (3 feature, ciascuna con roadmap + execution-log + design/)
  profile/           (1 file)
  requirements/      (4 file)
  ux/                (3 file)
```

Per capire "a che punto siamo" serve navigare manualmente almeno 3-4 file.

### E2: Informazioni di stato disperse

Lo stato di avanzamento e' tracciato in almeno 3 formati diversi:
- `execution-log.yaml` (per feature) -- log cronologico di eventi
- `roadmap.yaml` (per feature) -- piano con step
- `evolution/*.md` -- riassunto post-completamento

Nessuno di questi fornisce una vista aggregata cross-feature.

### E3: Assenza di tracciamento task impliciti

Osservazioni, intenzioni e idee che emergono durante le conversazioni non hanno un posto dove essere registrate. L'idea stessa del task tracking e' nata come idea durante una sessione e ha richiesto un idea-brief dedicato per non perdersi.

### E4: Isolamento tra sessioni

Ogni sessione di Claude Code parte senza visibilita' sul quadro d'insieme. Deve leggere piu' file per ricostruire il contesto. Non esiste un file che dica "ecco cosa c'e' da fare, ecco cosa e' in corso, ecco cosa e' completato".

### E5: Il progetto ha gia' superato la scala gestibile a memoria

Con 3 feature completate (portfolio-cv-site, italian-localization, contact-form-resend-migration) e task emergenti continui, la complessita' ha superato la soglia dove "ricordare tutto" e' sufficiente.

---

## Profilo degli Attori

### Attore Primario: Claude Code (sessione)

- **Job-to-be-done**: Capire rapidamente il contesto del progetto per lavorare in modo autonomo
- **Comportamento attuale**: Legge CLAUDE.md, poi deve navigare docs/ per ricostruire lo stato
- **Dolore**: Tempo sprecato a ricostruire il contesto; rischio di lavorare su task gia' completati o ignorare task aperti
- **Requisiti tecnici**: Deve poter fare parse del file in modo affidabile; struttura prevedibile e non ambigua

### Attore Secondario: Christian (sviluppatore/revisore)

- **Job-to-be-done**: Avere il "punto della situazione" in pochi secondi aprendo un singolo file
- **Comportamento attuale**: Naviga mentalmente tra docs/feature/*/roadmap.yaml e docs/evolution/
- **Dolore**: Non esiste una vista unica; serve uno sforzo cognitivo per aggregare lo stato
- **Requisiti**: Leggibilita' umana; apertura diretta nell'IDE; nessuno strumento esterno

---

## Validazione dei Criteri di Successo (dall'idea brief)

| Criterio | Validabile? | Metodo di validazione |
|---|---|---|
| L'utente apre un singolo file e capisce lo stato | Si | Test pratico: il file contiene tutti i task con stato |
| Claude Code legge/aggiorna/crea task senza istruzioni ripetute | Si | Istruzioni in CLAUDE.md + formato parseabile |
| La struttura non diventa un problema di manutenzione | Si | Review periodica della dimensione del file |
| I task emergono dalle conversazioni | Parzialmente | Richiede istruzioni precise in CLAUDE.md |
| Il file resta leggibile con molti task | Si | Strategia di archiviazione |

---

## Assunzioni da Validare (Tracker)

| ID | Assunzione | Rischio (1-10) | Impatto (1-10) | Score | Stato |
|---|---|---|---|---|---|
| A1 | Un singolo file e' sufficiente (non serve un database) | 3 | 9 | 27 | Da validare |
| A2 | Claude Code puo' fare parse affidabile di YAML/MD strutturato | 2 | 10 | 20 | Alta confidenza |
| A3 | Le istruzioni in CLAUDE.md sono sufficienti per il mantenimento automatico | 5 | 8 | 40 | Da validare |
| A4 | I task completati possono essere archiviati senza perdita di contesto | 4 | 6 | 24 | Da validare |
| A5 | Il formato scelto bilancia leggibilita' umana e parseabilita' LLM | 3 | 9 | 27 | Da ricercare |
| A6 | Claude Code puo' riconoscere task impliciti dalle conversazioni | 7 | 7 | 49 | Da validare |

---

## Gate G1: Valutazione

| Criterio | Target | Risultato | Stato |
|---|---|---|---|
| Evidenze che confermano il dolore | 5+ | 5 (E1-E5) | PASS |
| >60% delle evidenze conferma il problema | >60% | 100% | PASS |
| Problema articolato nel linguaggio dell'utente | Si | Si (dall'idea brief) | PASS |

**Decisione G1**: PROCEED -- Il problema e' validato da evidenza diretta del repository. Non servono interviste esterne perche' gli attori sono lo sviluppatore stesso e le sessioni Claude Code.
