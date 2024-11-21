/**
 * this file is a helper... the s3.getObject() function returns a stream Blob
 * this function takes that stream Blob and converts it to a JSON object
 *
 * this converts the output of the s3.getObject() function which is called a:
 * `GetObjectCommandOutput` object to a JSON object
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