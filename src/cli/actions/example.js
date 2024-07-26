// Require and configure dotenv
require('dotenv').config();

// AWS-SDK v3
const { S3 } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");

let credentials;

// Check if the AWS profile is set in the .env file
if (!process.env.AWS_PROFILE) {
    throw new Error(
        "Please set the AWS profile in the" +
        " .env file to use the AWS SDK"
    );
} else {
    credentials = fromIni({ profile: process.env.AWS_PROFILE });
}

const s3 = new S3({
    credentials: credentials,
    region: "us-east-1", // Specify your bucket's region
});

console.log("_______⛵__________");
console.log("🌊🌊🌊🌊🌊🌊🌊🌊🌊");
console.log("🌊 Hello, World!🌊");
console.log("🌊🌊🌊🌊🌊🌊🌊🌊🌊");

// setup flow is going to read the config file and then create the folders
// and lookup tables in the bucket using the role from env

const data = `<!DOCTYPE html>
<html>
<head></head>
<body>
<div style="background: red; color: white;">
<h1>Hello, World!</h1>
</div>
</body>
</html>`;

const putObjectParams = {
    Bucket: '00000.test.00000.safe.to.delete',
    Key: "index.html",
    Body: data,
    ContentType: 'text/html',
};

s3.putObject(putObjectParams).then((result)=>{
    console.log(result, "done")
});

// import flow is going to take an object of arrays named by key
// and ETL them to the bucket while updating the lookup tables