const { v4: uuidv4 } = require('uuid');

function createGuid() {
    // create and return a new random guid
    return uuidv4();
}

module.exports = {
    createGuid
};