/**
 * Checks if a folder exists in the specified S3 bucket
 * 
 * @param {Object} options - The options object
 * @param {string} options.bucket - The S3 bucket name
 * @param {string} options.collection - The collection/folder name
 * @param {Object} options.s3 - The AWS S3 client instance
 * @returns {Promise<boolean>} True if folder exists, false otherwise
 */
async function folderExists(options) {
    let {
        bucket,
        collection,
        s3
    } = options;

    try {
        const params = {
            Bucket: bucket,
            Prefix: `${collection}/`,
            MaxKeys: 1
        };
        const data = await s3.listObjectsV2(params);
        return data.Contents.length > 0;
    } catch (error) {
        // console.error("Error checking if folder exists:", error);
        return false;
    }
}

module.exports = {
    folderExists
};