# Feature: Personal Portfolio CV Site
# Christian Borrello — journey-portfolio.feature
# Language: en
# Wave: DISCUSS — 2026-03-01

Feature: Portfolio site communicates Christian's professional identity to both target personas

  Background:
    Given the portfolio site is live at a .dev domain
    And the site is served in English
    And all pages load in under 2 seconds on a standard connection


  # ─────────────────────────────────────────────────────────────
  # WALKING SKELETON — Feature 0
  # ─────────────────────────────────────────────────────────────

  Scenario: Walking skeleton is deployed end-to-end
    Given a Next.js project is initialised with i18n-ready structure
    And the project is connected to a Git repository
    When a developer pushes a commit to the main branch
    Then Vercel automatically deploys the change
    And the production URL returns a 200 response
    And the placeholder page is visible with no build errors
    And the custom .dev domain resolves to the deployed site

  Scenario: Contact form is wired end-to-end in the walking skeleton
    Given the placeholder page includes a minimal contact form
    And the form is connected to an external service (Formspree or Resend)
    When a visitor submits the form with a valid email address
    Then the submission is received by the external service
    And Christian receives a notification
    And the visitor sees a success confirmation message


  # ─────────────────────────────────────────────────────────────
  # HERO SECTION
  # ─────────────────────────────────────────────────────────────

  Scenario: Recruiter Marco reads the hero and decides to continue
    Given Marco Ferretti lands on the portfolio homepage
    And he has 5 seconds before deciding to leave or continue
    When he reads the hero section
    Then he sees a primary statement that breaks the generic portfolio pattern
    And he sees a secondary line that names the systems-thinking differentiator
    And he sees a clear CTA to view the work
    And he does not see a list of technologies in the hero

  Scenario: Hero establishes tone that carries through the whole site
    Given any visitor lands on the homepage
    When they read the hero section
    Then the tone is direct, honest, and non-generic
    And the tone is consistent with the About section
    And the tone is consistent with the Contact section


  # ─────────────────────────────────────────────────────────────
  # ABOUT SECTION
  # ─────────────────────────────────────────────────────────────

  Scenario: Recruiter Marco understands cultural fit from the About section
    Given Marco has read the hero and scrolled to About
    When he reads the About section
    Then he understands that Christian looks for ownership-driven, remote-first teams
    And he understands that ADHD is framed as a functional pattern, not a limitation
    And he reads the phrase "I choose technologies based on the problem, not based on what I know"
    And he does not read a list of certifications or academic credentials

  Scenario: Freelance client Giulia reads the About and her primary fear is addressed
    Given Giulia Marchetti has read the Projects section first
    And she has arrived at the About section
    When she reads it
    Then she reads content that implies reliability and continuity
    And she reads content that implies honest communication
    And she reads content that implies technology chosen by problem, not by familiarity
    And the same content addresses the recruiter's needs without changing a word

  Scenario: About section includes philosophical and human layer
    Given any visitor reads the About section
    When they finish reading
    Then they understand that Christian reads philosophy as a discipline for thinking
    And they understand his core values include honesty, simplicity, and human dignity
    And they understand his view that courage is often mistaken for luck
    And they do not see the About as a second CV


  # ─────────────────────────────────────────────────────────────
  # PROJECTS SECTION
  # ─────────────────────────────────────────────────────────────

  Scenario: Projects overview shows concrete metrics, not tech lists
    Given any visitor arrives at the Projects section
    When they scan the project cards
    Then each card includes a measurable outcome or a concrete hook
    And the SagitterHub card mentions TDD >90% and architectural approach (via VisureHub module)
    And the Azure migration card mentions €280/month saved and 46 resources
    And no card is a list of technologies without context

  Scenario: SagitterHub case study shows multi-level reasoning
    Given Marco has clicked on the SagitterHub case study
    When he reads the full case study
    Then he reads the business problem explained in plain language
    And he reads the explicit reasoning behind the Hexagonal Architecture choice
    And he reads the criteria used to select DDD, CQRS, and Event Sourcing
    And he reads what Christian did beyond what was assigned
    And he reads honest limitations and what Christian would do differently
    And he reads a "bigger picture" section connecting the technical to the philosophical
    And he reads a section that explains the project for someone who doesn't code

  Scenario: Azure migration case study addresses freelance client's primary fear
    Given Giulia has clicked on the Azure Infrastructure case study
    When she reads it
    Then she reads the business problem without technical jargon
    And she reads the measurable result: €280/month saved
    And she reads the reasoning behind Terraform IaC as a long-term decision
    And she reads what Christian would do differently — demonstrating honesty over self-promotion
    And she finishes reading with reduced fear of hiring a freelancer she doesn't know

  Scenario: Personal projects are framed as active technical exploration
    Given any visitor views the personal projects section
    When they read the framing of each personal project
    Then OpenGL Renderer is presented as curiosity-driven low-level exploration
    And iOS Habit Tracker is presented as problem-driven technology choice outside comfort zone
    And Unity Soulslike is presented as domain exploration beyond the engineering stack
    And no personal project is labelled "unfinished" or presented apologetically


  # ─────────────────────────────────────────────────────────────
  # CONTACT SECTION
  # ─────────────────────────────────────────────────────────────

  Scenario: Contact form is low-friction for both personas
    Given any visitor arrives at the Contact section
    When they look at the form
    Then they see at most three fields: name, email, message
    And only the email field is required
    And the headline is conversational, not transactional
    And the subtext makes clear that both employment and freelance conversations are welcome
    And the CTA is "Send message" or equivalent — no implied commitment

  Scenario: Marco submits a contact message as a recruiter
    Given Marco has read the SagitterHub case study and decided to reach out
    When he fills in his email and a short message
    And he clicks "Send message"
    Then he sees a success confirmation in plain language
    And the confirmation does not contain marketing language
    And Christian receives the message with Marco's email

  Scenario: Giulia submits a contact message as a freelance client
    Given Giulia has read both Projects and About and decided to reach out
    When she fills in her name, email, and a description of her project
    And she clicks "Send message"
    Then she sees the same success confirmation as any other visitor
    And Christian receives the message with Giulia's email and project description

  Scenario: Contact form shows clear error when email is missing
    Given a visitor has started filling in the contact form
    When they click "Send message" without an email address
    Then the form highlights the email field
    And the error message is in plain language
    And the rest of the form data is preserved


  # ─────────────────────────────────────────────────────────────
  # CROSS-CUTTING: CONSISTENCY AND COHERENCE
  # ─────────────────────────────────────────────────────────────

  Scenario: The same content serves both personas without personalisation in v1
    Given both Marco (recruiter) and Giulia (freelance client) visit the site
    When they each read the full site independently
    Then both find the information relevant to their specific context
    And neither is addressed with language that excludes the other
    And the site does not ask them to identify themselves before serving content

  Scenario: i18n architecture is ready from day one even though only English is served
    Given the Next.js project is initialised
    When a developer inspects the codebase
    Then no text content is hardcoded directly in components
    And all user-facing strings are in an external locale file
    And the routing structure supports adding a second language without refactoring

  Scenario: Analytics infrastructure is documented but not implemented in v1
    Given the portfolio site is live
    When a developer inspects the deployed site
    Then no analytics script is loaded
    And the requirements document references Umami self-hosted as iteration 2
    And the site structure does not require changes to add analytics later


  # ─────────────────────────────────────────────────────────────
  # FUTURE FEATURES — Annotated, not in scope for v1
  # ─────────────────────────────────────────────────────────────

  # @v2 @out-of-scope
  # Scenario: Visitor selects their persona at the start of navigation
  #   Given a visitor arrives at the homepage
  #   When they see the persona selection prompt
  #   Then they can identify as "a recruiter" or "someone interested in collaborating"
  #   And the site reorders content to serve their context first
  #   Note: Requires analytics data to validate persona split before building.
  #         Content architecture in v1 must support this without code changes.

  # @v2 @out-of-scope
  # Scenario: Privacy-first analytics tracks 100 unique visits
  #   Given Umami is deployed on Railway or Supabase free tier
  #   When a visitor arrives via any channel
  #   Then the visit is recorded without cookies
  #   And the source is tracked via UTM parameters
  #   And no personal data is sent to third-party servers
