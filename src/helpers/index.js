const { createGuid } = require('./createGuid');
const { folderExists } = require('./folderExists.js');
const { getAllJson } = require("./getAllJson");
const { getLookupTableJson } = require("./getLookupTableJson");
const { getObjectOutputToJson } = require("./getObjectOutputToJson");
const { validation_LookupTableJson} = require("./validation.lookupTableJson");
const { validation_AllJson} = require("./validation.allJson");
const { pushRecordToAllJson} = require("./pushRecordToAllJson");
const { addRecordToLookupTableJson} = require("./addRecordToLookupTableJson");
const { getOne } = require("./getOne");
const { createRecord } = require("./createRecord");
const {lookupOne} = require("./lookupOne");

module.exports = {
    createGuid,
    folderExists,
    getAllJson,
    getLookupTableJson,
    getObjectOutputToJson,
    validation_AllJson,
    validation_LookupTableJson,
    pushRecordToAllJson,
    addRecordToLookupTableJson,
    getOne,
    lookupOne,
    createRecord,
};