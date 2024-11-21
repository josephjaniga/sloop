/**
 * This function should perform the lookup table validation
 *
 * @param {Object} options
 * @param {Object} options.data - the new record data json object to be validated
 * @param {Object} options.lookupTableJson - the lookup table json object
 * @returns {void} - This function should not return anything
 */
function validation_LookupTableJson(options) {

    let {
        data,
        lookupTableJson
    } = options;

    // if the id already exists in the lookupTable.json file, throw an error
    if (lookupTableJson[data.id] !== undefined) {
        throw new Error("The id already exists in the lookupTable.json file");
    }

    // convert a keyed object lookupTableJson to an array of objects
    let lookupTableJsonArray = Object.keys(lookupTableJson)
        .map((id) => {
            return {
                id: id,
                guid: lookupTableJson[id]
            };
        });

    let preexistingGuids = lookupTableJsonArray
        .filter((item) => item.guid === data.guid);

    if (preexistingGuids.length > 0) {
        throw new Error("The guid already exists in the lookupTable.json file");
    }

}

module.exports = {
    validation_LookupTableJson
};