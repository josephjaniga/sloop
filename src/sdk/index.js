// ability to connect to AWS by default through Lambda / IAM / Roles / Permissions
// or ability to connect to AWS specifically

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

class Sloop {
    constructor(schema) {
        this.schema = schema;
        // check if it exists???
    }

    all() {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }

    create(data) {
        return new Promise((resolve, reject) => {
            resolve(data);
        });
    }

    get(guid) {
        return new Promise((resolve, reject) => {
            resolve(guid);
        });
    }

    lookup(id) {
        return new Promise((resolve, reject) => {
            resolve(id);
        });
    }

    update(guid, data) {
        return new Promise((resolve, reject) => {
            resolve(data);
        });
    }

}