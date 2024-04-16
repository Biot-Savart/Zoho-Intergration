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
  const searchField = process.argv[3]; //the field to search in
  const startsWith = process.argv[4]; //the value to search for in the start of the field
  const fieldToUpdate = process.argv[5]; //the field to update
  let newValue = process.argv[6]; //the value to update the field with

  const usage =
    "node updateModuleField.js <moduleApiName> <searchField> <startsWith> <fieldToUpdate> [newValue]";

  if (!moduleApiName) {
    console.log("Please provide a module. Usage: " + usage);
    return;
  }

  if (!searchField) {
    console.log("Please provide a field to search in. Usage: " + usage);
    return;
  }

  if (!startsWith) {
    console.log("Please provide a search term. Usage: " + usage);
    return;
  }

  if (!fieldToUpdate) {
    console.log("Please provide a field to update. Usage: " + usage);
    return;
  }

  if (!newValue) {
    console.log("Please provide a value. Usage: " + usage);
    return;
  }

  console.log(
    `Updating module: ${moduleApiName}\nSearch Field: ${searchField}\nSearch Value (starts with): ${startsWith}\nField to Update: ${fieldToUpdate}\nNew Value: ${newValue}`
  );

  try {
    // Initialize the Zoho CRM client using async/await
    const client = await ZohoCRMClient.initialize();

    // Use the client to search records by field using async/await
    const records = await client.searchModules(
      moduleApiName,
      searchField,
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
      client.createRecord(fieldToUpdate, record.id, newValue)
    );

    await client.updateRecords(moduleApiName, recordsToUpdate);
    console.log(`Record's ${fieldToUpdate} have been updated to ${newValue}`);
  } catch (error) {
    // Log any errors encountered during the process
    console.error("Error searching or updating records", error);
  }
}

// Call the function
UpdateModuleField();
