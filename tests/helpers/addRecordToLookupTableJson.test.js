const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { setupAction } = require('../../src/cli/actions/setup');
const { teardownAction } = require('../../src/cli/actions/teardown');
const { addRecordToLookupTableJson, getLookupTableJson } = require('../../src/helpers');

describe('addRecordToLookupTableJson', () => {
    const bucket = process.env.BUCKET_NAME;
    const s3 = new S3({
        credentials: fromIni({ profile: process.env.AWS_PROFILE }),
        region: "us-east-1",
    });

    beforeEach(async () => {
        await setupAction();
    });

    it('should add new record to lookupTable.json', async () => {
        const lookupTableJson = await getLookupTableJson({ bucket, collection: 'Cars', s3 });
        
        const newRecord = {
            id: '999',
            guid: 'test-guid-999'
        };

        await addRecordToLookupTableJson({
            data: newRecord,
            lookupTableJson,
            s3,
            bucket,
            collection: 'Cars'
        });

        const updatedLookupTable = await getLookupTableJson({ bucket, collection: 'Cars', s3 });
        expect(updatedLookupTable['999']).toBe('test-guid-999');
    });

    afterEach(async () => {
        await teardownAction('Cars', { force: true });
    });
}); 