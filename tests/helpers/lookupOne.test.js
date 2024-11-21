const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { setupAction } = require('../../src/cli/actions/setup');
const { teardownAction } = require('../../src/cli/actions/teardown');
const { lookupOne } = require('../../src/helpers');

describe('lookupOne', () => {
    const bucket = process.env.BUCKET_NAME;
    const s3 = new S3({
        credentials: fromIni({ profile: process.env.AWS_PROFILE }),
        region: "us-east-1",
    });

    beforeEach(async () => {
        await setupAction();
    });

    it('should retrieve single record by id', async () => {
        const record = await lookupOne({ bucket, collection: 'Cars', s3, id: '1' });
        expect(record).toBeDefined();
        expect(record.id.toString()).toBe('1');
    });

    afterEach(async () => {
        await teardownAction('Cars', { force: true });
    });
}); 