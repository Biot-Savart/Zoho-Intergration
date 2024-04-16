# Workflow Automation in Zoho CRM

## Index

- [Overview](#overview)
- [Requirements](#requirements)
- [Step-by-Step Guide](#step-by-step-guide)
  - [Step 1: Access Workflow Management](#step-1-access-workflow-management)
  - [Step 2: Create a New Workflow](#step-2-create-a-new-workflow)
  - [Step 3: Define the Workflow Trigger](#step-3-define-the-workflow-trigger)
  - [Step 4: Set Up the Email Notification](#step-4-set-up-the-email-notification)
  - [Step 5: Activate the Workflow](#step-5-activate-the-workflow)
- [Conclusion](#conclusion)

## Overview

This guide explains how to create a workflow in Zoho CRM that automatically sends an email when a Contact's status changes from "Waiting" to "Live".

## Requirements

Before you start, ensure you have the following:

- A Zoho CRM account with administrative privileges.
- Access to the Workflow Management section.
- A valid email setup in Zoho CRM for sending emails.

## Step-by-Step Guide

### Step 1: Access Workflow Management

1. Log in to your Zoho CRM account.
2. Navigate to **Settings** (gear icon on the top right corner).
3. Under **Automation**, click on **Workflow Rules**.

### Step 2: Create a New Workflow

1. Click on the **Create Rule** button.
2. Select the module **Contacts** from the dropdown menu.
3. Enter a name for your workflow, e.g., "Contact Status Change Notification".

### Step 3: Define the Workflow Trigger

1. Under **WHEN**, choose the option **Reocord action**. 2. Select **Edit** for the operation 3. Select **Specific field(s) gets modified** and also tick **Repeat this workflow whenever a Contact is edited** 4. For **When** Select the **Tagged** field and the `is modified to` **selected** module. 5. Click **Next**
2. Under **CONDITION**:
   - Select **All Contacts**
   - Click **Next**

### Step 4: Set Up the Email Notification

1. In the **Actions** section, click on **Instant Actions**.
2. Choose **Email notifications**.
3. Select the **Trigger Email** notification or click on **Create Email Notification**
   - If you clicked on **Create Email Notification ** configure the email:
     - **Name** the confiq.
     - **To**: careers@plentify.io -
     - Click **Select Template** and either select the **User Live** template or create your own with
       - **Templte Subject**: `${Contacts.Name} is live!`
       - **Body**:
         ```
         This is a test email from ${Lookup:Created By.First Name} ${Lookup:Created By.Last Name}'s workflow automation task.
         ```

### Step 5: Set Up the Email Notification

1. In the **Actions** section, click on **+ ACTION**.
2. Choose **Field Updates**.
3. **Name** the confiq.
4. Select the **Tagged** field
5. Tick the **box** to set it to true.
6. Click **Save and Associate**

### Step 5: Activate the Workflow

1. After setting up the email template and conditions, click on **Save**.
2. Ensure the workflow rule is **Active** by checking its status.

## Conclusion

You have successfully created a workflow automation in Zoho CRM that triggers an email notification when a Contact's Tagged field changes from "false" to "true". Test the workflow by updating a Contact's status to see if the email dispatches as expected.
