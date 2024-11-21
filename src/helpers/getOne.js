const {
    getObjectOutputToJson
} = require("./getObjectOutputToJson");

/**
 * Retrieves a single record by GUID from a collection in S3
 * 
 * @param {Object} options - The options object
 * @param {string} options.guid - The GUID of the record to retrieve
 * @param {string} options.bucket - The S3 bucket name
 * @param {string} options.collection - The collection/folder name
 * @param {Object} options.s3 - The AWS S3 client instance
 * @returns {Promise<Object>} The requested record as a JSON object
 */
async function getOne(options) {

    let {
        guid,
        s3,
        bucket,
        collection,
    } = options;

    const getOneParams = {
        Bucket: bucket,
        Key: `${collection}/${guid}`
    };

    return await getObjectOutputToJson( await s3.getObject(getOneParams) );

}

module.exports = {
    getOne
};