require('dotenv').config();
const fs = require('fs');
const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const readline = require('readline');

module.exports.teardownAction = async (collection, options) => {

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

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

    console.log(`Options: ${JSON.stringify(options, undefined, 4)}`);

    // Check if force option is set
    if (options.force) {
        console.log(`Force option set. Proceeding to teardown ${collection}...`);
        await performTeardown();
    } else {
        // use commander to prompt for confirmation
        await rl.question(
            `Are you sure you want to teardown ${collection}? (y/N) `,
            async (answer) => {
                if (answer !== 'y') {
                    console.log('Aborting teardown...');
                    rl.close();
                    return;
                }
                await performTeardown();
            }
        );
    }

    async function performTeardown() {
        console.log(`Teardown ${collection}...`);

        try {
            const listParams = {
                Bucket: bucket,
                Prefix: collection,
            };

            const listedObjects = await s3.listObjectsV2(listParams);

            if (listedObjects.Contents.length === 0) {
                console.log(`No objects found in ${collection}`);
                rl.close();
                return;
            }

            const deleteParams = {
                Bucket: bucket,
                Delete: {Objects: []},
            };

            listedObjects.Contents.forEach(({Key}) => {
                deleteParams.Delete.Objects.push({Key});
            });

            const deletedObjects = await s3.deleteObjects(deleteParams);
            console.log(`Deleted ${deletedObjects.Deleted.length} objects from ${collection}`);
        } catch (err) {
            // console.error(err);
        } finally {
            rl.close();
        }
    }

};