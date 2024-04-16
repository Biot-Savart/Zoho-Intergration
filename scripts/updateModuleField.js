const { ZohoCRMClient } = require("../client/zoho-crm-client");

/**
 * Updates a field in a Zoho CRM module based on the provided parameters.
 *
 * @async
 * @function UpdateModuleField
 * @returns {Promise<void>} A Promise that resolves when the field is updated successfully.
 */
async function UpdateModuleField() {
  // Extract the parameters from command line arguments
  const moduleApiName = process.argv[2]; //the module name to update the field from
  const field = process.argv[3]; //the field to update
  const startsWith = process.argv[4]; //the value to search for in the start of the field
  let newValue = process.argv[5]; //the value to update the field with

  if (!moduleApiName) {
    console.log(
      "Please provide a module. Usage: node updateModuleField.js <moduleApiName> <field> <startsWith> [value]"
    );
    return;
  }

  if (!field) {
    console.log(
      "Please provide a field to update. Usage: node updateModuleField.js <moduleApiName> <field> <startsWith> [value]"
    );
    return;
  }

  if (!startsWith) {
    console.log(
      "Please provide a search term. Usage: node updateModuleField.js <startsWith> [value]"
    );
    return;
  }

  if (!newValue) {
    console.log(
      "Please provide a value. Usage: node updateModuleField.js <startsWith> [value]"
    );
    return;
  }

  try {
    // Initialize the Zoho CRM client using async/await
    const client = await ZohoCRMClient.initialize();

    // Use the client to search records by field using async/await
    const records = await client.searchModules(
      moduleApiName,
      field,
      startsWith
    );

    // Output the number of records found
    console.log(
      `Found ${records.length} module rows starting with '${startsWith}':`
    );

    if (records.length === 0) {
      console.log("No records found.");
      return;
    }

    // Output details of each record found
    records.forEach((record) => {
      console.log(`ID: ${record.id}, Name: ${record.searchField}`);
    });

    // update each record to include the value
    const recordsToUpdate = records.map((record) =>
      client.createRecord(field, record.id, newValue)
    );

    await client.updateRecords(moduleApiName, recordsToUpdate);
    console.log(`Records have been updated as ${newValue}`);
  } catch (error) {
    // Log any errors encountered during the process
    console.error("Error searching or updating records", error);
  }
}

// Call the function
UpdateModuleField();
