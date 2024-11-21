const {
    validation_AllJson
} = require("./validation.allJson");

/**
 * This function accepts the data for a new record and adds it to the all.json file
 *
 * @param {Object} options
 * @param {Object} options.data - the new record data json object to be validated
 * @param {Object} options.allJson - the lookup table json object
 * @param {Object} options.s3 - the s3 object
 * @param {string} options.bucket - the bucket name
 * @param {string} options.collection - the collection name
 * @returns {void} - This function should not return anything
 */
async function pushRecordToAllJson(options) {

    let {
        data,
        allJson,
        s3,
        bucket,
        collection
    } = options;

    validation_AllJson({data, allJson});

    // add the new data to the all.json file
    allJson.push(data);

    // update the all.json file
    const updateAllParams = {
        Bucket: bucket,
        Key: `${collection}/all.json`,
        Body: JSON.stringify(allJson, undefined, 4),
    };

    await s3.putObject(updateAllParams);

}

module.exports = {
    pushRecordToAllJson
};