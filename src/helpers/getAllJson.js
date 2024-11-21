const {
    getObjectOutputToJson
} = require("./getObjectOutputToJson");

/**
 * This function should get the all.json file from the s3 bucket for a specific collection
 *
 * @param {Object} options
 * @param {String} options.bucket - the identifier of the s3 bucket
 * @param {String} options.collection - the collection to get the all.json file from
 * @param {Object} options.s3 - the s3 client
 * @returns {Promise<Object>} - the json object of the all.json file
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