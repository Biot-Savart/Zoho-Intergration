const InitializeBuilder =
  require("@zohocrm/nodejs-sdk-2.0/routes/initialize_builder").InitializeBuilder;
const OAuthBuilder =
  require("@zohocrm/nodejs-sdk-2.0/models/authenticator/oauth_builder").OAuthBuilder;
const UserSignature =
  require("@zohocrm/nodejs-sdk-2.0/routes/user_signature").UserSignature;
const Levels = require("@zohocrm/nodejs-sdk-2.0/routes/logger/logger").Levels;
const LogBuilder =
  require("@zohocrm/nodejs-sdk-2.0/routes/logger/log_builder").LogBuilder;
const USDataCenter =
  require("@zohocrm/nodejs-sdk-2.0/routes/dc/us_data_center").USDataCenter;
const FileStore =
  require("@zohocrm/nodejs-sdk-2.0/models/authenticator/store/file_store").FileStore;
const SDKConfigBuilder =
  require("@zohocrm/nodejs-sdk-2.0/routes/sdk_config_builder").SDKConfigBuilder;
require("dotenv").config();
//const RecordOperations = require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/record_operations");
const {
  RecordOperations,
  SearchRecordsParam,
} = require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/record_operations");
const ParameterMap =
  require("@zohocrm/nodejs-sdk-2.0/routes/parameter_map").ParameterMap;
const ResponseWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/response_wrapper").ResponseWrapper;
//const zoho = require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/record");
const ZCRMRecord =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/record").MasterModel;
const ActionWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/action_wrapper").ActionWrapper;
const BodyWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/body_wrapper").BodyWrapper;
const SuccessResponse =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/success_response").SuccessResponse;

/**
 * Represents a client for interacting with Zoho CRM.
 */
class ZohoCRMClient {
  /**
   * Initializes the Zoho CRM client by setting up the necessary configurations and dependencies.
   *
   * @returns {ZohoCRMClient} The initialized Zoho CRM client instance.
   */
  static async initialize() {
    /**
     * Create an instance of Logger Class that takes two parameters
     * level -> Level of the log messages to be logged. Can be configured by typing Levels "." and choose any level from the list displayed.
     * filePath -> Absolute file path, where messages need to be logged.
     */
    const logger = new LogBuilder()
      .level(Levels.ALL)
      .filePath("./client/node_sdk_log.log")
      .build();

    /**
     * Create an UserSignature instance that takes user Email as parameter
     */
    const user = new UserSignature(process.env.ADMIN_EMAIL_ADDRESS);

    /**
     * Configure the environment
     * which is of the pattern Domain.Environment
     * Available Domains: USDataCenter, EUDataCenter, INDataCenter, CNDataCenter, AUDataCenter
     * Available Environments: PRODUCTION(), DEVELOPER(), SANDBOX()
     */
    const environment = USDataCenter.PRODUCTION();

    /**
     * Create a Token instance that requires the following
     * clientId -> OAuth client id.
     * clientSecret -> OAuth client secret.
     * refreshToken -> REFRESH token.
     * grantToken -> GRANT token.
     * id -> User unique id.
     * redirectURL -> OAuth redirect URL.
     */
    const token = new OAuthBuilder()
      .clientId(process.env.CLIENT_ID)
      .clientSecret(process.env.CLIENT_SECRET)
      .grantToken(process.env.GRANT_TOKEN)
      .build();

    /**
     * Create an instance of FileStore that takes absolute file path as parameter
     */
    const tokenstore = new FileStore("./client/nodejs_sdk_tokens.txt");

    /**
     * autoRefreshFields
     * if true - all the modules' fields will be auto-refreshed in the background, every hour.
     * if false - the fields will not be auto-refreshed in the background. The user can manually delete the file(s) or refresh the fields using methods from ModuleFieldsHandler(utils/util/module_fields_handler.js)
     *
     * pickListValidation
     * A boolean field that validates user input for a pick list field and allows or disallows the addition of a new value to the list.
     * if true - the SDK validates the input. If the value does not exist in the pick list, the SDK throws an error.
     * if false - the SDK does not validate the input and makes the API request with the user’s input to the pick list
     */
    const sdkConfig = new SDKConfigBuilder()
      .pickListValidation(false)
      .autoRefreshFields(true)
      .build();

    /**
     * The path containing the absolute directory path to store user specific JSON files containing module fields information.
     */
    const resourcePath = "./client";

    /**
     * Call the static initialize method of Initializer class that takes the following arguments
     * user -> UserSignature instance
     * environment -> Environment instance
     * token -> Token instance
     * store -> TokenStore instance
     * SDKConfig -> SDKConfig instance
     * resourcePath -> resourcePath
     * logger -> Logger instance
     */
    try {
      (await new InitializeBuilder())
        .user(user)
        .environment(environment)
        .token(token)
        .store(tokenstore)
        .SDKConfig(sdkConfig)
        .resourcePath(resourcePath)
        .logger(logger)
        .initialize();
    } catch (error) {
      console.log(error);
    }

    return new ZohoCRMClient();
  }

