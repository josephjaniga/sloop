const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { setupAction } = require('../src/cli/actions/setup');
const { teardownAction } = require('../src/cli/actions/teardown');
const { folderExists } = require('../src/helpers');
const { getLookupTableJson, getAllJson, getOne } = require('../src/helpers');
const fs = require('fs');


describe('Cars Collection', function() {

    describe('Teardown', function() {

        const bucket = process.env.BUCKET_NAME;
        const s3 = new S3({
            credentials: fromIni({ profile: process.env.AWS_PROFILE }),
            region: "us-east-1",
        });
    
        beforeEach(async function() {
            // Call the setup action
            await setupAction();
            // Use the teardown function to clean up the Cars collection
            await teardownAction('Cars', { force: true });
        });
    
        it('should teardown the Cars collection correctly', async function() {
            // Verify the Cars folder does not exist
            const carsFolderExists = await folderExists(bucket, 'Cars', s3);
            expect(carsFolderExists).toBe(false);
        });
    
        afterEach(async function() {
            // Optionally, use the teardown function to clean up after tests
            // await teardown('Cars', { force: true });
        });

    });

    describe('Setup', function() {

        const bucket = process.env.BUCKET_NAME;
        const s3 = new S3({
            credentials: fromIni({ profile: process.env.AWS_PROFILE }),
            region: "us-east-1",
        });
    
        beforeAll(async function() {
            // Use the teardown function to clean up the Cars collection
            await teardownAction('Cars', { force: true });
            // Call the setup action
            await setupAction();
        });
    
        it('Cars folder should exist', async function() {
            // Verify the Cars folder does not exist
            const carsFolderExists = await folderExists(bucket, 'Cars', s3);
            expect(carsFolderExists).toBe(true);
        });    
    
        it('Cars folder should contain the correct files', async function() {
            // first get the lookupTable.json and the all.json files
            const lookupTable = await getLookupTableJson({ bucket, collection: 'Cars', s3 });
            const all = await getAllJson({ bucket, collection: 'Cars', s3 });
            expect(lookupTable).toBeDefined();
            expect(all).toBeDefined();
        });

        it('get all of the records and verify the data', async function() {
            // open the Cars.json file in the root of the project example folder
            const carsJson = JSON.parse(fs.readFileSync('example/Cars.json', 'utf8'));
            // get the lookupTable.json file from s3
            const lookupTable = await getLookupTableJson({ bucket, collection: 'Cars', s3 });
            
            // walk through the lookupTable.json file and get the record file from s3
            // use the getOne.js function to get the record file from s3
            for (const id in lookupTable) {
                let recordFromS3 = await getOne({ bucket, collection: 'Cars', guid: lookupTable[id], s3 });
                expect(recordFromS3).toBeDefined();
                // verify the record from the carsJson file matches the record from s3
                let found = carsJson.find(car => car.id == id);
                if (found?.guid !== undefined){
                    expect(recordFromS3).toEqual(found);
                } else {
                    // remove the guid from the record from s3
                    let temp = Object.assign({}, recordFromS3);
                    delete temp['guid'];
                    expect(temp).toEqual(found);
                }

            }

        });
    
        afterEach(async function() {
            // Optionally, use the teardown function to clean up after tests
            // await teardown('Cars', { force: true });
        });

    });

});