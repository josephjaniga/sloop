const { v4: uuidv4 } = require('uuid');

/**
 * Creates a new random UUID/GUID using the uuid v4 library
 * 
 * @returns {string} A new random UUID string
 */
function createGuid() {
    // create and return a new random guid
    return uuidv4();
}

module.exports = {
    createGuid
};