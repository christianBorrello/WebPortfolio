# Definition of Ready -- Validazione Experience Timeline

Data validazione: 2026-03-03

---

## Riepilogo Storie

| ID | Titolo | Scenari | Effort stimato |
|----|--------|---------|---------------|
| US-ET-001 | Timeline sezione homepage | 7 | 2-3 giorni |
| US-ET-002 | Scroll animation reveal | 5 | 1 giorno |
| US-ET-003 | Navigazione experience | 7 | 0.5 giorni |
| US-ET-004 | i18n timeline content | 4 | 0.5 giorni |
| US-ET-005 | Responsive mobile | 5 | 1 giorno |
| US-ET-006 | Accessibilita' timeline | 5 | 1 giorno |

---

## Validazione DoR per Storia

### US-ET-001: Timeline sezione homepage

| # | Criterio | Status | Evidenza |
|---|----------|--------|----------|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "Il recruiter non vede ruolo, azienda, traiettoria. Deve cliccare in ogni card." |
| 2 | Utente/persona identificato con caratteristiche specifiche | PASS | Marco Ferretti (recruiter, 15-20 profili/settimana, 30 secondi) + Laura Chen (eng manager, lettura profonda) |
| 3 | Almeno 3 esempi di dominio con dati reali | PASS | (1) Marco scansiona e classifica, (2) Laura naviga timeline->case study->ritorno, (3) Timeline con 1 sola entry |
| 4 | Scenari UAT in Given/When/Then (3-7) | PASS | 7 scenari UAT |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 9 criteri di accettazione, ciascuno derivato da uno scenario |
| 6 | Story right-sized (1-3 giorni, 3-7 scenari) | PASS | 7 scenari, effort stimato 2-3 giorni |
| 7 | Note tecniche con vincoli e dipendenze | PASS | YAML source, ProjectCard riuso, client/server component split |
| 8 | Dipendenze risolte o tracciate | PASS | YAML da compilare (Christian), ProjectCard esiste, content-loader esiste |

**Risultato: PASS (8/8)**

---

### US-ET-002: Scroll animation reveal

| # | Criterio | Status | Evidenza |
|---|----------|--------|----------|
| 1 | Problema chiaro in linguaggio di dominio | PASS | "Lista statica non guida la lettura. Il recruiter scansiona a caso." |
| 2 | Utente/persona identificato | PASS | Entrambe le persona + utente con prefers-reduced-motion (Anna Rossi) |
| 3 | Almeno 3 esempi con dati reali | PASS | (1) Marco scrolla entry, (2) Laura torna da case study, (3) Anna con reduced motion |
| 4 | Scenari UAT (3-7) | PASS | 5 scenari |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 8 criteri tecnici specifici |
| 6 | Story right-sized | PASS | 5 scenari, effort 1 giorno |
| 7 | Note tecniche | PASS | Intersection Observer, CSS transitions, custom hook, zero dipendenze |
| 8 | Dipendenze | PASS | US-ET-001 (tracciata) |

**Risultato: PASS (8/8)**

---

### US-ET-003: Navigazione experience

| # | Criterio | Status | Evidenza |
|---|----------|--------|----------|
| 1 | Problema chiaro | PASS | "Laura clicca Back to projects e atterra in cima alla homepage. Disconnessione nome/sezione." |
| 2 | Utente/persona identificato | PASS | Laura Chen (avanti-e-indietro timeline/case study), Marco (CTA hero) |
| 3 | Almeno 3 esempi con dati reali | PASS | (1) Marco clicca Experience in nav, (2) Laura torna da case study, (3) Nav in italiano |
| 4 | Scenari UAT (3-7) | PASS | 7 scenari |
| 5 | Criteri di accettazione derivati dagli UAT | PASS | 7 criteri |
| 6 | Story right-sized | PASS | 7 scenari, effort 0.5 giorni (solo modifiche a stringhe e link) |
| 7 | Note tecniche | PASS | File specifici da modificare elencati |
| 8 | Dipendenze | PASS | US-ET-001 (la sezione deve esistere) |

**Risultato: PASS (8/8)**

---

### US-ET-004: i18n timeline content

| # | Criterio | Status | Evidenza |
|---|----------|--------|----------|
| 1 | Problema chiaro | PASS | "Incoerenza linguistica contraddice il messaggio di quality." |
| 2 | Utente/persona identificato | PASS | Marco (recruiter italiano, switch lingue) |
| 3 | Almeno 3 esempi con dati reali | PASS | (1) Visitatore italiano, (2) Switch EN->IT, (3) YAML mancante per una lingua |
| 4 | Scenari UAT (3-7) | PASS | 4 scenari |
| 5 | Criteri di accettazione | PASS | 8 criteri specifici |
| 6 | Story right-sized | PASS | 4 scenari, effort 0.5 giorni |
| 7 | Note tecniche | PASS | Pattern loader, file messaggi, convenzione tag EN |
| 8 | Dipendenze | PASS | US-ET-001, YAML da compilare (Christian) |

**Risultato: PASS (8/8)**

---

### US-ET-005: Responsive mobile timeline

