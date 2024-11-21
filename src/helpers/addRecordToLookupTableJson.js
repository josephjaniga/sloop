const {
    validation_LookupTableJson
} = require("./validation.lookupTableJson");

/**
 * This function accepts the data for a new record and adds it to the lookupTable.json file
 *
 * @param {Object} options
 * @param {Object} options.data - the new record data json object to be validated
 * @param {Object} options.lookupTableJson - the lookup table json object
 * @param {Object} options.s3 - the s3 object
 * @param {string} options.bucket - the bucket name
 * @param {string} options.collection - the collection name
 * @returns {void} - This function should not return anything
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