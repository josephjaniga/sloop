/**
 * Validates a record against the all.json file to ensure no duplicates
 * 
 * @param {Object} options - The options object
 * @param {Object} options.data - The record data to validate
 * @param {Array} options.allJson - The current all.json array
 * @returns {void} Throws an error if validation fails
 */
function validation_AllJson(options) {

    let {
        data,
        allJson
    } = options;

    let {
        guid,
        id
    } = data;

    // check if something exists with the same guid
    let guidExists = allJson.find((record) => record.guid === guid);

    if (guidExists !== undefined) {
        throw new Error(`A record with guid ${guid} already exists.`);
    }

    // check if something exists with the same id
    let idExists = allJson.find((record) => record.id === id);

    if (idExists !== undefined) {
        throw new Error(`A record with id ${id} already exists.`);
    }

}

module.exports = {
    validation_AllJson
};