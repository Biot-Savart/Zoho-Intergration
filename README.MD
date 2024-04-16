# Zoho CRM Contact Status Change Notification Workflow

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Workflow Details](#workflow-details)
- [Email Notification Details](#email-notification-details)
- [Cloning the Repository](#cloning-the-repository)
- [Environment Setup](#environment-setup)
- [Triggering the Workflow](#triggering-the-workflow)
- [Running the Scripts](#running-the-scripts)
- [Testing](#testing)
- [FAQs](#faqs)
- [Contributing](#contributing)
- [License](#license)
- [Additional Resources](#additional-resources)

## Overview

This project automates the process of sending email notifications in Zoho CRM when a contact's tagged status changes from "False" to "True". This is particularly useful for teams that need timely updates on contact engagement to ensure prompt responses.

## Prerequisites

- Zoho CRM account with admin access
- Zoho API Access and setup (Setup for this project: [ZOHO_SETUP.MD](https://github.com/Biot-Savart/Zoho-Intergration/blob/main/ZOHO_SETUP.MD))
- Basic knowledge of CRM workflow configuration (Details here: [WORKFLOW_AUTOMATION.MD](https://github.com/Biot-Savart/Zoho-Intergration/blob/main/WORKFLOW_AUTOMATION.MD))
- Node.js installed on your machine to run the scripts

## Workflow Details

[WORKFLOW_AUTOMATION.MD](https://github.com/Biot-Savart/Zoho-Intergration/blob/main/WORKFLOW_AUTOMATION.MD)

- **Module**: Contacts
- **Trigger**: Field update on the Tagged field
- **Criteria**: Tagged status changes from "False" to "True"
- **Action**: Send an email notification and update the contact's status to "Live".

## Email Notification Details

- **To**: careers@plentify.io
- **From**: [Your Email Address]
- **Subject**: `{{Contact Name}} is now live!`
- **Body**: Detailed message about the contact's status change, including next steps.

## Cloning the Repository

To get started with this project, first clone the repository to your local machine:

```bash
git clone https://github.com/Biot-Savart/Zoho-Intergration.git
cd Zoho-Intergration
```

## Environment Setup

Before running the scripts, set up your environment variables:

1. Locate the `example.env` file in the root directory.
2. Rename the file to `.env`.
3. Update the `.env` file with your specific credentials and configuration settings as guided by the comments in the `example.env`.

## Running the Scripts

The repository contains two scripts in the `scripts` folder:

- `tagContacts.js`: Searches and tags contacts in Zoho CRM based on the provided search term and tag.
- `updateModuleField.js`: Updates a field in a Zoho CRM module based on the provided parameters.

Before running these scripts, you must install the necessary dependencies:

```bash
npm install
```

To execute the scripts run the following commands, replacing the placeholders with your actual parameters:

#### Script to set tagged field to true

```bash
node scripts/tagContacts.js <startsWith> [tag]
```

- Example
  ```bash
  node scripts/tagContacts.js J true
  ```

#### Bonus script to update any field from any module

```bash
node scripts/updateModuleField.js <moduleApiName> <searchField> <startsWith> <fieldToUpdate> [newValue]
```

- Example
  ```bash
  node scripts/updateModuleField.js Contacts1 Name Kim Name "Kimberley Clark"
  ```

Ensure that you have configured the necessary API keys and environment variables as required.

## Triggering the Workflow manually

1. Go to the Contacts module in Zoho CRM.
2. Either create a new contact or select an existing one.
3. Change the contact's tagged status to "False".
4. Further update the status to "True".
5. The system will automatically send an email notification and update the contact's status to "Live".

## Testing

Ensure that the workflow operates as expected by simulating tagged status changes and verifying that emails are received correctly and the contact's status is updated.

## FAQs

**Q: Can I customize the email template?**  
A: Yes, email templates can be customized in Zoho CRM settings to better suit your branding and communication style.

**Q: What should I do if the emails are not being sent?**  
A: Check the email configuration in your Zoho CRM settings and ensure that the workflow criteria are correctly set.

## Contributing

Contributions are welcome! Please read the contributing guidelines to get started.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Additional Resources

For more detailed setup instructions and workflow customization, refer to the [ZOHO_SETUP.MD](https://github.com/Biot-Savart/Zoho-Intergration/blob/main/ZOHO_SETUP.MD) and [WORKFLOW_AUTOMATION.MD](https://github.com/Biot-Savart/Zoho-Intergration/blob/main/WORKFLOW_AUTOMATION.MD) files.
