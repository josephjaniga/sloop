const { S3 } = require("@aws-sdk/client-s3");
const {
    getAllJson,
    createRecord,
    createGuid,
    getLookupTableJson,
    validation_AllJson,
    validation_LookupTableJson, pushRecordToAllJson, addRecordToLookupTableJson, getOne, lookupOne,
} = require("../helpers");
const {fromIni} = require("@aws-sdk/credential-providers");
const {saveFile} = require("../helpers/saveFile");
require('dotenv').config();

let credentials = {};

// sequence of credentials to check

// if there is a AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY then use that
if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    };
// otherwise if there is a AWS_PROFILE then use that
} else if (process.env.AWS_PROFILE) {
    credentials = fromIni({ profile: process.env.AWS_PROFILE });
// otherwise throw an error
} else if (!process.env.AWS_PROFILE) {
    throw new Error("Please set the AWS profile in the .env file to use the AWS SDK");
} 

const s3 = new S3({
    ...credentials,
    region: "us-east-1", // Specify your bucket's region
});

class Sloop {

    constructor(collection, bucket) {
        this.collection = collection;
        this.bucket = bucket;

        /**
         * when using DI for the s3 instance it will either be passed in here
         * or it will be created in the constructor
         */
        // this.s3 = s3;
    }

    async all() {

        /**
         * This function should return all the records in the collection.
         * It will grab them from the AWS S3 bucket from the all.json file
         * and return that entire array of all the objects.
         *
         * it should use the s3 instance to get the object from the bucket
         */

        return await getAllJson({
            bucket: this.bucket,
            collection: this.collection,
            s3: s3
        });
    }

    async create(data) {

        /**
         * This function needs to do many things
         * 1. Create a new file in the S3 bucket with the data provided using the appropriate file name
         *      - if no guid is provided create a new one randomly and use that
         * 2. Update the all.json file to include the new data
         * 3. Update the lookupTable.json file to include the new data showing how the guid maps to the id
         * 4. Return the data that was created
         */

        // does a guid exist?
        if (!data.guid) {
            data.guid = createGuid();
        }

        let allJson = await getAllJson({
            bucket: this.bucket,
            collection: this.collection,
            s3: s3
        });

        let lookupTableJson = await getLookupTableJson({
            bucket: this.bucket,
            collection: this.collection,
            s3: s3
        });

        validation_AllJson({data, allJson});
        validation_LookupTableJson({data, lookupTableJson});

        let recordResult = await createRecord({
            record: data,
            bucket: this.bucket,
            collection: this.collection,
            s3: s3
        });

        await pushRecordToAllJson({
            data,
            allJson,
            s3,
            bucket: this.bucket,
            collection: this.collection
        });

        await addRecordToLookupTableJson({
            data,
            lookupTableJson,
            s3,
            bucket: this.bucket,
            collection: this.collection
        });

        return data;
    }

    async get(guid) {

        return await getOne({
            bucket: this.bucket,
            collection: this.collection,
            s3: s3,
            guid: guid
        });

    }

    async lookup(id) {

        return await lookupOne({
            bucket: this.bucket,
            collection: this.collection,
            s3: s3,
            id: id
        });

    }

    /**
     * This function should update a record in the collection
     * It will behave like a PUT or similar "Update Into" action.
     * Meaning it will find the existing record by data.guid
     * and then only if that record exits it will replace the
     * record with the new data.
     *
     * If the data.id is different then the id on the existing record
     *   - it will need to update the lookupTable.json file.
     *   - It will do this by removing the old id and guid mapping and adding in the new one
     *
     * If an update is performed it will need to update the all.json file,
     * by replacing the record within it
     *
     * Unexpected behavior and errors:
     *   - if that record doesn't exist this function should throw an error
     *   - if the data provided doesn't have a guid this function should throw an error
     *   - if the data provided doesn't have an id this function should throw an error
     *   - if the data provided has an id that is already in use this function should throw an error
     *
     * @param {Object} data
     * @param {String} data.guid - the guid of the record to update
     * @param {String} data.id - the id of the record to update
     * @returns {Promise<void>}
     */
    async update(data) {
        if (!data.guid) { throw new Error("The data provided doesn't have a guid"); }
        if (!data.id) { throw new Error("The data provided doesn't have an id"); }

        let allJson = await getAllJson({
            bucket: this.bucket,
            collection: this.collection,
            s3: s3
        });

        let lookupTableJson = await getLookupTableJson({
            bucket: this.bucket,
            collection: this.collection,
            s3: s3
        });

        let existingRecordByGuid = allJson.find(record => record.guid === data.guid);
        if (!existingRecordByGuid) {
            throw new Error("The record doesn't exist");
        }

        if (data.id !== existingRecordByGuid.id) {
            if (lookupTableJson[data.id]) {
                throw new Error("The data provided has an id that already is in use");
            }
            delete lookupTableJson[existingRecordByGuid.id];
            lookupTableJson[data.id] = data.guid;
        }

        Object.assign(existingRecordByGuid, data);

        await createRecord({
            record: existingRecordByGuid,
            bucket: this.bucket,
            collection: this.collection,
            s3: s3
        });

        await saveFile({
            data: allJson,
            s3,
            bucket: this.bucket,
            collection: this.collection,
            filename: "all.json"
        });

        await saveFile({
            data: lookupTableJson,
            s3,
            bucket: this.bucket,
            collection: this.collection,
            filename: "lookupTable.json"
        });
    }

    async delete(guid) {

    }
}

module.exports = Sloop;