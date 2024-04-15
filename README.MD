# Contact Status Change Email Notification Workflow

## Overview

This document outlines the workflow created in Zoho CRM to send an email notification when a Contact's status changes from "Waiting" to "Live".

## Purpose

The purpose of this workflow is to notify the careers team via email whenever a contact becomes 'live' in the system, indicating a new or updated engagement that needs attention.

## Workflow Details

- **Module**: Contacts
- **Trigger**: Field update on the Status field.
- **Criteria**: Status changes from "Waiting" to "Live".
- **Action**: Send an email notification.

## Email Notification Details

- **To**: careers@plentify.io
- **From**: [Your Email Address]
- **Subject**: `{{Contact Name}} is live!`
- **Body**: This is a test email from [Your Name]'s workflow automation task.

## How to Trigger the Workflow

1. Navigate to the Contacts module.
2. Create a new contact or update an existing one.
3. Change the status of the contact to "Waiting".
4. Update the status from "Waiting" to "Live".
5. The workflow triggers, sending an email to the specified address.

## Testing

Test the workflow by following the 'How to Trigger' section above. Ensure that emails are received as expected when a contact's status changes to "Live".

## Additional Notes

- Ensure that email templates and sending capabilities are correctly configured in your Zoho CRM settings.
- Adjust the email subject or body as necessary to fit the specific needs or branding of your organization.
