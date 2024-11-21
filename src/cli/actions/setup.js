require('dotenv').config();
const fs = require('fs');
const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { Upload } = require("@aws-sdk/lib-storage");
const { folderExists, createGuid} = require('../../helpers');

module.exports.setupAction = async (options) => {

    let credentials;
    const bucket = process.env.BUCKET_NAME;

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

    const sloopConfig = JSON.parse(fs.readFileSync('sloop.json'));

    if (!sloopConfig) {
        console.warn(
            "WARNING sloop.json not found in the current directory. \r\n" +
            "Please run `sloop init` to create the file. \r\n" +
            "Aborting..."
        );
        return;
    }
    console.log("Setting up sloop...");

    // create the folders in the bucket if they don't exist
    console.log(`Bucket: ${bucket}`);
    for (const key in sloopConfig.schemas) {

        const exists = await folderExists({ bucket, collection: key, s3 });
        if (exists && options?.force !== true) {
            console.log(`Folder: ${key} already exists, skipping...`);
            continue;
        } else if (exists && options?.force === true) {
            console.log(`Folder: ${key} already exists, but force flag is set. Proceeding...`);
        } else {
            console.log(`Folder: ${key} does not exist`);
        }

        console.log(`Creating folder: ${key}`);
        const upload = new Upload({
            client: s3,
            params: {
                Bucket: bucket,
                Key: `${key}/`,
                Body: "", // Ensure Body is defined, even if it's an empty string
            },
        });
        await upload.done();
        console.log(`${bucket}/${key}/ - done`);

        // open the datafile
        const data = JSON.parse(fs.readFileSync(sloopConfig.schemas[key].dataFile));

        let lookupTable = {};

        // create a new record for each in the folder
        for (let record of data){
            // ensure a guid exists if not create a new random one
            if (!record.guid) {
                record.guid = createGuid();
                console.log(`Creating new guid: ${record.guid}`);
            }
            const putObjectParams = {
                Bucket: bucket,
                Key: `${key}/${record.guid}`,
                Body: JSON.stringify(record, null, 4),
                ContentType: 'application/json',
            };
            try {
                await s3.putObject(putObjectParams);
            } catch (error) {
                throw new Error(error);
            }
            console.log(`${bucket}/${key}/${record.guid} - done`);
            lookupTable[record.id] = record.guid;
        }

        // create the lookup table for the folder
        const lookupTablePutObjectParams = {
            Bucket: bucket,
            Key: `${key}/lookupTable.json`,
            Body: JSON.stringify(lookupTable, null, 4),
            ContentType: 'application/json',
        };

        await s3.putObject(lookupTablePutObjectParams);

        console.log(`${bucket}/${key}/lookupTable.json - done`);
        console.log(JSON.stringify(lookupTable, null, 4));

        /**
         * create a file in the folder named all.json.  It should
         * contain an array of all the data, for each of the records
         * it should be the same as the data file.
         *
         * It will be used to easily query for all the data in the folder,
         * or it can be used to filter faster
         */
        const allPutObjectParams = {
            Bucket: bucket,
            Key: `${key}/all.json`,
            Body: JSON.stringify(data, null, 4),
            ContentType: 'application/json',
        };

        await s3.putObject(allPutObjectParams)
        console.log(`${bucket}/${key}/all.json - done`);
    }

    // add a "setup": true key value pair to the sloop.json to each schema after setting up each folder
};