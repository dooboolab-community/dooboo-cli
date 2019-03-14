#!/usr/bin/env node
'use strict';

import {
  camelCaseToDash,
  isCamelCase,
  upperCamelize,
  camelize,
  fsExists,
} from '../utils/functions';

import { setTimeout } from 'timers';
import chalk from 'chalk';
import boxen from 'boxen';

// const prompt = require('cli-prompt');
import inquirer = require('inquirer');
import ora = require('ora');
import selectShell = require('select-shell');
import shell = require('shelljs');
import path = require('path');
import program = require('commander');
import fs = require('fs');
import childProcess = require('child_process');
import updateNotifier = require('update-notifier');
import pkg = require('../package.json');

const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24 // 1 day
});

if (notifier.update) {
  console.log(
    chalk.blueBright(
      boxen(`Update available: ${notifier.update.latest}`, {padding: 1})
    )
  );
}

const cbResult = (template: string, nameOfApp: string, answer: any, options: any, spinner: any) => {
  shell.exec(`git clone ${template} ${nameOfApp}`, (code: number, stdout: string, stderr: string) => {
    if (code !== 0) {
      console.log(chalk.cyanBright(`code: ${code}`));
      console.log(chalk.cyanBright(`Program output: ${stdout}`));
      console.log(chalk.cyanBright(`Program stderr: ${stderr}`));
    }
    shell.exec(`cd ${nameOfApp} && react-native init ${nameOfApp}`);
    spinner.stop();

    setTimeout(function() {
      shell.sed('-i', 'dooboo-starter', camelCaseToDash(`${nameOfApp}`), `./${nameOfApp}/package.json`);
      if (options[0].value === TYPE_OF_APP.REACT_NATIVE_JS
        || options[0].value === TYPE_OF_APP.REACT_NATIVE_TS
      ) {
        shell.exec(`pwd`);
        shell.rm('-rf', `${nameOfApp}/.git`);
        shell.rm('-rf', `${nameOfApp}/.circleci`);
        // // ==> Android config
        shell.cp(`${nameOfApp}/metro.config.js`, `${nameOfApp}/${nameOfApp}/metro.config.js`);
        shell.cp(`${nameOfApp}/android/build.gradle`, `${nameOfApp}/${nameOfApp}/android/build.gradle`);
        shell.cp(`${nameOfApp}/android/gradle/wrapper/gradle-wrapper.properties`,
                 `${nameOfApp}/${nameOfApp}/android/gradle/wrapper/gradle-wrapper.properties`,
        );
        // shell.cp(`${nameOfApp}/android/app/build.gradle`, `${nameOfApp}/${nameOfApp}/android/app/build.gradle`);
        shell.rm('-rf', `${nameOfApp}/android/*`);
        shell.rm('-rf', `${nameOfApp}/ios/*`);
        shell.sed('-i', 'dooboo', `${nameOfApp.toLowerCase()}`, `./${nameOfApp}/${nameOfApp}/android/app/build.gradle`);
        shell.cp('-R', `${nameOfApp}/${nameOfApp}/ios/*`, `${nameOfApp}/ios`);
        shell.cp('-R', `${nameOfApp}/${nameOfApp}/android/*`, `${nameOfApp}/android`);
        // // <== Android config

        if (options[0].value === TYPE_OF_APP.REACT_NATIVE_TS) {
          shell.sed('-i', 'DOOBOO NATIVE', `${nameOfApp}`, `./${nameOfApp}/src/components/screen/Intro.tsx`);
        } else { // REACT_NATIVE_JS
          shell.sed('-i', 'DOOBOO NATIVE', `${nameOfApp}`, `./${nameOfApp}/src/components/screen/Intro.js`);
        }
        shell.sed('-i', 'dooboo', `${nameOfApp}`, `./${nameOfApp}/index.js`);
        shell.rm('-rf', `${nameOfApp}/${nameOfApp}`);

        childProcess.execSync(`cd ${nameOfApp} && npm install && react-native unlink react-native-localization && react-native unlink react-native-gesture-handler && react-native link react-native-localization && react-native link react-native-gesture-handler`, {stdio: 'inherit'});
        spinner.stop();

        console.log(chalk.greenBright(`Created ${nameOfApp} successfully.`));
        console.log(chalk.greenBright(`cd ${nameOfApp} and npm start. Open up another terminal and npm run ios.`));
      } else {
        console.log(chalk.greenBright(answer.value + ' created.'));
        console.log(chalk.greenBright('cd ' + answer.value + ' and dooboo start.'));
      }
      process.exit(0);
      spinner.stop();
    }, 2000);
  });
}

const welcome = `
 _| _  _ |_  _  _ | _ |_ 
(_|(_)(_)|_)(_)(_)|(_||_)
`;

