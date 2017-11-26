#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const program = require('commander');
const shell = require('shelljs');
const welcome = `
______     ______     ______     __   __     __     
/\\  ___\\   /\\  __ \\   /\\  __ \\   /\\ "-.\\ \\   /\\ \\   
\\ \\ \\____  \\ \\ \\/\\ \\  \\ \\ \\/\\ \\  \\ \\ \\-.  \\  \\ \\ \\  
 \\ \\_____\\  \\ \\_____\\  \\ \\_____\\  \\ \\_\\\\"\\_\\  \\ \\_\\ 
  \\/_____/   \\/_____/   \\/_____/   \\/_/ \\/_/   \\/_/ 
`;

program
  .command('create-react-app <name>')
  .description('create boilerplate of react app.')
  .action(function(name) {
    // sed -i 's/original/new/g' file.txt
    // https://askubuntu.com/questions/20414/find-and-replace-text-within-a-file-using-commands
    console.log(chalk.cyanBright(welcome));
    console.log('creating ' + name + ' react app with cooni...');
  });

program
  .command('react-component <c>')
  .description('create react-component. Must run command on root of cooni\'s react-app.')
  .action(function(c) {
    console.log('creating ' + c + ' react componet...');
  });

program.parse(process.argv);

// program
//   .arguments('<file>')
//   .option('-u, --username <username>', 'The user to authenticate as')
//   .option('-p, --password <password>', 'The user\'s password')
//   .action(function(file) {
//     console.log('user: %s pass: %s file: %s',
//     program.username, program.password, file);
//   })
//   .parse(process.argv);
