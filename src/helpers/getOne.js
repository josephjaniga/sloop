const {
    getObjectOutputToJson
} = require("./getObjectOutputToJson");

/**
 * This function should get one record from a collection by guid
 *
 * @param {Object} options
 * @param {String} options.guid - the guid of the record to get
 * @param {String} options.bucket - the identifier of the s3 bucket
 * @param {String} options.collection - the collection to get the all.json file from
 * @param {Object} options.s3 - the s3 client
 * @returns {Promise<Object>} - the json object of the all.json file
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