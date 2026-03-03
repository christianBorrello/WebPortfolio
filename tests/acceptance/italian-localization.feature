Feature: Italian Localization -- Full Italian Experience for Visitors
  As an Italian-speaking visitor arriving at the portfolio,
  I need all interface text and case study content available in Italian,
  so that I can evaluate Christian's work in my native language.

  # --- Walking skeleton: simplest proof that Italian locale works ---

  @italian-localization @walking-skeleton
  Scenario: Italian homepage displays navigation in Italian
    Given a visitor navigates to the Italian homepage
    Then the navigation shows "Esperienze" instead of "Experience"
    And the navigation shows "Contatti" instead of "Contact"
    And the navigation shows "Chi sono" instead of "About"

  # --- AC 1: Italian UI text across the homepage ---

  @italian-localization
  Scenario: Hero section displays Italian text
    Given a visitor navigates to the Italian homepage
    When the visitor reads the hero section
    Then the hero displays the name "Christian Borrello"
    And the hero displays the role in Italian
    And the call to action labels are in Italian

  @italian-localization
  Scenario: About section displays Italian text
    Given a visitor navigates to the Italian homepage
    When the visitor reads the about section
    Then the about heading is in Italian
    And the about content is in Italian, not English

  @italian-localization
  Scenario: Contact section displays Italian text
    Given a visitor navigates to the Italian homepage
    When the visitor reads the contact section
    Then the contact heading is in Italian
    And the form field labels are in Italian
    And the submit button label is in Italian

  @italian-localization
  Scenario: Footer displays Italian text
    Given a visitor navigates to the Italian homepage
    Then the footer text is in Italian

  @italian-localization
  Scenario: All visible text on the Italian homepage originates from Italian locale files
    Given a visitor navigates to the Italian homepage
    When every visible text element is inspected
    Then no English-only text appears on the page
    And all visible text originates from the Italian translation files

  # --- AC 2: Italian project content ---

  @italian-localization
  Scenario: Project cards display Italian hooks and labels
    Given a visitor navigates to the Italian homepage
    When the visitor views the projects section
    Then the projects heading is in Italian
    And the project card hooks are in Italian
    And the "Read case study" links use Italian text

  @italian-localization
  Scenario: SagitterHub case study displays Italian content
    Given a visitor navigates to the Italian SagitterHub case study
    Then the case study title is "SagitterHub"
    And the case study hook is in Italian
    And the section headings use Italian labels
    And the section prose is in Italian, not English

  @italian-localization
  Scenario: SagitterHub case study metrics are displayed on the Italian page
    Given a visitor navigates to the Italian SagitterHub case study
    Then the visitor sees a metric with value ">90%" for code coverage

  # --- AC 3: Language switcher ---

  @italian-localization
  Scenario: Language switcher is visible on the Italian homepage
    Given a visitor navigates to the Italian homepage
    Then the visitor sees a language switcher showing "EN"

  @italian-localization
  Scenario: Language switcher is visible on the English homepage
    Given a visitor navigates to the English homepage
    Then the visitor sees a language switcher showing "IT"

  @italian-localization
  Scenario: Switching from Italian to English on the homepage
    Given a visitor is on the Italian homepage
    When the visitor clicks the language switcher
    Then the visitor is on the English homepage
    And the navigation shows "Experience" instead of "Esperienze"

  @italian-localization
  Scenario: Switching from English to Italian on the homepage
    Given a visitor is on the English homepage
    When the visitor clicks the language switcher
    Then the visitor is on the Italian homepage
    And the navigation shows "Esperienze" instead of "Experience"

  @italian-localization
  Scenario: Language switcher preserves current page on case study
    Given a visitor is reading the English SagitterHub case study
    When the visitor clicks the language switcher
    Then the visitor is on the Italian SagitterHub case study
    And the case study content is in Italian

  @italian-localization
  Scenario: Language switcher preserves current page on contact
    Given a visitor is on the English contact page
    When the visitor clicks the language switcher
    Then the browser URL contains "/it"

  # --- Error paths and edge cases ---

  @italian-localization
  Scenario: Italian contact form submission shows Italian success message
    Given a visitor navigates to the Italian homepage
    And the visitor fills in the contact form with a valid email
    When the visitor submits the contact form
    Then the visitor sees the success confirmation in Italian

  @italian-localization
  Scenario: Italian contact form validation shows Italian error message
    Given a visitor navigates to the Italian homepage
    And the visitor enters an invalid email in the contact form
    When the visitor submits the contact form
    Then the visitor sees the email validation error in Italian

  @italian-localization
  Scenario: Navigating directly to an Italian project URL works
    When a visitor navigates directly to "/it/projects/sagitterhub"
    Then the page loads without errors
    And the case study content is in Italian

  @italian-localization
  Scenario: Italian and English pages have equivalent structure
    Given a visitor navigates to the English homepage
    And the visitor counts the number of sections
    When the visitor navigates to the Italian homepage
    Then the Italian page has the same number of sections as the English page