enum TYPE_OF_APP {
  REACT_JS = 1,
  REACT_NATIVE_JS = 2,
  REACT_TS = 3,
  REACT_NATIVE_TS = 4,
  EXPO_TS = 5,
}

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
    
    list
      .option(' React App (flow) ', TYPE_OF_APP.REACT_JS)
      .option(' React Native App (flow) ', TYPE_OF_APP.REACT_NATIVE_JS)
      .option(' React App (typescript) ', TYPE_OF_APP.REACT_TS)
      .option(' React Native App (typescript) ', TYPE_OF_APP.REACT_NATIVE_TS)
      .option(' Expo App (typescript) ', TYPE_OF_APP.EXPO_TS)
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
        message: 'name of your app (alphaNumeric): ',
      }]).then(answer => {
        const nameOfApp = answer.value;
        if (!nameOfApp) {
          console.log(chalk.redBright('please provide name of your app.'));
          process.exit(0);
        } else if (!/^[a-z0-9]+$/i.test(nameOfApp)) {
          console.log(chalk.redBright('app name should be alphaNumeric.'));
          process.exit(0);
        }

        let template = '';
        // console.log(options[0].value);
        switch(options[0].value) {
          case TYPE_OF_APP.REACT_JS:
            template = '-b master https://github.com/dooboolab/dooboo-frontend-js.git';
            break;
          case TYPE_OF_APP.REACT_NATIVE_JS:
            template = '-b master https://github.com/dooboolab/dooboo-native-js.git';
            break;
          case TYPE_OF_APP.REACT_TS:
            template = '-b master https://github.com/dooboolab/dooboo-frontend-ts.git';
            break;
          case TYPE_OF_APP.REACT_NATIVE_TS:
            template = '-b master https://github.com/dooboolab/dooboo-native-ts.git';
            break;
          case TYPE_OF_APP.EXPO_TS:
            template = '-b master https://github.com/dooboolab/dooboo-expo.git';
            break;
        }

        if (!template) {
          console.log(chalk.redBright('There is no template for current choice. Please try again.'));
          process.exit(0);
        }

        const spinner = ora('creating app ' + nameOfApp + '...\n');
        spinner.start();
        if ( // REACT-NATIVE APP
          options[0].value === TYPE_OF_APP.REACT_NATIVE_JS
          || options[0].value === TYPE_OF_APP.REACT_NATIVE_TS
        ) {
          /**
           * Check the installed package
           */
          if (!shell.which('react-native')) {
            shell.echo(chalk.redBright('Sorry, this script requires react-native-cli to be installed.'));
            shell.exit(1);
          }
          if (!shell.which('git')) {
            shell.echo(chalk.redBright('Sorry, this script requires git to be installed.'));
            shell.exit(1);
          }

          cbResult(template, nameOfApp, answer, options, spinner)
        } else { // REACT or EXPO APP
          shell.exec(`mkdir ${nameOfApp}`,
            cbResult(template, nameOfApp, answer, options, spinner)
          );
        }
      });
    });
    
    list.on('cancel', function(options: string) {
      console.log(`Operation has been canceled, ${options.length} option was selected.`);
      process.exit(0);
    });
  });