  /**
   * Searches for records in a Zoho CRM module based on the provided search criteria.
   *
   * @param {string} moduleApiName - The API name of the Zoho CRM module to search in.
   * @param {string} searchField - The field in the module to search for.
   * @param {string} startsWith - The value to search for, which should be the starting characters of the search field.
   * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects representing the search results.
   */
  async searchModules(moduleApiName, searchField, startsWith) {
    // Create an instance of RecordOperations to perform record operations.
    const recordOperations = new RecordOperations();

    // Create an instance of ParameterMap to hold the search parameters.
    const paramInstance = new ParameterMap();

    // Add search criteria to the parameter map.
    await paramInstance.add(
      SearchRecordsParam.CRITERIA,
      `(${searchField}:starts_with:${startsWith})`
    );

    // Execute the search records operation with the module name and parameters.
    const response = await recordOperations.searchRecords(
      moduleApiName,
      paramInstance
    );

    // Check if the response includes a valid ResponseWrapper object and map the data to a simpler format.
    return response.object && response.object instanceof ResponseWrapper
      ? response.object.data.map((contact) => ({
          id: contact.keyValues.get("id"),
          searchField: contact.keyValues.get(searchField),
          status: contact.keyValues.get("Status"),
        }))
      : [];
  }

  /**
   * Creates a new ZCRMRecord with the specified field, recordId, and value.
   * @param {string} field - The field name of the record.
   * @param {string} recordId - The ID of the record.
   * @param {any} value - The value to be added to the record.
   * @returns {ZCRMRecord} - The newly created ZCRMRecord object.
   */
  createRecord(field, recordId, value) {
    // Instantiate a new ZCRMRecord for a contact.
    const record = new ZCRMRecord();

    // Set the contact ID.
    record.setId(recordId);

    // Add the tag key-value to the record.
    record.addKeyValue(field, value);
    return record;
  }

  /**
   * Updates records in Zoho CRM module.
   * @param {string} moduleApiName - The API name of the module.
   * @param {Array} records - An array of records to be updated.
   * @returns {Array} - An array of updated records with their status and ID.
   */
  async updateRecords(moduleApiName, records) {
    // Create an instance of RecordOperations to perform record operations.
    const recordOperations = new RecordOperations();

    // Create an instance of BodyWrapper to hold the data to be updated.
    const request = new BodyWrapper();

    // Set the data on the request object.
    request.setData(records);

    // Execute the update records operation with the module name and the request data.
    const response = await recordOperations.updateRecords(
      moduleApiName,
      request
    );

    // Check if the response includes a valid ActionWrapper object and map the results to a simpler format.
    return response.object && response.object instanceof ActionWrapper
      ? response.object.getData().map((actionResponse) => ({
          status: actionResponse.getStatus().getValue(),
          id: actionResponse.getDetails().get("id"),
        }))
      : [];
  }
}

module.exports = { ZohoCRMClient };
