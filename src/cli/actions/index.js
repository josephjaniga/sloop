const { initAction } = require('./init');
const { setupAction } = require('./setup');
const { lookupAction } = require('./lookup');
const { teardownAction } = require("./teardown");

module.exports = {
    initAction,
    setupAction,
    lookupAction,
    teardownAction,
};