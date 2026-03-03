Feature: Projects Section -- Case Studies that Demonstrate Thinking
  As Marco, a technical recruiter who has read the hero and about,
  I need to see concrete proof of Christian's reasoning and initiative,
  so that I can verify the promises made in the earlier sections.

  As Giulia, a freelance client evaluating reliability,
  I need to see measurable business impact and honest reflections,
  so that I can trust Christian with my project.

  Background:
    Given a visitor navigates to the projects section

  # --- Milestone 2: Project cards overview ---

  @milestone-2
  Scenario: Five project cards are displayed
    When the visitor views the project grid
    Then the visitor sees exactly 5 project cards
    And the cards include "SagitterHub", "Azure Infrastructure", "OpenGL Renderer", "iOS Habit Tracker", and "Unity Soulslike"

  @milestone-2
  Scenario: Each card shows a concrete hook, not just a technology list
    When the visitor scans the project cards
    Then every card displays a hook with a metric or a curiosity framing
    And no card consists only of a list of technologies without context

  @milestone-2
  Scenario: Work projects highlight measurable outcomes
    When the visitor reads the SagitterHub card
    Then the card mentions TDD coverage or the architectural approach
    When the visitor reads the Azure Infrastructure card
    Then the card mentions cost savings or the number of cloud resources consolidated

  @milestone-2
  Scenario: Personal projects are framed as active exploration
    When the visitor reads the personal project cards
    Then the OpenGL Renderer card frames the project as low-level curiosity
    And the iOS Habit Tracker card frames the project as exploring a new platform
    And the Unity Soulslike card frames the project as exploring a different domain
    And no personal project card uses apologetic language like "unfinished" or "incomplete"

  @milestone-2
  Scenario: Each card links to a dedicated case study page
    When the visitor clicks "Read case study" on the SagitterHub card
    Then the visitor is taken to the SagitterHub case study page

  # --- Milestone 2: Case study pages ---

  @milestone-2
  Scenario: SagitterHub case study has all eight sections
    Given Marco navigates to the SagitterHub case study
    When he reads the full case study
    Then he sees a section titled "The problem" describing the business problem accessibly
    And he sees a section titled "What I saw" with explicit reasoning
    And he sees a section titled "The decisions" with criteria for architectural choices
    And he sees a section titled "Beyond the assignment" showing initiative
    And he sees a section titled "What didn't work" with at least one honest limitation
    And he sees a section titled "The bigger picture" connecting the work to a larger idea
    And he sees a section titled "For non-specialists" understandable without technical background
    And he sees a "Stack" section listed as an appendix, not as the main content

  @milestone-2
  Scenario: Azure case study shows business impact clearly
    Given Giulia navigates to the Azure Infrastructure case study
    When she reads the case study
    Then she sees the initial monthly cost and the reduced monthly cost in accessible language
    And she sees the reasoning behind choosing infrastructure-as-code for long-term benefit
    And she sees at least one honest reflection on what could have been done differently
    And she does not encounter unexplained cloud jargon

  @milestone-2
  Scenario: Case study page has navigation back to projects
    Given a visitor is reading the SagitterHub case study
    When the visitor wants to return to the projects overview
    Then the visitor can navigate back to the projects section

  @milestone-2
  Scenario: Non-specialist section is genuinely accessible
    Given a non-technical visitor navigates to the OpenGL Renderer case study
    When they read the "For non-specialists" section
    Then the explanation uses everyday analogies without technical jargon
