Feature: Hero Section -- Professional Identity in 30 Seconds
  As Marco, a technical recruiter evaluating 15-20 profiles per week,
  I need to understand who the owner is within the first few seconds,
  so that I can decide whether to keep reading or move on.

  Background:
    Given Marco navigates to the portfolio homepage

  # --- Milestone 1 scenarios ---

  @milestone-1
  Scenario: Identity statement breaks the generic portfolio pattern
    When Marco reads the hero section
    Then he sees a primary statement that does not contain "passionate", "results-driven", or "experienced"
    And he sees a supporting line that names the systems-thinking differentiator
    And he does not see a list of technologies in the hero

  @milestone-1
  Scenario: Clear calls to action guide the visitor forward
    When Marco reads the hero section
    Then he sees a call to action labeled "View my work"
    And he sees a call to action labeled "Get in touch"
    And "View my work" scrolls to the projects section
    And "Get in touch" scrolls to the contact section

  @milestone-1
  Scenario: Hero displays the owner's name and role
    When Marco reads the hero section
    Then he sees the owner's name
    And he sees the role "Software Engineer"

  @milestone-1
  Scenario: Hero text is fully localized
    When Marco views the hero section
    Then every visible string comes from the hero translation file
    And no text is hardcoded directly in the hero section
