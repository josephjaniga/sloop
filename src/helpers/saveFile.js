/**
 * a generic version for saving data to a file
 * @param options
 * @returns {Promise<*>}
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