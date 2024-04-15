const { ZohoCRMClient } = require("./zoho-crm-client");

/**
 * Updates module field in Zoho CRM.
 * @async
 * @function UpdateModuleField
 * @returns {Promise<void>} A Promise that resolves when the update is complete.
 */
async function UpdateModuleField() {
  // Extract the parameters from command line arguments
  const moduleApiName = process.argv[2];
  const field = process.argv[3];
  const startsWith = process.argv[4];
  let value = process.argv[5]; // Convert the third argument to a boolean

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

  if (!value) {
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
      client.createRecord(field, record.id, value)
    );

    await client.updateRecords(moduleApiName, recordsToUpdate);
    console.log(`Records have been updated as ${value}`);
  } catch (error) {
    // Log any errors encountered during the process
    console.error("Error searching or updating records", error);
  }
}

// Call the function
UpdateModuleField();