| # | Criterio | Status | Evidenza |
|---|----------|--------|----------|
| 1 | Problema chiaro | PASS | "Timeline illeggibile su 375px. Card debordano, testo si sovrappone." |
| 2 | Utente/persona identificato | PASS | Marco (recruiter in mobilita'), Laura (prima occhiata da telefono) |
| 3 | Almeno 3 esempi con dati reali | PASS | (1) iPhone 15 390px, (2) iPad landscape 1024px, (3) iPhone SE 320px |
| 4 | Scenari UAT (3-7) | PASS | 5 scenari |
| 5 | Criteri di accettazione | PASS | 7 criteri |
| 6 | Story right-sized | PASS | 5 scenari, effort 1 giorno |
| 7 | Note tecniche | PASS | Tailwind breakpoints, flex-wrap, ProjectCard verifica |
| 8 | Dipendenze | PASS | US-ET-001 |

**Risultato: PASS (8/8)**

---

### US-ET-006: Accessibilita' timeline

| # | Criterio | Status | Evidenza |
|---|----------|--------|----------|
| 1 | Problema chiaro | PASS | "Screen reader legge flusso non organizzato. Tab order imprevedibile." |
| 2 | Utente/persona identificato | PASS | Anna Rossi (screen reader), Paolo Bianchi (tastiera), utenti deficit visivi |
| 3 | Almeno 3 esempi con dati reali | PASS | (1) VoiceOver su macOS, (2) Navigazione tastiera, (3) prefers-reduced-motion |
| 4 | Scenari UAT (3-7) | PASS | 5 scenari |
| 5 | Criteri di accettazione | PASS | 8 criteri |
| 6 | Story right-sized | PASS | 5 scenari, effort 1 giorno |
| 7 | Note tecniche | PASS | Struttura HTML semantica, focus-visible, WCAG 2.1 AA |
| 8 | Dipendenze | PASS | US-ET-001, US-ET-002 |

**Risultato: PASS (8/8)**

---

## Riepilogo Validazione

| Storia | DoR | Scenari | Note |
|--------|-----|---------|------|
| US-ET-001 | PASS 8/8 | 7 | Storia principale, dipendenza per tutte le altre |
| US-ET-002 | PASS 8/8 | 5 | Dipende da US-ET-001 |
| US-ET-003 | PASS 8/8 | 7 | Dipende da US-ET-001 |
| US-ET-004 | PASS 8/8 | 4 | Dipende da US-ET-001 |
| US-ET-005 | PASS 8/8 | 5 | Dipende da US-ET-001 |
| US-ET-006 | PASS 8/8 | 5 | Dipende da US-ET-001, US-ET-002 |
| **Totale** | **48/48** | **33** | |

---

## Grafo delle Dipendenze

```
US-ET-001 (Timeline sezione homepage)
    |
    +--- US-ET-002 (Scroll animation)
    |        |
    |        +--- US-ET-006 (Accessibilita')
    |
    +--- US-ET-003 (Navigazione)
    |
    +--- US-ET-004 (i18n)
    |
    +--- US-ET-005 (Responsive)
```

## Ordine di Implementazione Suggerito

1. **US-ET-001** -- Timeline sezione homepage (fondazione)
2. **US-ET-004** -- i18n (YAML e messaggi, necessari per US-ET-001)
3. **US-ET-002** -- Scroll animation
4. **US-ET-003** -- Navigazione
5. **US-ET-005** -- Responsive
6. **US-ET-006** -- Accessibilita' (verifica finale)

Nota: US-ET-001 e US-ET-004 sono in pratica inseparabili (la timeline
non puo' caricare senza i file YAML localizzati). Vanno implementate
insieme o US-ET-004 prima.

---

## Domande Aperte Risolte

| Domanda (dall'idea brief) | Risposta |
|--------------------------|---------|
| Livello di dettaglio nelle entry? | Compatto: titolo, org, periodo, 1 riga di descrizione, tag. Dettagli nei case study. |
| Responsiveness mobile? | Colonna verticale compatta, card impilate, no scroll orizzontale (US-ET-005) |
| Servono filtri per tipo? | No. La timeline mista e' sufficiente. I badge di tipo permettono la scansione visiva. |
| Da dove vengono i dati? | File YAML in `content/experience/{locale}.yaml` (US-ET-004) |
| Migrazione dalla griglia? | Sostituzione diretta. ProjectCard riusata. Link case study invariati. (US-ET-001) |
| Accessibilita'? | prefers-reduced-motion, screen reader, tastiera, contrasto (US-ET-006) |
| Performance Intersection Observer? | Con il numero attuale di entry (6-8), nessun impatto. Revisionare se > 20 entry. |

## Azione Richiesta a Christian

Prima dell'implementazione, Christian deve compilare:
- `content/experience/en.yaml` -- dati reali della timeline in inglese
- `content/experience/it.yaml` -- dati reali della timeline in italiano

I file di esempio (placeholder) verranno creati durante l'implementazione,
ma i dati reali (date, descrizioni, highlights) sono necessari per la verifica.
