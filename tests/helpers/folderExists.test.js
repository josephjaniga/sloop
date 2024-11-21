const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { folderExists } = require('../../src/helpers');
const { setupAction } = require('../../src/cli/actions/setup');
const { teardownAction } = require('../../src/cli/actions/teardown');

describe('folderExists', () => {
    const bucket = process.env.BUCKET_NAME;
    const s3 = new S3({
        credentials: fromIni({ profile: process.env.AWS_PROFILE }),
        region: "us-east-1",
    });

    beforeEach(async () => {
        await setupAction();
    });

    it('should return true for existing folder', async () => {
        const exists = await folderExists({
            bucket,
            collection: 'Cars',
            s3
        });
        expect(exists).toBe(true);
    });

    it('should return false for non-existing folder', async () => {
        const exists = await folderExists({
            bucket,
            collection: 'NonExistentFolder',
            s3
        });
        expect(exists).toBe(false);
    });

    afterEach(async () => {
        await teardownAction('Cars', { force: true });
    });
}); 