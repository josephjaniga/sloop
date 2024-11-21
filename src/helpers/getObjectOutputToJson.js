/**
 * Converts an S3 GetObjectCommandOutput stream to a JSON object
 * 
 * @param {Object} blob - The S3 GetObjectCommandOutput stream
 * @returns {Promise<Object>} The parsed JSON object
 */

async function getObjectOutputToJson(blob) {
    // convert the stream to utf-8 string
    let d = await blob.Body.transformToString('utf-8');
    // parse the string to a json object
    return JSON.parse(d);
}

module.exports = {
    getObjectOutputToJson
};