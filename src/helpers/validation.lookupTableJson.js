/**
 * Validates a record against the lookupTable.json to ensure no duplicate IDs or GUIDs
 * 
 * @param {Object} options - The options object
 * @param {Object} options.data - The record data to validate
 * @param {Object} options.lookupTableJson - The current lookup table JSON object
 * @returns {void} Throws an error if validation fails
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