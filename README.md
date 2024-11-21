# ⛵ 🌊 sloop

Sloop is a simple tool for creating and accessing data lakes on AWS S3.
Yes, we are using S3 as a database - we make it easy to use and its cheap!

## 1. `sloop init`

 - running this command in the root of your project creates the configuration file `sloop.json`

## 2. Fill in the configuration

 - fill out an `.env` file in the root of your project
   - put in your AWS profile name `AWS_PROFILE`
   - put in your AWS bucket name `AWS_BUCKET`
     - TODO: AWS REGION?  

``` json
{
    schemas: {
        YOUR_SCHEMAS_HERE: {
            uniqueId: "YOUR_ID_FIELD_HERE",
            dataFile: "YOUR_DATA_FILE_PATH_HERE",
        },
    },
}
``` 

 - fill out your `sloop.json` file with the data information
   - name of schema
   - name of unique character
   - path to the data file to import

## 3. `sloop setup`

 - creates your data lake in your s3 bucket on AWS
   - creates a folder for your schema
   - inside the folder you get one json file of the data
     - it is named after the guid
 - Data Example
   - ```
     [
         {
             "id": 1,
             "guid": "AAAAAAAA-BBBB-CCCC-DDDD-111111111111",
         },
         { /*...*/ },
         {
             "id": "N",
             "guid": "AAAAAAAA-BBBB-CCCC-DDDD-222222222222",
         }
     ]
     ```
    - each record needs a unique guid
      - files in the bucket will be named after the guid
    - a lookup table is created in the folder
      - the keys are the `uniqueId` setup in your sloop.json
      - the values are the guid / filename on the bucket
      - allowing us to find a record by uniqueId
     