const {
    createGuid,
} = require("./createGuid");

/**
 * This function should create a new record in the S3 bucket
 * it should return the object that was created, so that we
 * can get the guid to add to the lookup table, etc
 *
 * @param {Object} options
 * @param {Object} options.record - the data of the record to create
 * @param {String} options.bucket - the identifier of the s3 bucket
 * @param {String} options.collection - the collection to create the record in
 * @param {Object} options.s3 - the s3 client
 * @returns {Promise<Object>} - the created record
 */
async function createRecord(options) {

    let {
        record,
        bucket,
        collection,
        s3
    } = options;

    // ensure a guid exists if not create a new random one
    if (!record.guid) {
        record.guid = createGuid();
        console.log(`Creating new guid: ${record.guid}`);
    }

    const putObjectParams = {
        Bucket: bucket,
        Key: `${collection}/${record.guid}`,
        Body: JSON.stringify(record, null, 4),
        ContentType: 'application/json',
    };

    try {
        await s3.putObject(putObjectParams);
        return record;
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = {
    createRecord
};