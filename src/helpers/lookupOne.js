const {
    getObjectOutputToJson
} = require("./getObjectOutputToJson");
const {
    getLookupTableJson
} = require("./getLookupTableJson");

/**
 * Retrieves a single record by ID using the lookup table from a collection in S3
 * 
 * @param {Object} options - The options object
 * @param {string} options.id - The ID of the record to lookup
 * @param {string} options.bucket - The S3 bucket name
 * @param {string} options.collection - The collection/folder name
 * @param {Object} options.s3 - The AWS S3 client instance
 * @returns {Promise<Object>} The requested record as a JSON object
 */
async function lookupOne(options) {

    let {
        id,
        s3,
        bucket,
        collection,
    } = options;

    let lookupJson = await getLookupTableJson({
        bucket,
        collection,
        s3
    });

    let guid = lookupJson[id];

    const getOneParams = {
        Bucket: bucket,
        Key: `${collection}/${guid}`
    };

    return await getObjectOutputToJson( await s3.getObject(getOneParams) );

}

module.exports = {
    lookupOne
};