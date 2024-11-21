const {
    getObjectOutputToJson
} = require("./getObjectOutputToJson");

/**
 * This function should get the lookupTable.json file from the s3 bucket for a specific collection
 *
 * @param {Object} options
 * @param {String} options.bucket - the identifier of the s3 bucket
 * @param {String} options.collection - the collection to get the lookupTable.json file from
 * @param {Object} options.s3 - the s3 client
 * @returns {Promise<Object>} - the json object of the lookupTable.json file
 */
async function getLookupTableJson(options) {

    let {
        s3,
        bucket,
        collection
    } = options;

    const getLookupTableParams = {
        Bucket: bucket,
        Key: `${collection}/lookupTable.json`
    };

    return await getObjectOutputToJson( await s3.getObject(getLookupTableParams) );

}

module.exports = {
    getLookupTableJson
};