Feature: Italian Localization Infrastructure -- Build and SEO Validation
  As the site owner,
  I need the build process to generate static pages for both languages
  and the sitemap to include all locale variants,
  so that search engines index both versions and missing content is caught before deployment.

  # --- AC 4: Static generation for both locales ---

  @italian-localization @infrastructure @skip
  Scenario: Build generates static HTML pages for both Italian and English
    Given the site is built with "next build"
    Then the build output contains static pages under "/en"
    And the build output contains static pages under "/it"
    And the build output contains "/en/projects/sagitterhub"
    And the build output contains "/it/projects/sagitterhub"

  @italian-localization @infrastructure @skip
  Scenario: Every English project page has an Italian counterpart
    Given the site is built with "next build"
    Then for every project page under "/en/projects/", a matching page exists under "/it/projects/"

  # --- AC 5: Sitemap contains both locale URLs ---

  @italian-localization @infrastructure @skip
  Scenario: Sitemap includes Italian homepage URL
    When a crawler requests the sitemap
    Then the sitemap contains a URL ending with "/it"
    And the sitemap contains a URL ending with "/en"

  @italian-localization @infrastructure @skip
  Scenario: Sitemap includes Italian project URLs
    When a crawler requests the sitemap
    Then the sitemap contains "/en/projects/sagitterhub"
    And the sitemap contains "/it/projects/sagitterhub"

  @italian-localization @infrastructure @skip
  Scenario: Sitemap includes Italian contact page URL
    When a crawler requests the sitemap
    Then the sitemap contains a URL with "/it/contact"
    And the sitemap contains a URL with "/en/contact"

  # --- AC 6: Build-time validation for missing content ---

  @italian-localization @infrastructure @skip
  Scenario: Missing Italian YAML file causes build failure
    Given the Italian content file for "sagitterhub" is temporarily removed
    When the site build is attempted
    Then the build fails
    And the build error message identifies the missing file

  @italian-localization @infrastructure @skip
  Scenario: Missing Italian YAML file error message is descriptive
    Given the Italian content file for "sagitterhub" is temporarily removed
    When the site build is attempted
    Then the build error message contains "sagitterhub"
    And the build error message contains "it"
