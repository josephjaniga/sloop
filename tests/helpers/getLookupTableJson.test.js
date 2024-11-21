const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { setupAction } = require('../../src/cli/actions/setup');
const { teardownAction } = require('../../src/cli/actions/teardown');
const { getLookupTableJson } = require('../../src/helpers');

describe('getLookupTableJson', () => {
    const bucket = process.env.BUCKET_NAME;
    const s3 = new S3({
        credentials: fromIni({ profile: process.env.AWS_PROFILE }),
        region: "us-east-1",
    });

    beforeEach(async () => {
        await setupAction();
    });

    it('should retrieve lookup table', async () => {
        const lookupTable = await getLookupTableJson({ bucket, collection: 'Cars', s3 });
        expect(lookupTable).toBeDefined();
        expect(typeof lookupTable).toBe('object');
    });

    afterEach(async () => {
        await teardownAction('Cars', { force: true });
    });
}); 