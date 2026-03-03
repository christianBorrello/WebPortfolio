Feature: Experience Content -- Placeholder YAML and i18n messages
  As the experience timeline component,
  I need structured content files for EN and IT locales,
  so that the timeline can render work, education, and project entries.

  Background:
    Given the experience content files exist

  Scenario: EN experience YAML contains all three entry types
    When the experience loader reads the EN locale
    Then it returns at least 1 work entry
    And it returns at least 1 education entry
    And it returns at least 1 project entry
    And every entry has a non-empty title, description, and period

  Scenario: IT experience YAML contains the same entry types
    When the experience loader reads the IT locale
    Then it returns at least 1 work entry
    And it returns at least 1 education entry
    And it returns at least 1 project entry
    And every entry has a non-empty title, description, and period

  Scenario: Work entry references existing project slugs
    When the experience loader reads the EN locale
    Then at least one work entry has relatedProjects
    And every relatedProjects slug matches an existing project file

  Scenario: i18n messages contain all required keys for EN
    When the EN experience messages are loaded
    Then the messages contain keys: heading, subtext, type_work, type_education, type_project, present, read_case_study

  Scenario: i18n messages contain all required keys for IT
    When the IT experience messages are loaded
    Then the messages contain keys: heading, subtext, type_work, type_education, type_project, present, read_case_study
