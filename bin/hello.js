#!/usr/bin/env node
'use strict';

const ora = require('ora');
const download = require('download-git-repo');
const selectShell = require('select-shell');

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

const TYPE_OF_APP = {
  'REACT': 1,
  'REACT-NATIVE': 2,
  'NODEJS': 3,
};

program
  .command('create')
  .description('create boilerplate of cooni generate app.')
  .action(function(name) {
    // sed -i 's/original/new/g' file.txt
    // https://askubuntu.com/questions/20414/find-and-replace-text-within-a-file-using-commands
    console.log(chalk.cyanBright(welcome));
    console.log(chalk.yellow('Select which app you want to generate from cooni.'));

    const list = selectShell(
      {
        pointer: ' ▸ ',
        pointerColor: 'yellow',
        checked: ' ◉  ',
        unchecked:' ◎  ',
        checkedColor: 'blue',
        msgCancel: 'No selected options!',
        msgCancelColor: 'orange',
        multiSelect: false,
        inverse: true,
        prepend: true
      }
    );
    
    var stream = process.stdin;
    
    list.option(' React App with typescript  ', TYPE_OF_APP['REACT'])
        .option(' React Native App with typescript  ', TYPE_OF_APP['REACT-NATIVE'])
        .option(' Node.js app with typescript  ', TYPE_OF_APP['NODEJS'])
        .list();
    
    list.on('select', function(options){
      console.log(options[0].value);
      process.exit(0);
    });
    
    list.on('cancel', function(options){
      console.log('Cancel list, '+ options.length +' options selected');
      process.exit(0);
    });

    // const spinner = ora('downloading template')
    // spinner.start()
    // // Remove if local template exists
    // if (exists(tmp)) rm(tmp)
    // download(template, tmp, { clone }, err => {
    //   spinner.stop()
    //   if (err) logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim())
    //   generate(name, tmp, to, err => {
    //     if (err) logger.fatal(err)
    //     console.log()
    //     logger.success('Generated "%s".', name)
    //   })
    // })
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
