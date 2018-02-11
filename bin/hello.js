#!/usr/bin/env node
'use strict';

const pkg = require('../package.json');
const { setTimeout } = require('timers');
// const prompt = require('cli-prompt');
const inquirer = require('inquirer');
const ora = require('ora');
const download = require('download-git-repo');
const selectShell = require('select-shell');

const chalk = require('chalk');
const program = require('commander');
const shell = require('shelljs');
// const welcome = `
// ______     ______     ______     __   __     __     
// /\\  ___\\   /\\  __ \\   /\\  __ \\   /\\ "-.\\ \\   /\\ \\   
// \\ \\ \\____  \\ \\ \\/\\ \\  \\ \\ \\/\\ \\  \\ \\ \\-.  \\  \\ \\ \\  
//  \\ \\_____\\  \\ \\_____\\  \\ \\_____\\  \\ \\_\\\\"\\_\\  \\ \\_\\ 
//   \\/_____/   \\/_____/   \\/_____/   \\/_/ \\/_/   \\/_/ 
// `;
const welcome = `
 _| _  _ |_  _  _ | _ |_ 
(_|(_)(_)|_)(_)(_)|(_||_)
`;

const TYPE_OF_APP = {
  'REACT': 1,
  'REACT-NATIVE': 2,
  'NODE': 3,
};

program
  .version(pkg.version)
  .command('init')
  .description('Init boilerplate of dooboo generated app.')
  .action(function() {
    // sed -i 's/original/new/g' file.txt
    // https://askubuntu.com/questions/20414/find-and-replace-text-within-a-file-using-commands
    console.log(chalk.cyanBright(welcome));
    console.log(chalk.yellow('Select which app you want to generate from dooboo.'));
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
        .option(' Node.js app with typescript  ', TYPE_OF_APP['NODE'])
        .list();
    
    list.on('select', function(options){
      console.log(chalk.yellow('Select the name of the app.'));
      // console.log(options[0].value);
      if (options[0].value === TYPE_OF_APP['REACT-NATIVE']) {
        console.log(chalk.red('Sorry we currently do not support react-native starter.'));
        process.exit(0);
      } else if (options[0].value === TYPE_OF_APP['NODE']) { // NODE
        console.log(chalk.red('Sorry we currently do not support nodejs starter.'));
        process.exit(0);
      }

      inquirer.prompt([{
        name: 'value',
        message: 'Name of your app(camel-case): ',
      }]).then(answer => {
        const nameOfApp = answer.value;
        if (!nameOfApp) {
          console.log(chalk.redBright('Please provide name of your app.'));
          process.exit(0);
        } else if (!isCamelCase(nameOfApp)) {
          console.log(chalk.redBright('Your app name should be camel-case.'));
          process.exit(0);
        }

        let template = '';
        // console.log(options[0].value);
        if (options[0].value === TYPE_OF_APP['REACT']) {
          template = 'github.com:dooboolab/react-typescript-webpack-starter';
        } else if (options[0].value === TYPE_OF_APP['REACT-NATIVE']) {

        } else { // NODEJS

        }

        if (!template) {
          console.log(chalk.redBright('There is no template for current choice. Please try again.'));
          process.exit(0);
        }

        const spinner = ora('creating app ' + nameOfApp + '...');
        spinner.start();
        shell.exec('mkdir ' + nameOfApp);

        download(template, `./${nameOfApp}`, null, (err) => {
          spinner.stop();
          if (err) {
            console.log(chalk.redBright(
              'Failed to download repo ' + template + ': ' + err.message.trim()
            ));
            process.exit(0);
          }

          setTimeout(function() {
            spinner.stop();
            console.log(chalk.green(answer.value + ' created.'));
            console.log(chalk.cyanBright('cd ' + answer.value + ' and dooboo start.'));
            process.exit(0);
          }, 2000);
        });
      });
    });
    
    list.on('cancel', function(options){
      console.log('Cancel list, '+ options.length +' options selected');
      process.exit(0);
    });
  });

program
  .command('react-component <c>')
  .description('create react-component. Must run command on root of dooboo\'s react-app.')
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

String.prototype.toCamelCase = function(cap1st) {
  'use strict';
  return ((cap1st ? '-' : '') + this).replace(/-+([^-])/g, function(a, b) {
      return b.toUpperCase();
  });
};

function isCamelCase(str) {
  var strArr = str.split('');
  var string = '';
  for(var i in strArr){
    if (strArr[i].toUpperCase() === strArr[i]) {
      string += '-'+strArr[i].toLowerCase();
    } else {
      string += strArr[i];
    }
  }

  if (string.toCamelCase(true) === str) {
    return true;
  } else{
    return false;
  }
}
