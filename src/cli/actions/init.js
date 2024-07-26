const fs = require('fs');

module.exports.initAction = () => {

    const SLOOP_BASE = {
        schemas: {
            YOUR_SCHEMAS_HERE: {
                uniqueId: "YOUR_ID_FIELD_HERE",
                dataFile: "YOUR_DATA_FILE_PATH_HERE",
            },
            YOUR_SECOND_SCHEMA_HERE: {
                uniqueId: "YOUR_ID_FIELD_HERE",
                dataFile: "YOUR_DATA_FILE_PATH_HERE",
            },
        },
    };

    console.log('Initializing sloop.json file...');

    // get the location of the current directory the command was called from
    // and store it in a variable called `currentDirectory`
    const currentDirectory = process.cwd();

    // look for a directory node_modules in the current directory
    let nodeModulesExists = fs.existsSync(`${currentDirectory}/node_modules`);
    // look for a file package.json in the current directory
    let packageJsonExists = fs.existsSync(`${currentDirectory}/package.json`);
    // look for a file sloop.json in the current directory
    let sloopJsonExists = fs.existsSync(`${currentDirectory}/sloop.json`);

    if(sloopJsonExists) {
        console.warn(
            "WARNING sloop.json already exists in the current directory. \r\n" +
            "Please remove it before running this command. \r\n" +
            "Aborting..."
        );
        return;
    }

    if (nodeModulesExists && packageJsonExists) {
        // create a `sloop.json` file in the current directory if it doesn't already exist
        // with the content of SLOOP_BASE
        fs.writeFile(
            `${currentDirectory}/sloop.json`,
            JSON.stringify(SLOOP_BASE, null, 4),
            (error) => {
                if (!error) {
                    console.log('sloop.json file created successfully!');
                    console.log('make sure you have an .env file in the project root with the following:');
                    console.log('AWS_PROFILE=YOUR_AWS_PROFILE\r\n');
                    console.log('BUCKET_NAME=YOUR_BUCKET_NAME\r\n');
                }
            }
        );
    } else {
        console.warn(
            "WARNING This doesn't feel like the project root directory. \r\n" +
            "Please run this command from the root directory of your project."
        );
    }

};