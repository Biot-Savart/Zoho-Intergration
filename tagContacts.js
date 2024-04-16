const { ZohoCRMClient } = require("./zoho-crm-client");

/**
 * Searches and tags contacts in Zoho CRM based on the provided search term and tag.
 * @async
 * @function searchAndTagContacts
 * @returns {Promise<void>} A promise that resolves when the search and tagging process is complete.
 */
async function searchAndTagContacts() {
  // Extract the parameters from command line arguments
  const moduleApiName = "Contacts1"; // The API name of the Zoho CRM module to search in
  const field = "Taged"; // The field in the module to update
  const startsWith = process.argv[2]; // The search term to find contacts by, beginning with this string
  let tag = process.argv[3]; //the tag value to update the field with

  if (!startsWith) {
    console.log(
      "Please provide a search term. Usage: node searchContacts.js <startsWith> [tag]"
    );
    return;
  }

  if (!tag) {
    console.log(
      "Please provide a tag. Usage: node searchContacts.js <startsWith> [tag]"
    );
    return;
  }

  tag = process.argv[3] === "true"; // Convert the argument to a boolean

  try {
    // Initialize the Zoho CRM client using async/await
    const client = await ZohoCRMClient.initialize();

    // Use the client to search contacts by name using async/await
    const contacts = await client.searchModules(
      moduleApiName,
      "Name",
      startsWith
    );

    // Output the number of contacts found
    console.log(
      `Found ${contacts.length} contacts starting with '${startsWith}':`
    );

    if (contacts.length === 0) {
      console.log("No contacts found.");
      return;
    }

    // Output details of each contact found
    contacts.forEach((contact) => {
      console.log(`ID: ${contact.id}, Name: ${contact.searchField}`);
    });

    // update each contact to include the tag
    const recordsToUpdate = contacts.map((contact) =>
      client.createRecord(field, contact.id, tag)
    );

    await client.updateRecords(moduleApiName, recordsToUpdate);
    console.log(`Contacts have been tagged as ${tag}`);
  } catch (error) {
    // Log any errors encountered during the process
    console.error("Error searching or tagging contacts", error);
  }
}

// Call the function
searchAndTagContacts();
