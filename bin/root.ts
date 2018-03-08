#!/usr/bin/env node
'use strict';

import {
  camelCaseToDash,
  isCamelCase,
  upperCamelize,
  camelize,
  fsExists,
  exec,
} from '../utils/functions';

import { setTimeout } from 'timers';
import chalk from 'chalk';

// const prompt = require('cli-prompt');
import inquirer = require('inquirer');
import ora = require('ora');
import download = require('download-git-repo');
import selectShell = require('select-shell');
import shell = require('shelljs');
import path = require('path');
import program = require('commander');
import fs = require('fs');
import pkg = require('../package.json');

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
  'EXPO': 3,
};

/**
 * init
 */
program
  .version(pkg.version)
  .command('init')
  .description('init boilerplate of dooboo generated app.')
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
        .option(' Expo App with typescript  ', TYPE_OF_APP['EXPO'])
        .list();
    
    list.on('select', function(options){
      console.log(chalk.yellow('select the name of the app.'));
      // console.log(options[0].value);
      if (options[0].value === TYPE_OF_APP['NODE']) {
        console.log(chalk.red('sorry we currently do not support node express starter.'));
        process.exit(0);
      }

      inquirer.prompt([{
        name: 'value',
        message: 'name of your app(camel-case): ',
      }]).then(answer => {
        const nameOfApp = answer.value;
        if (!nameOfApp) {
          console.log(chalk.redBright('please provide name of your app.'));
          process.exit(0);
        } else if (!isCamelCase(nameOfApp)) {
          console.log(chalk.redBright('app name should be camel-case.'));
          process.exit(0);
        }

        let template = '';
        // console.log(options[0].value);
        if (options[0].value === TYPE_OF_APP['REACT']) {
          template = 'github.com:dooboolab/dooboo-frontend';
        } else if (options[0].value === TYPE_OF_APP['REACT-NATIVE']) {
          template = 'github.com:dooboolab/dooboo-native';
        } else if (options[0].value === TYPE_OF_APP['EXPO']) {
          template = 'github.com:dooboolab/dooboo-expo';
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
              'failed to download repo ' + template + ': ' + err.message.trim()
            ));
            process.exit(0);
          }

          setTimeout(function() {
            // shell.exec(`rm -rf ./${nameOfApp}/.git`);
            shell.sed('-i', 'dooboo-starter', camelCaseToDash(`${nameOfApp}`), `./${nameOfApp}/package.json`);
            spinner.stop();
            console.log(chalk.green(answer.value + ' created.'));
            console.log(chalk.cyanBright('cd ' + answer.value + ' and dooboo start.'));
            process.exit(0);
          }, 2000);
        });
      });
    });
    
    list.on('cancel', function(options){
      console.log('cancel list, '+ options.length +' options selected');
      process.exit(0);
    });
  });

