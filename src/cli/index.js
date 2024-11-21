#!/usr/bin/env node
const {program} = require('commander');
const {
    initAction,
    setupAction,
    lookupAction,
    teardownAction,
} = require('./actions');

program
    .version('0.1.0')
    .description('An example CLI application with Commander')
    .action(() => {
        console.log('⛵  No command specified. Try --help for a list of available commands.');
    });

program
    .command('init')
    .description('Initialize sloop')
    .action(initAction);

program
    .command('setup')
    .description('Setup sloop')
    .option('-f, --force', 'Force setup even if folders already exist')
    .action((options) => setupAction(options));

program
    .command('teardown')
    .description('Teardown sloop')
    .option('-f, --force', 'Force teardown without a prompt')
    .argument('<collection>', 'Key to teardown')
    .action((collection, options) => teardownAction(collection, options));

program
    .command('lookup')
    .description('Display Lookup Table for a given key, or lookup an id and display that item')
    .argument('<key>', 'Key to lookup the table for')
    .argument('[id]', 'Id to look for in the table')
    .action((key, id) => lookupAction(key, id));

program.parse(process.argv);