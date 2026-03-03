Feature: Contact Section -- Low-Friction Conversation Starter
  As Marco, a recruiter who is now convinced,
  I want to send a quick message proposing an interview,
  without filling in unnecessary fields or making an implicit commitment.

  As Giulia, a freelance client exploring a collaboration,
  I want to describe my problem and see if there is mutual interest,
  without feeling like I am entering a sales funnel.

  Background:
    Given a visitor navigates to the contact section

  # --- Walking skeleton: simplest user journey with observable value ---

  @walking-skeleton
  Scenario: Visitor sends a message and sees confirmation
    Given the visitor enters "visitor@example.com" as their email
    When the visitor clicks "Send message"
    Then the visitor sees "Message sent. I'll get back to you within a few days."

  # --- Form structure and copy ---

  @milestone-1
  Scenario: Contact form has exactly three fields
    When the visitor sees the contact form
    Then the form has a name field that is optional
    And the form has an email field that is required
    And the form has a message field that is optional
    And the form has no additional fields beyond these three

  @milestone-1
  Scenario: Headline and subtext welcome both recruiters and collaborators
    When the visitor reads the contact section headline
    Then the headline is conversational, such as "Let's talk"
    And the subtext mentions openness to both employment and collaboration

  # --- Form validation (error paths) ---

  @milestone-1
  Scenario: Submitting without email shows a clear error
    Given the visitor has typed a message but left the email field empty
    When the visitor clicks "Send message"
    Then the email field is highlighted with an error
    And the error message is in plain language
    And the message the visitor typed is not lost

  @milestone-1
  Scenario: Submitting an invalid email format shows an error
    Given the visitor has entered "not-an-email" in the email field
    When the visitor clicks "Send message"
    Then the email field shows a format validation error
    And no submission is sent to the external service

  # --- Form submission (happy paths) ---

  @milestone-1
  Scenario: Marco sends a message with only his email
    Given Marco enters "marco@recruiting.com" as his email
    And Marco does not fill in the name or message fields
    When Marco clicks "Send message"
    Then the form is submitted successfully
    And Marco sees "Message sent. I'll get back to you within a few days."

  @milestone-1
  Scenario: Giulia sends a complete message with all fields
    Given Giulia enters "Giulia Marchetti" as her name
    And Giulia enters "giulia@startup.io" as her email
    And Giulia enters a detailed message describing her project
    When Giulia clicks "Send message"
    Then the form is submitted successfully
    And Giulia sees the success confirmation message

  # --- Submission feedback ---

  @milestone-1
  Scenario: Submit button shows progress while sending
    Given the visitor enters "visitor@example.com" as their email
    When the visitor clicks "Send message"
    Then the submit button shows "Sending..." while the message is being delivered

  @milestone-1
  Scenario: Form is cleared after successful submission
    Given the visitor enters "Visitor" as their name
    And the visitor enters "visitor@example.com" as their email
    And the visitor enters "Hello there" as their message
    When the visitor clicks "Send message"
    Then the form is submitted successfully
    And the form fields are cleared

  # --- Error recovery ---

  @milestone-1
  Scenario: Submission failure preserves the visitor's input
    Given the visitor has filled in all three fields
    And the form submission service is temporarily unavailable
    When the visitor clicks "Send message"
    Then the visitor sees an error message indicating the submission failed
    And all previously entered data remains in the form fields
    And the visitor can retry without re-entering their information

  @milestone-1
  Scenario: Network interruption shows a friendly error
    Given the visitor enters "visitor@example.com" as their email
    And the network connection is lost
    When the visitor clicks "Send message"
    Then the visitor sees an error message indicating the submission failed
    And all previously entered data remains in the form fields

  # --- Miscellaneous ---

  @milestone-1
  Scenario: No CAPTCHA is shown in version one
    When the visitor views the contact form
    Then no CAPTCHA challenge is visible