program
  .command('start')
  .description('start the project.')
  .action(async function() {
    const spinner = ora('configuring project...\n');
    spinner.start();

    try {
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
  
        // childProcess.execSync(`npm install`, {stdio: 'inherit'})
  
        shell.exec(`npm install`, function(code) {
          if (code === 0) {
            console.log(chalk.cyanBright('running project...\n'));
            shell.exec(`npm run dev`);
            // childProcess.execSync(`npm run dev`, {stdio: 'inherit'});
            return;
          }
          console.log(chalk.redBright('failed installing dependencies. Please try again with npm install.'))
        });
        return;
      }
      console.log(chalk.cyanBright('running project...'));
      // shell.exec(`npm start`);
      shell.exec(`npm run dev`);
      // childProcess.execFileSync('npm', ['start'], {stdio: 'inherit'});
    } catch (err) {
      console.log(chalk.red(err));
      console.log(chalk.redBright('failed installing dependencies. Please try again with npm install.'))
    } finally {
      spinner.stop();
      process.exit(0);
    }
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

    const isTypescript = await fsExists('.dooboo/typescript');
    const fileExt = isTypescript ? 'tsx' : 'js';

    const componentFile = `./src/components/screen/${upperCamel}.${fileExt}`;
    const testFile = `./src/components/screen/__tests__/${upperCamel}.test.${fileExt}`;

    exists = await fsExists(componentFile);
    if (exists) {
      console.log(chalk.redBright(`${upperCamel} screen already exists. Delete or rename existing component first.`));
      process.exit(0);
      return;
    }

    exists = await fsExists('.dooboo/react');
    if (exists) {
      const template = path.resolve(__dirname, '..', `templates/react/screen/Screen.${fileExt}`);
      const templateTest = path.resolve(__dirname, '..', `templates/react/screen/Screen.test.${fileExt}`);
      console.log(chalk.cyanBright(`creating screen component...`));
      shell.cp(template, componentFile);
      shell.cp(templateTest, testFile);
      shell.sed('-i', 'Screen', `${upperCamel}`, testFile);
      shell.sed('-i', '../Screen', `../${upperCamel}`, testFile);
      console.log(
        chalk.green(
`generated: src/components/screen/${upperCamel}.${fileExt}
testFile: src/components/screen/__tests__/${upperCamel}.test.${fileExt}`
        ));
      process.exit(0);
      return;
    }

    exists = await fsExists('.dooboo/react-native');
    if (exists) {
      const template = path.resolve(__dirname, '..', `templates/react-native/screen/Screen.${fileExt}`);
      const templateTest = path.resolve(__dirname, '..', `templates/react-native/screen/Screen.test.${fileExt}`);
      console.log(chalk.cyanBright(`creating screen component...`));
      shell.cp(template, componentFile);
      shell.cp(templateTest, testFile);
      shell.sed('-i', 'Screen', `${upperCamel}`, testFile);
      shell.sed('-i', '../Screen', `../${upperCamel}`, testFile);
      console.log(
        chalk.green(
    `generated: src/components/screen/${upperCamel}.${fileExt}
testFile: src/components/screen/__tests__/${upperCamel}.test.${fileExt}`
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

    const isTypescript = await fsExists('.dooboo/typescript');
    const fileExt = isTypescript ? 'tsx' : 'js';

    const componentFile = `./src/components/shared/${upperCamel}.${fileExt}`;
    const testFile = `./src/components/shared/__tests__/${upperCamel}.test.${fileExt}`;

    exists = await fsExists(componentFile);
    if (exists) {
      console.log(chalk.redBright(`${upperCamel} shared already exists. Delete or rename existing component first.`));
      process.exit(0);
      return;
    }

    exists = await fsExists('.dooboo/react');
    if (exists) {
      const template = path.resolve(__dirname, '..', `templates/react/shared/Shared.${fileExt}`);
      const templateTest = path.resolve(__dirname, '..', `templates/react/shared/Shared.test.${fileExt}`);
      console.log(chalk.cyanBright(`creating shared component...`));
      shell.cp(template, componentFile);
      shell.cp(templateTest, testFile);
      shell.sed('-i', 'Shared', `${upperCamel}`, testFile);
      shell.sed('-i', '../Shared', `../${upperCamel}`, testFile);
      console.log(
        chalk.green(
`generated: src/components/shared/${upperCamel}.${fileExt}
testFile: src/components/shared/__tests__/${upperCamel}.test.${fileExt}`
        ));
      process.exit(0);
      return;
    }

    exists = await fsExists('.dooboo/react-native');
    if (exists) {
      const template = path.resolve(__dirname, '..', `templates/react-native/shared/Shared.${fileExt}`);
      const templateTest = path.resolve(__dirname, '..', `templates/react-native/shared/Shared.test.${fileExt}`);
      console.log(chalk.cyanBright(`creating shared component...`));
      shell.cp(template, componentFile);
      shell.cp(templateTest, testFile);
      shell.sed('-i', 'Shared', `${upperCamel}`, testFile);
      shell.sed('-i', '../Shared', `../${upperCamel}`, testFile);
      console.log(
        chalk.green(
`generated: src/components/shared/${upperCamel}.${fileExt}
testFile: src/components/shared/__tests__/${upperCamel}.test.${fileExt}`
        ));
      process.exit(0);
      return;
    }

    console.log(chalk.redBright('\nproject is not in dooboo repository. If you deleted any of file in .dooboo, you are not able to use dooboo-cli.'));
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

    const isTypescript = await fsExists('.dooboo/typescript');
    const fileExt = isTypescript ? 'tsx' : 'js';

    const camel = camelize(c); // inside component is camelCase.
    const upperCamel = upperCamelize(c); // file name is upperCamelCase.

    const apiFile = `./src/apis/${camel}.${fileExt}`;

    exists = await fsExists(apiFile);
    if (exists) {
      console.log(chalk.redBright(`${upperCamel} store already exists. Delete or rename existing file first.`));
      process.exit(0);
      return;
    }
    const template = path.resolve(__dirname, '..', `templates/common/Api.${fileExt}`);
    shell.cp(template, apiFile);
    console.log(chalk.cyanBright(`creating api file...`));
    console.log(
    chalk.green(`generated: src/apis/${camel}.${fileExt}`));

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
  if (invalidCommands.length && process.argv[2]) {
    switch (process.argv[2]) {
      case 'init':
      case 'start':
      case 'test':
      case 'screen':
      case 'shared':
      case 'model':
      case 'store':
      case 'api':
        break;
      default:
        //warn aboud invalid commands
        const validCommands = program.commands.map(function(cmd){
          return cmd.name;
        });
        const invalidCommands = program.args.filter(function(cmd){
          //if command executed it will be an object and not a string
          return (typeof cmd === 'string' && validCommands.indexOf(cmd) === -1);
        });
        if (invalidCommands.length) {
          console.log('\n [ERROR] - Invalid command: "%s". See "-h or --help" for a list of available commands.\n', invalidCommands.join(', '));
          process.exit(1);
        }
        break;
    }
  }
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