program
  .command('start')
  .description('start the project.')
  .action(async function() {
    const spinner = ora('configuring project...');
    spinner.start();

    let exists = await fsExists('.dooboo');
    if (!exists) {
      console.log(chalk.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
      spinner.stop();
      process.exit(0);
      return;
    }

    exists = await fsExists('node_modules');
    if (!exists) {
      console.log(chalk.cyanBright('installing dependencies...'));
      shell.exec(`npm install`, function(code) {
        if (code === 0) {
          console.log(chalk.cyanBright('running project...'));
          shell.exec(`npm run dev`);
          spinner.stop();
          // process.exit(0);
          return;
        }
        console.log(chalk.redBright('failed installing dependencies. Please try again with npm install.'))
      });
      return;
    }
    console.log(chalk.cyanBright('running project...'));
    // shell.exec(`npm start`);
    shell.exec(`npm run dev`);
    spinner.stop();
  });

program
  .command('test')
  .description('run test for your project.')
  .action(async function() {
    const spinner = ora('configuring project...');
    spinner.start();

    let exists = await fsExists('.dooboo');
    if (!exists) {
      console.log(chalk.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
      spinner.stop();
      process.exit(0);
      return;
    }

    exists = await fsExists('node_modules');
    console.log(chalk.cyanBright('\nchecking packages...'));

    if (!exists) {
      console.log(chalk.cyanBright('installing dependencies...'));
      shell.exec(`npm install`, function(code) {
        if (code === 0) {
          console.log(chalk.cyanBright('running project...'));
          shell.exec(`npm test`);
          spinner.stop();
          // process.exit(0);
          return;
        }
        console.log(chalk.redBright('failed installing dependencies. Please try again with npm install.'))
      });
      return;
    }
    console.log(chalk.cyanBright('testing project...'));
    // shell.exec(`npm start`);
    shell.exec(`npm test`);
    spinner.stop();
    // process.exit(0);
  });

program
  .command('screen <c>')
  .description('generate screen component.')
  .action(async function(c) {
    let exists = await fsExists('.dooboo');
    if (!exists) {
      console.log(chalk.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
      process.exit(0);
      return;
    }
    const camel = camelize(c); // inside component is camelCase.
    const upperCamel = upperCamelize(c); // file name is upperCamelCase.

    const componentFile = `./src/components/screen/${upperCamel}.tsx`;
    const testFile = `./src/components/screen/__tests__/${upperCamel}.test.tsx`;

    exists = await fsExists(componentFile);
    if (exists) {
      console.log(chalk.redBright(`${upperCamel} screen already exists. Delete or rename existing component first.`));
      process.exit(0);
      return;
    }

    exists = await fsExists('.dooboo/react.js');
    let tsx, tsxTest;
    if (exists) {
      tsx = path.resolve(__dirname, '..', 'templates/react/screen/Screen.tsx');
      tsxTest = path.resolve(__dirname, '..', 'templates/react/screen/Screen.test.tsx');
      console.log(chalk.cyanBright(`creating screen component...`));
      shell.cp(tsx, componentFile);
      shell.cp(tsxTest, testFile);
      shell.sed('-i', 'Screen', `${camel}`, testFile);
      console.log(
        chalk.green(
`generated: src/components/screen/${upperCamel}.tsx
testFile: src/components/screen/__tests__/${upperCamel}.test.tsx`
        ));
      process.exit(0);
      return;
    }

    exists = await fsExists('.dooboo/react-native.js');
    if (exists) {
      tsx = path.resolve(__dirname, '..', 'templates/react-native/screen/Screen.tsx');
      tsxTest = path.resolve(__dirname, '..', 'templates/react-native/screen/Screen.test.tsx');
      console.log(chalk.cyanBright(`creating screen component...`));
      shell.cp(tsx, componentFile);
      shell.cp(tsxTest, testFile);
      shell.sed('-i', 'Screen', `${camel}`, testFile);
      console.log(
        chalk.green(
`generated: src/components/screen/${upperCamel}.tsx
testFile: src/components/screen/__tests__/${upperCamel}.test.tsx`
        ));
      process.exit(0);
    }

    console.log(chalk.redBright('\nproject is not in dooboo repository. If you deleted any of file in .dooboo, you are not able to use dooboo-cli.'));
    process.exit(0);
  });

program
  .command('shared <c>')
  .description('generate shared component.')
  .action(async function(c) {
    let exists = await fsExists('.dooboo');
    if (!exists) {
      console.log(chalk.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
      process.exit(0);
      return;
    }
    const camel = camelize(c); // inside component is camelCase.
    const upperCamel = upperCamelize(c); // file name is upperCamelCase.

    const componentFile = `./src/components/shared/${upperCamel}.tsx`;
    const testFile = `./src/components/shared/__tests__/${upperCamel}.test.tsx`;

    exists = await fsExists(componentFile);
    if (exists) {
      console.log(chalk.redBright(`${upperCamel} shared already exists. Delete or rename existing component first.`));
      process.exit(0);
      return;
    }

    exists = await fsExists('.dooboo/react.js');
    let tsx, tsxTest;
    if (exists) {
      tsx = path.resolve(__dirname, '..', 'templates/react/shared/Shared.tsx');
      tsxTest = path.resolve(__dirname, '..', 'templates/react/shared/Shared.test.tsx');
      console.log(chalk.cyanBright(`creating shared component...`));
      shell.cp(tsx, componentFile);
      shell.cp(tsxTest, testFile);
      shell.sed('-i', 'Shared', `${camel}`, testFile);
      console.log(
        chalk.green(
`generated: src/components/shared/${upperCamel}.tsx
testFile: src/components/shared/__tests__/${upperCamel}.test.tsx`
        ));
      process.exit(0);
      return;
    }

    exists = await fsExists('.dooboo/react-native.js');
    if (exists) {
      tsx = path.resolve(__dirname, '..', 'templates/react-native/shared/Shared.tsx');
      tsxTest = path.resolve(__dirname, '..', 'templates/react-native/shared/Shared.test.tsx');
      console.log(chalk.cyanBright(`creating shared component...`));
      shell.cp(tsx, componentFile);
      shell.cp(tsxTest, testFile);
      shell.sed('-i', 'Shared', `${camel}`, testFile);
      console.log(
        chalk.green(
`generated: src/components/shared/${upperCamel}.tsx
testFile: src/components/shared/__tests__/${upperCamel}.test.tsx`
        ));
      process.exit(0);
    }

    console.log(chalk.redBright('\nproject is not in dooboo repository. If you deleted any of file in .dooboo, you are not able to use dooboo-cli.'));
    process.exit(0);
  });

program
  .command('model <c>')
  .description('generate model class.')
  .action(async function(c) {
    let exists = await fsExists('.dooboo');
    if (!exists) {
      console.log(chalk.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
      process.exit(0);
      return;
    }
    const camel = camelize(c); // inside component is camelCase.
    const upperCamel = upperCamelize(c); // file name is upperCamelCase.

    const modelFile = `./src/models/${upperCamel}.tsx`;

    exists = await fsExists(modelFile);
    if (exists) {
      console.log(chalk.redBright(`${upperCamel} model already exists. Delete or rename existing file first.`));
      process.exit(0);
      return;
    }
    const tsx = path.resolve(__dirname, '..', 'templates/common/Model.tsx');
    shell.cp(tsx, modelFile);
    shell.sed('-i', 'Model', `${upperCamel}`, modelFile);
    console.log(chalk.cyanBright(`creating model...`));
    console.log(
    chalk.green(`generated: src/models/${upperCamel}.tsx`));

    process.exit(0);
  });

program
  .command('store <c>')
  .description('generate store class.')
  .action(async function(c) {
    let exists = await fsExists('.dooboo');
    if (!exists) {
      console.log(chalk.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
      process.exit(0);
      return;
    }
    const camel = camelize(c); // inside component is camelCase.
    const upperCamel = upperCamelize(c); // file name is upperCamelCase.

    const storeFile = `./src/stores/${camel}.tsx`;

    exists = await fsExists(storeFile);
    if (exists) {
      console.log(chalk.redBright(`${camel} store already exists. Delete or rename existing file first.`));
      process.exit(0);
      return;
    }
    const tsx = path.resolve(__dirname, '..', 'templates/common/Store.tsx');
    shell.cp(tsx, storeFile);
    shell.sed('-i', 'Store', `${upperCamel}`, storeFile);
    console.log(chalk.cyanBright(`creating store...`));
    console.log(
    chalk.green(`generated: src/stores/${camel}.tsx`));

    process.exit(0);
  });

program
  .command('api <c>')
  .description('generate file for api call format.')
  .action(async function(c) {
    let exists = await fsExists('.dooboo');
    if (!exists) {
      console.log(chalk.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
      process.exit(0);
      return;
    }
    const camel = camelize(c); // inside component is camelCase.
    const upperCamel = upperCamelize(c); // file name is upperCamelCase.

    const apiFile = `./src/apis/${camel}.tsx`;

    exists = await fsExists(apiFile);
    if (exists) {
      console.log(chalk.redBright(`${upperCamel} store already exists. Delete or rename existing file first.`));
      process.exit(0);
      return;
    }
    const tsx = path.resolve(__dirname, '..', 'templates/common/Api.tsx');
    shell.cp(tsx, apiFile);
    console.log(chalk.cyanBright(`creating api file...`));
    console.log(
    chalk.green(`generated: src/apis/${camel}.tsx`));

    process.exit(0);
  });


program.parse(process.argv);

/**
 * RUN help when command is not valid.
 */
if (!program.args.length) {
  // show help by default
  program.parse([process.argv[0], process.argv[1], '-h']);
  process.exit(0);
} else {
  //warn aboud invalid commands
  const validCommands = program.commands.map(function(cmd){
    return cmd.name;
  });
  const invalidCommands = program.args.filter(function(cmd){
    //if command executed it will be an object and not a string
    return (typeof cmd === 'string' && validCommands.indexOf(cmd) === -1);
  });
  // if (invalidCommands.length) {
  //   console.log('\n [ERROR] - Invalid command: "%s". See "-h or --help" for a list of available commands.\n', invalidCommands.join(', '));
  //   process.exit(1);
  // }
}

// program
//   .arguments('<file>')
//   .option('-u, --username <username>', 'The user to authenticate as')
//   .option('-p, --password <password>', 'The user\'s password')
//   .action(function(file) {
//     console.log('user: %s pass: %s file: %s',
//     program.username, program.password, file);
//   })
//   .parse(process.argv);
