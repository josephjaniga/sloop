const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { setupAction } = require('../../src/cli/actions/setup');
const { teardownAction } = require('../../src/cli/actions/teardown');
const { getOne, getLookupTableJson } = require('../../src/helpers');

describe('getOne', () => {
    const bucket = process.env.BUCKET_NAME;
    const s3 = new S3({
        credentials: fromIni({ profile: process.env.AWS_PROFILE }),
        region: "us-east-1",
    });

    beforeEach(async () => {
        await setupAction();
    });

    it('should retrieve single record by guid', async () => {
        const lookupTable = await getLookupTableJson({ bucket, collection: 'Cars', s3 });
        const firstGuid = Object.values(lookupTable)[0];
        const record = await getOne({ bucket, collection: 'Cars', s3, guid: firstGuid });
        expect(record).toBeDefined();
        expect(record.guid).toBe(firstGuid);
    });

    afterEach(async () => {
        await teardownAction('Cars', { force: true });
    });
}); 