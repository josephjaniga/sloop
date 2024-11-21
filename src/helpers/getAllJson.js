const {
    getObjectOutputToJson
} = require("./getObjectOutputToJson");

/**
 * Retrieves the all.json file from a collection in S3
 * 
 * @param {Object} options - The options object
 * @param {string} options.bucket - The S3 bucket name
 * @param {string} options.collection - The collection/folder name
 * @param {Object} options.s3 - The AWS S3 client instance
 * @returns {Promise<Object>} The parsed JSON content of all.json
 */
async function getAllJson(options) {

    let {
        s3,
        bucket,
        collection
    } = options;

    const getAllParams = {
        Bucket: bucket,
        Key: `${collection}/all.json`
    };

    return await getObjectOutputToJson( await s3.getObject(getAllParams) );

}

module.exports = {
    getAllJson
};