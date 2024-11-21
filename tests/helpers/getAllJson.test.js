const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { setupAction } = require('../../src/cli/actions/setup');
const { teardownAction } = require('../../src/cli/actions/teardown');
const { getAllJson } = require('../../src/helpers');

describe('getAllJson', () => {
    const bucket = process.env.BUCKET_NAME;
    const s3 = new S3({
        credentials: fromIni({ profile: process.env.AWS_PROFILE }),
        region: "us-east-1",
    });

    beforeEach(async () => {
        await setupAction();
    });

    it('should retrieve all records', async () => {
        const allRecords = await getAllJson({ bucket, collection: 'Cars', s3 });
        expect(Array.isArray(allRecords)).toBe(true);
        expect(allRecords.length).toBeGreaterThan(0);
    });

    afterEach(async () => {
        await teardownAction('Cars', { force: true });
    });
}); 