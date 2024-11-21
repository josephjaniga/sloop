const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { setupAction } = require('../../src/cli/actions/setup');
const { teardownAction } = require('../../src/cli/actions/teardown');
const { pushRecordToAllJson, getAllJson } = require('../../src/helpers');

describe('pushRecordToAllJson', () => {
    const bucket = process.env.BUCKET_NAME;
    const s3 = new S3({
        credentials: fromIni({ profile: process.env.AWS_PROFILE }),
        region: "us-east-1",
    });

    beforeEach(async () => {
        await setupAction();
    });

    it('should add new record to all.json', async () => {
        const allJson = await getAllJson({ bucket, collection: 'Cars', s3 });
        const initialLength = allJson.length;
        
        const newRecord = {
            id: '999',
            guid: 'test-guid-999',
            brand: 'TestBrand',
            model: 'TestModel'
        };

        await pushRecordToAllJson({
            data: newRecord,
            allJson,
            s3,
            bucket,
            collection: 'Cars'
        });

        const updatedAllJson = await getAllJson({ bucket, collection: 'Cars', s3 });
        expect(updatedAllJson.length).toBe(initialLength + 1);
        expect(updatedAllJson.find(record => record.guid === 'test-guid-999')).toBeDefined();
    });

    afterEach(async () => {
        await teardownAction('Cars', { force: true });
    });
}); 