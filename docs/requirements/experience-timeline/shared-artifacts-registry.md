# Shared Artifacts Registry -- Experience Timeline

## Scopo

Registro degli artefatti condivisi tra i vari step dei journey (recruiter e hiring manager) e tra i componenti del sistema. Ogni variabile che appare in un mockup o in uno scenario deve avere una fonte documentata qui.

---

## Artefatti Dati

### 1. Entry Timeline (dati YAML)

| Campo | Fonte | Consumato da | Note |
|-------|-------|-------------|------|
| `entry.type` | `content/experience/{locale}.yaml` | `TimelineEntry` component (badge + icona) | Valori: "work", "education", "project" |
| `entry.title` | `content/experience/{locale}.yaml` | `TimelineEntry` component (titolo) | Per work: ruolo. Per education: titolo di studio. Per project: nome progetto |
| `entry.organization` | `content/experience/{locale}.yaml` | `TimelineEntry` component (sottotitolo) | Solo per work e education. Non presente per project |
| `entry.period.start` | `content/experience/{locale}.yaml` | `TimelineEntry` component (periodo) | Formato: anno ("2022") |
| `entry.period.end` | `content/experience/{locale}.yaml` | `TimelineEntry` component (periodo) | `null` = "Present"/"Presente" (da i18n label) |
| `entry.description` | `content/experience/{locale}.yaml` | `TimelineEntry` component (testo) | 1 riga. Per project: spiega il PERCHE', non il COSA |
| `entry.highlights` | `content/experience/{locale}.yaml` | `TimelineEntry` component (lista opzionale) | Solo per work. Risultati concreti |
| `entry.technologies` | `content/experience/{locale}.yaml` | `TimelineEntry` component (tech tags) | Per work e project. Non per education |
| `entry.relatedProjects` | `content/experience/{locale}.yaml` | `ProjectCard` component (card annidate) | Solo per work. Array di slug che risolvono a `content/projects/{locale}/{slug}.yaml` |
| `entry.projectSlug` | `content/experience/{locale}.yaml` | Link "Read case study" | Solo per project. Slug singolo che risolve a `content/projects/{locale}/{slug}.yaml` |

### 2. Project Summary (per card inline nelle work entry)

| Campo | Fonte | Consumato da | Note |
|-------|-------|-------------|------|
| `project.slug` | `content/projects/{locale}/{slug}.yaml` | Link href (`/projects/{slug}`) | Riusato dal loader esistente |
| `project.title` | `content/projects/{locale}/{slug}.yaml` | `ProjectCard` component (titolo) | Riusato dal componente esistente |
| `project.hook` | `content/projects/{locale}/{slug}.yaml` | `ProjectCard` component (descrizione) | Riusato dal componente esistente |
| `project.type` | `content/projects/{locale}/{slug}.yaml` | `ProjectCard` component (badge) | Riusato dal componente esistente |
| `project.tags` | `content/projects/{locale}/{slug}.yaml` | `ProjectCard` component (tag) | Riusato dal componente esistente |
| `project.metrics` | `content/projects/{locale}/{slug}.yaml` | `ProjectCard` component (metriche) | Riusato dal componente esistente |

### 3. Labels UI (i18n)

| Chiave | Fonte EN | Fonte IT | Consumato da |
|--------|----------|----------|-------------|
| `experience.heading` | `messages/en/experience.json` | `messages/it/experience.json` | Section heading |
| `experience.subtext` | `messages/en/experience.json` | `messages/it/experience.json` | Section subtext |
| `experience.type_work` | `messages/en/experience.json` | `messages/it/experience.json` | Badge tipo "Work"/"Lavoro" |
| `experience.type_education` | `messages/en/experience.json` | `messages/it/experience.json` | Badge tipo "Education"/"Formazione" |
| `experience.type_project` | `messages/en/experience.json` | `messages/it/experience.json` | Badge tipo "Project"/"Progetto" |
| `experience.present` | `messages/en/experience.json` | `messages/it/experience.json` | Label per periodo in corso "Present"/"Presente" |
| `experience.read_case_study` | `messages/en/experience.json` | `messages/it/experience.json` | Link nei project entry |
| `common.nav.experience` | `messages/en/common.json` | `messages/it/common.json` | Voce di navigazione (sostituisce "projects"/"progetti") |
| `common.nav.back_to_experience` | `messages/en/common.json` | `messages/it/common.json` | Link ritorno dal case study (sostituisce "back_to_projects") |

---

## Artefatti di Navigazione

### 4. Ancora sezione

| Artefatto | Valore attuale | Nuovo valore | File interessati |
|-----------|---------------|-------------|------------------|
| Section ID | `#projects` | `#experience` | `page.tsx`, `navigation.tsx`, `hero.json` (CTA link) |
| Nav link key | `projects` | `experience` | `navigation.tsx` NAV_LINKS |
| Nav label EN | "Projects" | "Experience" | `messages/en/common.json` |
| Nav label IT | "Progetti" | "Esperienze" | `messages/it/common.json` |
| Back link target | `/#projects` | `/#experience` | `navigation.tsx` (showBackLink href) |
| Back link label EN | "Back to projects" | "Back to experience" | `messages/en/common.json` |
| Back link label IT | "Torna ai progetti" | "Torna alle esperienze" | `messages/it/common.json` |

