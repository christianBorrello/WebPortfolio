# Definition of Ready Checklist
# Portfolio CV Site — Christian Borrello
# Wave: DISCUSS — 2026-03-01

Ogni storia deve superare tutti e 8 i criteri prima del handoff alla DESIGN wave.
Criteri falliti bloccano il handoff e richiedono remediation specifica.

---

## Legenda

| Simbolo | Significato |
|---------|-------------|
| PASS | Criterio superato con evidenza |
| FAIL | Criterio non superato — remediation richiesta |
| NOTE | Superato con nota o dipendenza tracciata |

---

## US-00 — Walking Skeleton

| # | Criterio DoR | Stato | Evidenza |
|---|--------------|-------|----------|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "Architettura end-to-end non validata blocca scoperta di rischi di integrazione" — nessun tecnicismo |
| 2 | Utente/persona identificato con caratteristiche specifiche | PASS | Christian come developer del proprio sito — greenfield, obiettivo verificare il flusso end-to-end |
| 3 | Almeno 3 esempi di dominio con dati reali | PASS | Tre esempi concreti: deploy automatico, form end-to-end, struttura i18n verificabile |
| 4 | Scenari UAT in Given/When/Then (3-7 scenari) | PASS | 4 scenari Gherkin nel documento user-stories.md |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 6 AC in acceptance-criteria.md — AC-00-01 a AC-00-06 |
| 6 | Storia right-sized (1-3 giorni, 3-7 scenari) | PASS | Stima 1-2 giorni, 4 scenari |
| 7 | Note tecniche identificano vincoli e dipendenze | PASS | Stack specificato, dipendenze Vercel/Formspree documentate, variabile V-04 tracciata |
| 8 | Dipendenze risolte o tracciate | NOTE | V-04 (Formspree vs Resend) da decidere in Feature 0 — tracciata in shared-artifacts-registry.md |

**Verdetto US-00**: PASS — Pronto per DESIGN wave

---

## US-01 — Hero Section

| # | Criterio DoR | Stato | Evidenza |
|---|--------------|-------|----------|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "Marco valuta 15-20 profili a settimana e nessuno lo ferma" — nessun tecnicismo |
| 2 | Utente/persona identificato con caratteristiche specifiche | PASS | Marco Ferretti (Technical Recruiter) e Giulia Marchetti (Founder) — entrambi definiti con contesto |
| 3 | Almeno 3 esempi di dominio con dati reali | PASS | Marco da LinkedIn, Giulia da referral, visitatore che bounces correttamente (selezione naturale) |
| 4 | Scenari UAT in Given/When/Then (3-7 scenari) | PASS | 3 scenari Gherkin in user-stories.md |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 6 AC in acceptance-criteria.md — AC-01-01 a AC-01-06 |
| 6 | Storia right-sized (1-3 giorni, 3-7 scenari) | PASS | Stima 1 giorno, 3 scenari |
| 7 | Note tecniche identificano vincoli e dipendenze | PASS | Dipendenza da US-00 esplicita, contenuto da validare con Christian prima del lancio |
| 8 | Dipendenze risolte o tracciate | NOTE | Contenuto esatto della frase identitaria da validare con Christian — tracciato come V-01 area |

**Verdetto US-01**: PASS — Pronto per DESIGN wave

---

## US-02 — About Section

| # | Criterio DoR | Stato | Evidenza |
|---|--------------|-------|----------|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "Marco e Giulia hanno domande diverse sull'identità di Christian che nessun altro canale risponde" |
| 2 | Utente/persona identificato con caratteristiche specifiche | PASS | Marco (fit culturale) e Giulia (affidabilità) — lenti diverse sullo stesso contenuto documentate |
| 3 | Almeno 3 esempi di dominio con dati reali | PASS | Marco legge technology philosophy, Giulia legge valori non negoziabili, visitatore comprende ADHD framing |
| 4 | Scenari UAT in Given/When/Then (3-7 scenari) | PASS | 3 scenari Gherkin in user-stories.md |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 8 AC in acceptance-criteria.md — AC-02-01 a AC-02-08 |
| 6 | Storia right-sized (1-3 giorni, 3-7 scenari) | PASS | Stima 1 giorno implementazione + scrittura contenuto separata, 3 scenari |
| 7 | Note tecniche identificano vincoli e dipendenze | PASS | Nota esplicita: contenuto scritto con Christian in DESIGN wave, stima lunghezza 250-350 parole |
| 8 | Dipendenze risolte o tracciate | NOTE | Testo definitivo da produrre — dipendenza da Christian come autore, tracciata |

