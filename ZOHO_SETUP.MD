## Index

### [1. Set up CRM, create dummy data and set up access control](#1-set-up-crm-create-dummy-data-and-set-up-access-control)

- [Step 1: Create a Free Demo Instance of Zoho One](#step-1-create-a-free-demo-instance-of-zoho-one)
- [Step 2: Set Up the CRM App](#step-2-set-up-the-crm-app)
- [Step 3: Customize the Contacts Module](#step-3-customize-the-contacts-module)
- [Step 4: Populate the Contacts with Dummy Data Using a CSV File](#step-4-populate-the-contacts-with-dummy-data-using-a-csv-file)
- [Step 5: Set Up Access Control](#step-5-set-up-access-control)
- [Step 6: Review and Testing](#step-6-review-and-testing)

### [Adding API Access in Zoho CRM](#adding-api-access-in-zoho-crm)

- [Step 1: Register a Client in Zoho CRM](#step-1-register-a-client-in-zoho-crm)
- [Step 2: Configure Scope and Generate Grant Token](#step-2-configure-scope-and-generate-grant-token)

## 1. Set up CRM, create dummy data and set up access control

Creating a CRM app within Zoho One and configuring it to include specific modules and fields involves several steps. Here's how you can set up your CRM app, populate it with dummy data, and set up access controls:

### Step 1: Create a Free Demo Instance of Zoho One

1. Go to the Zoho One [website](https://www.zoho.com/one/).
2. Click on the "Free Trial" button.
3. Follow the instructions to sign up for a demo account. You might need to provide company information and verify your email address.

### Step 2: Set Up the CRM App

1. Once your Zoho One account is active, access the admin panel.
2. Navigate to “Applications” and install the Zoho CRM application.
3. Open Zoho CRM from your Zoho One dashboard.

### Step 3: Customize the Contacts Module

1. In Zoho CRM, go to "Settings" (typically a gear icon in the top right corner).
2. Under "Customization," select "Modules and Fields."
3. Click on “Contacts” to customize this module or add a new module (the route I took)
4. To add new fields:
   - Click on “Add Field” in the top right corner of the module layout.
   - Drag and drop the “Single Line” field type into the module layout for the 'Name'.
   - Drag and drop the “Checkbox” field type for 'Tag' and configure it as a Boolean field. Set false as default value
   - Drag and drop the “Pick List” for 'Status', and add the values "Waiting" and "Live" to the options list. Set "Waiting" as default value.
5. Save your changes.

### Step 4: Populate the Contacts with Dummy Data Using a CSV File

1. **Prepare Your CSV File**: Create a CSV file with the following columns: Name, Tag, Status. Fill in the data accordingly for each contact. For example, each row should look like this:

   ```
   Name
   Jack Frost
   Jumbo Jookiba
   ...
   ```

   Ensure that the values for 'Tag' are set to false and 'Status' is set to 'Waiting' for each contact.

   #### For eas the contacts.csv file in the repo can be used, it includes all the demo data

2. **Import the CSV File into Zoho CRM**:

   - Go to the "Contacts" module in your CRM dashboard.
   - Look for the "Import" option (often found in the top-right corner or under more options).
   - Choose the CSV file you prepared and upload it.
   - Map the CSV columns to the corresponding fields in the CRM. Ensure that 'Name' maps to the Name field, 'Tag' to the Tag field, and 'Status' to the Status field.
     - 'Tag' is a reserved word, so 'Tagged' was used.
   - Start the import process. The system may ask for validation; review any errors and confirm to proceed.

3. **Verify the Import**:
   - After the import completes, browse through the Contacts module to ensure all contacts appear correctly with their respective 'Tag' set as false and 'Status' as 'Waiting'.
   - Check for any import errors or misalignments in data and correct them if necessary.

This method allows you to efficiently add multiple contacts to your Zoho CRM at once, reducing manual entry errors and saving time.

### Step 5: Set Up Access Control

1. Go back to the "Settings" and select “Users & Control.”
2. Under "Security Control," choose "Roles" and "Profiles" to define what each type of user can see and do within the CRM.
3. To add users (Arno Scholtz, Peter Smaill, Jon Kornik):
   - Navigate to “Users” in the settings.
   - Click on “Invite User” and enter their email addresses. Assign them a role and profile based on what level of access they should have.
4. You can specify more granular permissions or create custom roles if needed.

### Step 6: Review and Testing

1. Test the CRM setup by logging in as different users (using test accounts, if possible) to ensure that the access controls and data visibility are working as expected.
2. Review all entries in the Contacts module to ensure all data is entered correctly and behaves as expected based on the role configurations.

These steps should help you successfully set up and customize a CRM app within Zoho One tailored to your specific needs, including specific fields, dummy data, and access controls.

## Adding API Access in Zoho CRM

To integrate or automate functionalities in Zoho CRM using its API, you need to set up API access by creating a self client, obtaining the client secret, configuring the scope, and creating the grant token. Here’s how you can do it:

### Step 1: Register a Client in Zoho CRM

1. **Navigate to the API Console**: Log into your Zoho CRM account, go to `Settings`, then to `Developer Hub`, and select `APIs and SDKs`.
2. **Add Client**:
   - Click on SDK's
   - Click on `Register New Client` and then `+ Add Client`.
   - Select `Self Client`.
   - Enter the required details like Client Name.
   - Click `Create`.
3. **Obtain Client ID and Client Secret**:
   - After the client is registered, you’ll see a `Client ID` and `Client Secret`. Note add these to your .env file, as the secret is needed for authentication and should not be shared.

### Step 2: Configure Scope and Generate Grant Token

This is a 1 time process per client if done correctly.

1. **Determine Needed Permissions**:
   - Decide which aspects of the CRM your application needs to access. For example, `ZohoCRM.modules.ALL` allows access to all modules. In the `scope.txt` file is a scope that can be used, just cope and paste that scope.
2. **Create Grant Token**:
   - Add the scope from above.
   - Select `Time Duration`
   - Give the Scope a description (Can be anything)
   - Click `Create`
   - Select your created CRM portal
   - Select the Company/Environment
   - Click `Create`
   - Copy the generated token and add it to the `.env` file along with the `Client ID` and `Client Secret`
   - Run the script withn the set amount of time (`Time Duration`)
