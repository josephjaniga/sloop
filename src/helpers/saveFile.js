/**
 * Saves a JSON object as a file in S3
 * 
 * @param {Object} options - The options object
 * @param {Object|Array} options.data - The data to save
 * @param {string} options.bucket - The S3 bucket name
 * @param {string} options.collection - The collection/folder name
 * @param {string} options.filename - The name of the file to save
 * @param {Object} options.s3 - The AWS S3 client instance
 * @returns {Promise<Object|Array>} The saved data
 */

async function saveFile(options) {

    let {
        data,
        bucket,
        collection,
        filename,
        s3
    } = options;

    const putObjectParams = {
        Bucket: bucket,
        Key: `${collection}/${filename}`,
        Body: JSON.stringify(data, null, 4),
        ContentType: 'application/json',
    };

    try {
        await s3.putObject(putObjectParams);
        return data;
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = {
    saveFile
};