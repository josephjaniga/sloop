const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { setupAction } = require('../../src/cli/actions/setup');
const { teardownAction } = require('../../src/cli/actions/teardown');
const { createRecord, getOne } = require('../../src/helpers');

describe('createRecord', () => {
    const bucket = process.env.BUCKET_NAME;
    const s3 = new S3({
        credentials: fromIni({ profile: process.env.AWS_PROFILE }),
        region: "us-east-1",
    });

    beforeEach(async () => {
        await setupAction();
    });

    it('should create a new record and save it to S3', async () => {
        const newRecord = {
            id: '999',
            guid: 'test-guid-999',
            brand: 'TestBrand',
            model: 'TestModel'
        };

        await createRecord({
            record: newRecord,
            s3,
            bucket,
            collection: 'Cars'
        });

        // Verify the record was created
        const savedRecord = await getOne({
            guid: 'test-guid-999',
            bucket,
            collection: 'Cars',
            s3
        });

        expect(savedRecord).toEqual(newRecord);
    });

    /**
     * this is an interesting case because this helper is not currently checking for duplicate id or duplicate guid
     * i need to consider if this is something that should be added, by looking at the files that are consuming this create Record helper
     */
    xit('should throw error if record with same id exists', async () => {
        const record = {
            id: '999',
            guid: 'test-guid-999',
            brand: 'TestBrand'
        };

        await createRecord({
            record,
            s3,
            bucket,
            collection: 'Cars'
        });

        const duplicateRecord = {
            id: '999',
            guid: 'test-guid-1000',
            brand: 'AnotherBrand'
        };

        await expect(createRecord({
            record: duplicateRecord,
            s3,
            bucket,
            collection: 'Cars'
        })).rejects.toThrow();
    });

    afterEach(async () => {
        await teardownAction('Cars', { force: true });
    });
}); 