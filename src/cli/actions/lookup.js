const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { getObjectOutputToJson } = require("../../helpers");

/**
 * this file will be a CLI command that will show us the lookupTable.js for the chosen key
 *
 * the command will be run like this:
 * `sloop lookupTable YOUR_KEY`
 * and should output the JSON object for the lookupTable for the chosen key
 * it will grab the lookupTable.json file from the S3 bucket and output the JSON object
 *
 */
module.exports.lookupAction = async (key, id) => {

    let credentials;
    const bucket = process.env.BUCKET_NAME;

    if (typeof key !== "string" || key.length === 0) {
        throw new Error("Please provide a key to lookup the table for.");
    }

    // Check if the AWS profile is set in the .env file
    if (!process.env.AWS_PROFILE) {
        throw new Error(
            "Please set the AWS profile in the" +
            " .env file to use the AWS SDK"
        );
    } else {
        credentials = fromIni({ profile: process.env.AWS_PROFILE });
    }

    const s3 = new S3({
        credentials: credentials,
        region: "us-east-1", // Specify your bucket's region
    });

    if (id === undefined) {

        console.log(`\r\n lookupTable.json for key: ${key} \r\n`);
        // grab the lookupTable.json file from the S3 bucket
        // and output the JSON object
        const getObjectParams = {
            Bucket: bucket,
            Key: `${key}/lookupTable.json`,
        };
        const lookupTableJson = await getObjectOutputToJson( await s3.getObject(getObjectParams) );

        console.log(JSON.stringify(lookupTableJson, null, 4));

    } else {

        // lookup the individual item and return its entire object
        console.log(`\r\n key: ${key} | id: ${id} \r\n`);
        // grab the all.json file from the S3 bucket
        // and output the JSON object that matches the id
        const getObjectParams = {
            Bucket: bucket,
            Key: `${key}/all.json`,
        };
        const allJson = await getObjectOutputToJson( await s3.getObject(getObjectParams) );

        let item = allJson.find(item => item.id == id);

        if (item === undefined) {
            throw new Error(`Item with id ${id} not found in ${key} schema`);
        }

        console.log(JSON.stringify(item, null, 4));

    }

};
