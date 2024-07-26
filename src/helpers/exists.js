async function folderExists(bucketName, folderName, s3Instance) {
    try {
        const params = {
            Bucket: bucketName,
            Prefix: `${folderName}/`,
            MaxKeys: 1
        };
        const data = await s3Instance.listObjectsV2(params);
        return data.Contents.length > 0;
    } catch (error) {
        // console.error("Error checking if folder exists:", error);
        return false;
    }
}

module.exports = {
    folderExists
};