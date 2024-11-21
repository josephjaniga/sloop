const {
    validation_LookupTableJson
} = require("./validation.lookupTableJson");

/**
 * Adds a new record to the lookupTable.json file in S3
 * 
 * @param {Object} options - The options object
 * @param {Object} options.data - The new record data to be added
 * @param {Object} options.lookupTableJson - The current lookup table JSON object
 * @param {Object} options.s3 - The AWS S3 client instance
 * @param {string} options.bucket - The S3 bucket name
 * @param {string} options.collection - The collection/folder name
 * @returns {Promise<void>} 
 */
async function addRecordToLookupTableJson(options) {

    let {
        data,
        lookupTableJson,
        s3,
        bucket,
        collection
    } = options;

    validation_LookupTableJson({data, lookupTableJson});

    // add the new data to the lookupTable.json file
    lookupTableJson[data.id] = data.guid;

    // update the lookupTable.json file
    const updateLookupTableParams = {
        Bucket: bucket,
        Key: `${collection}/lookupTable.json`,
        Body: JSON.stringify(lookupTableJson, undefined, 4),
    };

    await s3.putObject(updateLookupTableParams);

}

module.exports = {
    addRecordToLookupTableJson
};