Feature: Walking Skeleton -- Infrastructure End-to-End
  As the site owner,
  I need the deployment pipeline, contact form, and i18n structure working
  before building any content,
  so that I discover integration problems now, not after the site is built.

  Background:
    Given the portfolio site is deployed and accessible

  # --- Walking Skeleton scenarios (must pass before any feature work) ---

  @walking-skeleton
  Scenario: Site is live and reachable
    When a visitor navigates to the production URL
    Then the page loads without errors
    And the server responds with status 200

  @walking-skeleton
  Scenario: Contact form delivers a message end-to-end
    Given a visitor is on the contact section
    When the visitor enters "test@example.com" as their email
    And the visitor clicks "Send message"
    Then the visitor sees "Message sent. I'll get back to you within a few days."

  @walking-skeleton
  Scenario: All visible text comes from locale files
    When a visitor views the page source
    Then no user-facing text is hardcoded directly in page templates
    And all visible text originates from translation locale files

  @walking-skeleton @skip
  Scenario: Automatic deployment on push to main
    Given the GitHub repository is connected to Vercel
    When a commit is pushed to the main branch
    Then Vercel deploys the updated site within 2 minutes
    And the production URL reflects the change

  @walking-skeleton
  Scenario: Custom domain resolves correctly
    When a visitor navigates to the configured domain
    Then the site loads over HTTPS
    And the browser shows no certificate warnings
