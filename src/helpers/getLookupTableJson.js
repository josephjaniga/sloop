const {
    getObjectOutputToJson
} = require("./getObjectOutputToJson");

/**
 * Retrieves the lookupTable.json file from a collection in S3
 * 
 * @param {Object} options - The options object
 * @param {string} options.bucket - The S3 bucket name
 * @param {string} options.collection - The collection/folder name
 * @param {Object} options.s3 - The AWS S3 client instance
 * @returns {Promise<Object>} The parsed JSON content of lookupTable.json
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