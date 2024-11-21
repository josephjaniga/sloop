const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { setupAction } = require('../../src/cli/actions/setup');
const { teardownAction } = require('../../src/cli/actions/teardown');
const { saveFile, getObjectOutputToJson } = require('../../src/helpers');

describe('saveFile', () => {
    const bucket = process.env.BUCKET_NAME;
    const s3 = new S3({
        credentials: fromIni({ profile: process.env.AWS_PROFILE }),
        region: "us-east-1",
    });

    beforeEach(async () => {
        await setupAction();
    });

    it('should save JSON data to S3', async () => {
        const testData = {
            id: '123',
            name: 'Test Data'
        };

        const collection = 'Cars';
        const filename = 'test-file.json';

        await saveFile({
            data: testData,
            s3,
            bucket,
            collection,
            filename
        });

        // Verify the file was saved correctly
        const response = await s3.getObject({
            Bucket: bucket,
            Key: `${collection}/${filename}`
        });

        const savedData = await getObjectOutputToJson(response);
        expect(savedData).toEqual(testData);
    });

    it('should overwrite existing file', async () => {
        const initialData = { id: '123', name: 'Initial' };
        const updatedData = { id: '123', name: 'Updated' };
        const collection = 'Cars';
        const filename = 'test-file.json';

        // Save initial data
        await saveFile({
            data: initialData,
            s3,
            bucket,
            collection,
            filename
        });

        // Overwrite with updated data
        await saveFile({
            data: updatedData,
            s3,
            bucket,
            collection,
            filename
        });

        // Verify the file was updated
        const response = await s3.getObject({
            Bucket: bucket,
            Key: `${collection}/${filename}`
        });

        const savedData = await getObjectOutputToJson(response);
        expect(savedData).toEqual(updatedData);
    });

    afterEach(async () => {
        await teardownAction('Cars', { force: true });
    });
}); 