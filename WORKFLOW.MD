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