### 5. Hero CTA target

| Artefatto | Valore attuale | Nuovo valore | Note |
|-----------|---------------|-------------|------|
| "View my work" href | `#projects` (da verificare) | `#experience` | Verificare se il CTA e' hardcoded o segue una chiave i18n |

---

## Artefatti Componente

### 6. Componenti riusati (invariati)

| Componente | Path | Ruolo nella timeline | Modifiche necessarie |
|-----------|------|---------------------|---------------------|
| `ProjectCard` | `src/features/projects/project-card.tsx` | Card annidata dentro work entry | Nessuna (riusato as-is) |
| `CaseStudyLayout` | `src/features/projects/case-study-layout.tsx` | Pagina case study | Nessuna |
| Case study page | `src/app/[locale]/projects/[slug]/page.tsx` | Pagina dettaglio progetto | Nessuna |
| Content loader | `src/shared/lib/content-loader.ts` | Caricamento dati progetti per le card | Nessuna |

### 7. Componenti nuovi

| Componente | Path pianificato | Dipende da |
|-----------|-----------------|-----------|
| `ExperienceTimeline` | `src/features/experience/experience-timeline.tsx` | `TimelineEntry`, `ProjectCard`, dati YAML, hook scroll |
| `TimelineEntry` | `src/features/experience/timeline-entry.tsx` | Tipo entry (3 varianti visive), dati YAML |
| `useScrollReveal` | custom hook (dentro experience o shared) | Intersection Observer API |
| `experience-loader` | `src/shared/lib/experience-loader.ts` | `content/experience/{locale}.yaml`, tipi |

### 8. File dati nuovi

| File | Scopo | Schema |
|------|-------|--------|
| `content/experience/en.yaml` | Dati timeline in inglese | `ExperienceData` (array di `TimelineEntry`) |
| `content/experience/it.yaml` | Dati timeline in italiano | `ExperienceData` (array di `TimelineEntry`) |
| `src/shared/types/experience.ts` | Tipi TypeScript per timeline entry | `TimelineEntryType`, `TimelineEntry`, `ExperienceData` |
| `messages/en/experience.json` | Labels UI inglese | Heading, subtext, type labels, present, read_case_study |
| `messages/it/experience.json` | Labels UI italiano | Heading, subtext, type labels, present, read_case_study |

---

## Checkpoint di Integrazione

| ID | Descrizione | Validazione |
|----|------------|------------|
| IC-1 | YAML -> Timeline | Ogni entry nel YAML appare nella timeline con tutti i campi |
| IC-2 | relatedProjects -> ProjectCard | Ogni slug in relatedProjects corrisponde a un file YAML di progetto |
| IC-3 | projectSlug -> Case study page | Ogni projectSlug nelle project entry porta alla pagina corretta |
| IC-4 | Nav anchor | Click su "Experience" in nav scrolla alla sezione #experience |
| IC-5 | Back link | "Back to experience" dal case study porta a /#experience |
| IC-6 | Hero CTA | "View my work" scrolla a #experience |
| IC-7 | i18n | Tutti i label cambiano correttamente con il language switcher |
| IC-8 | prefers-reduced-motion | Animazione disabilitata quando la preferenza e' attiva |

---

## Variabili nei Mockup -- Tracciabilita'

Ogni variabile che appare nei mockup ASCII dei journey map ha una fonte documentata:

| Variabile nel mockup | Fonte |
|---------------------|-------|
| "Experience" (heading) | `messages/{locale}/experience.json` -> `heading` |
| "Senior Software Engineer" | `content/experience/{locale}.yaml` -> `entries[0].title` |
| "Sagitter S.p.A." | `content/experience/{locale}.yaml` -> `entries[0].organization` |
| "2022 - Present" | `entries[0].period.start` + `experience.present` label |
| ".NET React Azure DDD CQRS" | `content/experience/{locale}.yaml` -> `entries[0].technologies` |
| "SagitterHub" (card) | `content/projects/{locale}/sagitterhub.yaml` -> `title` |
| "Enterprise platform built right..." (card hook) | `content/projects/{locale}/sagitterhub.yaml` -> `hook` |
| "Read case study" | `messages/{locale}/experience.json` -> `read_case_study` |
| "WORK" / "PROJECT" / "EDUCATION" badge | `messages/{locale}/experience.json` -> `type_work`, `type_project`, `type_education` |
| "Unity Soulslike Game" | `content/experience/{locale}.yaml` -> `entries[N].title` |
| "2023" | `content/experience/{locale}.yaml` -> `entries[N].period.start` |
| "Game dev as a learning domain" | `content/experience/{locale}.yaml` -> `entries[N].description` |
| "Back to experience" | `messages/{locale}/common.json` -> `nav.back_to_experience` |