**Verdetto US-02**: PASS — Pronto per DESIGN wave

---

## US-03 — Projects Section

| # | Criterio DoR | Stato | Evidenza |
|---|--------------|-------|----------|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "Marco non sa se Christian ragiona davvero o ha seguito tutorial — nessuna prova del pensiero nei portfolio standard" |
| 2 | Utente/persona identificato con caratteristiche specifiche | PASS | Marco (ragionamento esplicito) e Giulia (business impact) — trigger diversi documentati |
| 3 | Almeno 3 esempi di dominio con dati reali | PASS | Marco legge SagitterHub (VisureHub module), Giulia legge Azure migration, non-tecnico capisce OpenGL Renderer |
| 4 | Scenari UAT in Given/When/Then (3-7 scenari) | PASS | 4 scenari Gherkin in user-stories.md |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 22 AC in acceptance-criteria.md — AC-03-01 a AC-03-22 |
| 6 | Storia right-sized (1-3 giorni, 3-7 scenari) | NOTE | Stima 2-3 giorni — al limite superiore. Nota: valutare split in US-03a (template + SagitterHub) e US-03b (Azure + personali) in DESIGN wave |
| 7 | Note tecniche identificano vincoli e dipendenze | PASS | Bottleneck scrittura contenuto documentato, valori numerici da verificare (V-02, V-03), anchor navigation necessaria |
| 8 | Dipendenze risolte o tracciate | NOTE | V-02 (range €100-160 da spiegare) e V-03 (risorse post-migrazione) non ancora risolti — tracciati in shared-artifacts-registry.md |

**Verdetto US-03**: PASS con nota — Pronto per DESIGN wave. Raccomandazione split monitorata.

---

## US-04 — Contact Section

| # | Criterio DoR | Stato | Evidenza |
|---|--------------|-------|----------|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "Marco è convinto ma può ancora rimbalzare per un attrito minimo nel momento del contatto" |
| 2 | Utente/persona identificato con caratteristiche specifiche | PASS | Marco (messaggio breve) e Giulia (descrizione problema lungo) — pattern di uso diversi documentati |
| 3 | Almeno 3 esempi di dominio con dati reali | PASS | Marco solo email, Giulia con messaggio lungo, visitatore con errore email mancante |
| 4 | Scenari UAT in Given/When/Then (3-7 scenari) | PASS | 4 scenari Gherkin in user-stories.md |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 10 AC in acceptance-criteria.md — AC-04-01 a AC-04-10 |
| 6 | Storia right-sized (1-3 giorni, 3-7 scenari) | PASS | Stima 1 giorno, 4 scenari |
| 7 | Note tecniche identificano vincoli e dipendenze | PASS | Dipendenza Formspree/Resend tracciata (V-04), limite 50 submissions/mese documentato |
| 8 | Dipendenze risolte o tracciate | NOTE | V-04 (Formspree vs Resend) da decidere in Walking Skeleton — tracciata, non bloccante |

**Verdetto US-04**: PASS — Pronto per DESIGN wave

---

## Riepilogo DoR

| Storia | Stato | Note |
|--------|-------|------|
| US-00 Walking Skeleton | PASS | V-04 da decidere in Feature 0 |
| US-01 Hero | PASS | Contenuto da validare con Christian |
| US-02 About | PASS | Testo da produrre con Christian in DESIGN |
| US-03 Projects | PASS con nota | Valutare split; V-02 e V-03 da risolvere |
| US-04 Contact | PASS | V-04 dipendenza condivisa con US-00 |

**Verdetto complessivo**: Tutte le storie passano il DoR.
**Handoff DESIGN wave**: Autorizzato.

---

## Variabili Aperte Prima del Go-Live

Queste variabili non bloccano il handoff a DESIGN wave ma devono essere risolte prima della pubblicazione.

| ID | Variabile | Owner | Urgenza |
|----|-----------|-------|---------|
| V-01 | Cognome esatto per il dominio | Christian | Prima dell'acquisto dominio |
| V-02 | Spiegazione range €100-160/mese (Azure) | Christian | Prima di scrivere il case study |
| V-03 | Numero risorse post-migrazione Azure | Christian | Prima di scrivere il case study |
| V-04 | Scelta Formspree vs Resend | Christian + DESIGN wave | In Feature 0 (Walking Skeleton) |
| V-05 | Data di lancio target | Christian | Prima di iniziare DESIGN wave — evita perfezionismo senza deadline |
