# language: en
Feature: Experience Timeline on Homepage
  As a visitor to Christian Borrello's portfolio
  I want to see a unified timeline of work experience, education, and personal projects
  So that I can understand his professional trajectory without clicking into individual pages

  Background:
    Given the homepage has an Experience section replacing the old Projects grid
    And the Experience section contains timeline entries in reverse chronological order
    And there are 3 types of entries: work, education, and project

  # ─────────────────────────────────────────────────────────
  # Recruiter Journey: Scan and Classify
  # ─────────────────────────────────────────────────────────

  Scenario: Marco sees the professional trajectory at a glance
    Given Marco Ferretti is a technical recruiter evaluating candidates
    And he lands on Christian's homepage from a LinkedIn link
    When he scrolls to the Experience section
    Then he sees the section heading "Experience"
    And the first visible entry shows "Senior Software Engineer" at "Sagitter S.p.A." from "2022" to "Present"
    And the entry displays technology tags including ".NET", "React", "Azure"
    And Marco can identify role, company, and duration without clicking anything

  Scenario: Marco sees project cards nested under a work entry
    Given Marco is viewing the Experience section
    When he looks at the Senior Software Engineer entry at Sagitter S.p.A.
    Then he sees project cards for "SagitterHub" and "Azure Infrastructure Consolidation" nested under that entry
    And each project card shows the project hook and a "Read case study" link
    And the cards are visually subordinate to the work entry (indented, different background)

  Scenario: Marco distinguishes entry types visually
    Given Marco is scrolling through the Experience timeline
    When he scans the entries
    Then work entries have a distinct visual marker and "Work" badge
    And education entries have a distinct visual marker and "Education" badge
    And project entries have a distinct visual marker and "Project" badge
    And Marco can identify the type of each entry without reading the content

  Scenario: Marco classifies the candidate in under 30 seconds
    Given Marco has scrolled through the entire Experience timeline
    Then he has seen the work experience with role, company, and duration
    And he has seen the technology breadth across work and personal projects
    And he has seen the education background
    And he can classify Christian's seniority and trajectory without opening any case study

  # ─────────────────────────────────────────────────────────
  # Hiring Manager Journey: Read and Evaluate
  # ─────────────────────────────────────────────────────────

  Scenario: Laura reads the timeline as a coherent narrative
    Given Laura Chen is an engineering manager evaluating candidates in depth
    And she lands on Christian's homepage
    When she scrolls through the Experience section from top to bottom
    Then she sees the professional trajectory from education through current role
    And the timeline tells a story of growth from university to enterprise architecture
    And personal projects show intellectual curiosity beyond the day job

  Scenario: Laura navigates from timeline to case study and back
    Given Laura is viewing the Experience section
    When she clicks "Read case study" on the SagitterHub project card
    Then she lands on the SagitterHub case study page
    And the navigation shows a "Back to experience" link
    When she clicks "Back to experience"
    Then she returns to the homepage at the Experience section
    And she does not land at the top of the page

  Scenario: Laura reads a personal project case study from the timeline
    Given Laura is viewing the Experience section
    When she sees the Unity Soulslike Game entry with type "Project"
    Then the entry shows a one-line description explaining WHY, not just WHAT
    And the entry shows a "Read case study" link
    When she clicks "Read case study"
    Then she lands on the Unity Soulslike Game case study page

  # ─────────────────────────────────────────────────────────
  # Timeline Content and Structure
  # ─────────────────────────────────────────────────────────

  Scenario: Timeline entries are ordered in reverse chronological order
    Given the Experience section is loaded with all entries
    Then the entries are ordered from most recent to oldest
    And the first entry is the current work position
    And the last entry is the earliest education record
    And all entry types (work, education, project) are interleaved chronologically

  Scenario: Work entry shows all required fields
    Given the Experience section contains a work entry for "Senior Software Engineer"
    Then the entry displays the role title "Senior Software Engineer"
    And the entry displays the organization "Sagitter S.p.A."
    And the entry displays the period "2022 - Present"
    And the entry displays a one-line description
    And the entry displays technology tags
    And the entry displays nested project cards for related case studies

  Scenario: Education entry shows all required fields
    Given the Experience section contains an education entry
    Then the entry displays the degree or certification title
    And the entry displays the institution name
    And the entry displays the period
    And the entry displays a one-line description
    And the entry does not display project cards or case study links

  Scenario: Project entry shows all required fields
    Given the Experience section contains a project entry for "Unity Soulslike Game"
    Then the entry displays the project title "Unity Soulslike Game"
    And the entry displays the period "2023"
    And the entry displays a one-line description explaining the motivation
    And the entry displays technology tags
    And the entry displays a "Read case study" link

  # ─────────────────────────────────────────────────────────
  # Scroll-Driven Animation
  # ─────────────────────────────────────────────────────────

  Scenario: Entries reveal progressively as the user scrolls
    Given the Experience section has multiple entries
    When the user scrolls down the page
    Then entries that enter the viewport become visible with a fade-in animation
    And entries that have not yet entered the viewport remain hidden
    And each entry has a slight stagger delay after the previous one

  Scenario: Animation respects reduced motion preferences
    Given the user has enabled "prefers-reduced-motion" in their OS settings
    When the Experience section loads
    Then all entries are immediately visible without animation
    And no fade-in or translate transitions are applied

  # ─────────────────────────────────────────────────────────
  # Navigation Integration
  # ─────────────────────────────────────────────────────────

  Scenario: Navigation links updated from Projects to Experience
    Given the user is on the homepage
    Then the navigation bar shows "Experience" instead of "Projects"
    And clicking "Experience" in the nav scrolls to the Experience section
    And the section anchor is "#experience"

  Scenario: Hero CTA links to Experience section
    Given the user is on the homepage
    When the user clicks "View my work" in the hero section
    Then the page scrolls to the Experience section
    And the anchor "#experience" is activated

  Scenario: Case study page shows back link to Experience
    Given the user is on a case study page for "SagitterHub"
    Then the navigation shows "Back to experience" instead of "Back to projects"
    And clicking it navigates to the homepage Experience section

  # ─────────────────────────────────────────────────────────
  # Internationalization
  # ─────────────────────────────────────────────────────────

  Scenario: Timeline content displays in English
    Given the user visits the English version of the homepage
    When the Experience section loads
    Then the heading shows "Experience"
    And entry descriptions are in English
    And type badges show "Work", "Education", "Project"
    And the "Read case study" links are in English

  Scenario: Timeline content displays in Italian
    Given the user visits the Italian version of the homepage
    When the Experience section loads
    Then the heading shows "Esperienze"
    And entry descriptions are in Italian
    And type badges show "Lavoro", "Formazione", "Progetto"
    And the "Read case study" links are in Italian

  Scenario: Language switcher preserves position on Experience section
    Given the user is viewing the Experience section in English
    When the user switches to Italian using the language switcher
    Then the page reloads in Italian
    And the Experience section is visible with Italian content

  # ─────────────────────────────────────────────────────────
  # Responsive Behavior
  # ─────────────────────────────────────────────────────────

  Scenario: Timeline is readable on mobile devices
    Given the user is viewing the homepage on a mobile device (width < 768px)
    When the Experience section loads
    Then the timeline displays in a single compact column
    And entry content is not truncated or overlapping
    And project cards inside work entries stack vertically
    And all text remains readable without horizontal scrolling

  # ─────────────────────────────────────────────────────────
  # Accessibility
  # ─────────────────────────────────────────────────────────

  Scenario: Timeline is navigable with keyboard
    Given the user is navigating the homepage with keyboard only
    When they tab through the Experience section
    Then focus moves through interactive elements (case study links, project cards)
    And focus indicators are clearly visible
    And the tab order follows the chronological order of entries

  Scenario: Screen reader announces timeline structure
    Given the user is navigating with a screen reader
    When the Experience section is read
    Then the section heading "Experience" is announced
    And each entry announces its type, title, organization, and period
    And project cards are announced as nested content within work entries
