#!/usr/bin/env node
const {program} = require('commander');
const {
    initAction,
    setupAction,
} = require('./actions');

program
    .version('0.1.0')
    .description('An example CLI application with Commander')
    .action(() => {
        console.log('No command specified. Try --help for a list of available commands.');
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

program.parse(process.argv);