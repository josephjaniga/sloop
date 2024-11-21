const {
    validation_AllJson
} = require("./validation.allJson");

/**
 * Adds a new record to the all.json file in S3
 * 
 * @param {Object} options - The options object
 * @param {Object} options.data - The new record data to be added
 * @param {Array} options.allJson - The current all.json array
 * @param {Object} options.s3 - The AWS S3 client instance
 * @param {string} options.bucket - The S3 bucket name
 * @param {string} options.collection - The collection/folder name
 * @returns {Promise<void>}
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