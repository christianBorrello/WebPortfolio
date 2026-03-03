Feature: Infrastructure Quality -- SEO, Performance, and Accessibility
  As a visitor arriving from LinkedIn or a search engine,
  I need the site to load fast, appear correctly in search results,
  and be accessible regardless of how I browse,
  so that my experience reflects the professional quality Christian claims.

  # --- SEO scenarios ---

  @infrastructure @milestone-2  Scenario: Home page has proper meta tags for search engines
    Given a visitor navigates to the homepage
    When search engine metadata is inspected
    Then the page has a title containing "Christian Borrello"
    And the page has a meta description
    And the page has Open Graph tags for LinkedIn sharing
    And the Open Graph title matches the page title

  @infrastructure @milestone-2  Scenario: Case study pages have unique meta tags
    Given a visitor navigates to the SagitterHub case study
    When search engine metadata is inspected
    Then the page title contains "SagitterHub"
    And the meta description differs from the homepage description

  @infrastructure @milestone-2  Scenario: Sitemap is generated and accessible
    When a crawler requests the sitemap
    Then the sitemap is available at /sitemap.xml
    And the sitemap lists the homepage
    And the sitemap lists all five case study pages

  # --- Performance scenarios ---

  @infrastructure @milestone-2  Scenario: Page loads within performance budget
    Given a visitor navigates to the homepage on a standard connection
    When page performance is measured
    Then the Largest Contentful Paint is under 2.5 seconds

  # --- Accessibility scenarios ---

  @infrastructure @milestone-1  Scenario: Heading hierarchy is semantically correct
    Given a visitor navigates to the homepage
    When the heading structure is inspected
    Then there is exactly one h1 element
    And h2 elements follow the h1
    And no heading level is skipped

  @infrastructure @milestone-1  Scenario: Contact form inputs have associated labels
    Given a visitor navigates to the contact section
    When the form markup is inspected
    Then every input field has an associated label element
    And the labels describe the purpose of each field

  @infrastructure @milestone-1  Scenario: Text contrast meets minimum accessibility standards
    Given a visitor navigates to the homepage
    When color contrast is evaluated
    Then all text meets WCAG AA contrast requirements

  # --- Privacy scenarios ---

  @infrastructure @walking-skeleton  Scenario: No tracking cookies or analytics in version one
    Given a visitor navigates to the homepage
    When browser cookies are inspected
    Then no tracking cookies have been set
    And no analytics scripts are loaded on the page

  # --- Navigation scenarios ---

  @infrastructure @milestone-1  Scenario: Navigation links scroll to the correct sections
    Given a visitor is on the homepage
    When the visitor clicks the "Projects" navigation link
    Then the page scrolls to the projects section
    When the visitor clicks the "Contact" navigation link
    Then the page scrolls to the contact section

  @infrastructure @milestone-2  Scenario: Locale routing works correctly
    When a visitor navigates to /en
    Then the homepage loads in English
    When a visitor navigates to the root URL
    Then they are redirected to the English version
