const {
    getObjectOutputToJson
} = require("./getObjectOutputToJson");
const {
    getLookupTableJson
} = require("./getLookupTableJson");

/**
 * This function should lookup one record from a collection by id
 *
 * @param {Object} options
 * @param {String} options.id - the guid of the record to get
 * @param {String} options.bucket - the identifier of the s3 bucket
 * @param {String} options.collection - the collection to get the all.json file from
 * @param {Object} options.s3 - the s3 client
 * @returns {Promise<Object>} - the json object of the all.json file
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