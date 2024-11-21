/**
 * This function should perform the all.json validation
 *
 * @param {Object} options
 * @param {Object} options.data - the new record data json object to be validated
 * @param {Object} options.allJson - the all.json object
 * @returns {void} - This function should not return anything
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