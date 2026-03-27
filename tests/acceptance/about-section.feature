Feature: About Section -- The Human and Professional Layer
  As Marco, a technical recruiter looking for cultural fit,
  and as Giulia, a freelance client looking for reliability,
  we need to understand who the owner is beyond a CV,
  so that we can assess whether he is the kind of person we want to work with.

  Background:
    Given a visitor navigates to the about section

  # --- Milestone 1 scenarios ---

  @milestone-1
  Scenario: ADHD is framed as a functional pattern, not a limitation
    When the visitor reads the about section
    Then the section mentions ADHD
    And the framing includes concepts like curiosity, hyperfocus, or systems vision
    And the framing does not present ADHD as a limitation or apology

  @milestone-1
  Scenario: Technology philosophy is present and authentic
    When the visitor reads the about section
    Then the section contains a statement about choosing technologies based on the problem
    And the statement does not frame technology preferences as comfort-driven

  @milestone-1
  Scenario: Values and what the owner looks for are stated clearly
    When the visitor reads the about section
    Then the section mentions values such as honesty, simplicity, or respect
    And the section describes what the owner looks for in a team or collaboration
    And the section mentions remote-first or ownership

  @milestone-1
  Scenario: Philosophy is present as applied thinking, not academic display
    When the visitor reads the about section
    Then the section references philosophy as a discipline of thought
    And the philosophy content reads as a brief insight, not a lengthy essay

  @milestone-1
  Scenario: About section is not a skills list
    When the visitor reads the about section
    Then the section does not contain a list of technical skills or certifications
    And the section does not explicitly mention an incomplete degree

  @milestone-1
  Scenario: About section is readable in approximately 90 seconds
    When the visitor reads the about section
    Then the section contains between 200 and 400 words
