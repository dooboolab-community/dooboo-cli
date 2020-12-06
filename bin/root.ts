#!/usr/bin/env node
'use strict';

import { EXPO_VERSION, RN_PROJECT_VERSION } from './const';
import {
  TemplateType,
  camelize,
  exitIfNotDoobooRepo,
  fsExists,
  resolveComponent,
  resolveTemplate,
  upperCamelize,
} from '../utils/functions';
import { cbResultApp, cbResultExpo, cbResultWeb } from './cb';

import chalk from 'chalk';

import inquirer = require('inquirer');
import ora = require('ora');
import os = require('os');
import selectShell = require('select-shell');
import shell = require('shelljs');
import path = require('path');
import program = require('commander');
import boxen = require('boxen');
import childProcess = require('child_process');
import updateNotifier = require('update-notifier');
import pkg = require('../package.json');

const welcome = `
 _| _  _ |_  _  _ | _ |_
(_|(_)(_)|_)(_)(_)|(_||_)
`;

export enum TYPE_OF_APP {
  REACT = 1,
  REACT_NATIVE = 2,
  EXPO = 3,
}

export enum TYPE_OF_RN_NAVIGATION {
  BottomTabNavigator = 'BottomTabNavigator',
  DrawerNavigator = 'DrawerNavigator',
  MaterialBottomTabNavigator = 'MaterialBottomTabNavigator',
  MaterialTopTabNavigator = 'MaterialTopTabNavigator',
  NativeStackNavigator = 'NativeStackNavigator',
  StackNavigator = 'StackNavigator',
}

export enum TYPE_OF_PROVIDER {
  ReducerProvider = 'ReducerProvider',
  StateProvider = 'StateProvider',
}

const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24, // 1 day
});

if (notifier.update) {
  shell.echo(
    chalk.blueBright(
      boxen(`Update available: ${notifier.update.latest}`, { padding: 1 }),
    ),
  );
}

const list = selectShell({
  pointer: ' ▸ ',
  pointerColor: 'yellow',
  checked: ' ◉  ',
  unchecked: ' ◎  ',
  checkedColor: 'blue',
  msgCancel: 'No selected options!',
  msgCancelColor: 'orange',
  multiSelect: false,
  inverse: true,
  prepend: true,
});

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
    shell.echo(chalk.cyanBright(welcome));

    shell.echo(
      chalk.yellow('Select which app you want to generate from dooboo.'),
    );
    // const stream = process.stdin;

    list
      .option(' React App (typescript) ', TYPE_OF_APP.REACT)
      .option(' React Native App (typescript) ', TYPE_OF_APP.REACT_NATIVE)
      .option(' Expo App (typescript) ', TYPE_OF_APP.EXPO)
      .list();

    list.on('select', function(options) {
      shell.echo(chalk.yellow('select the name of the app.'));

      inquirer
        .prompt([
          {
            name: 'value',
            message: 'name of your app (alphaNumeric): ',
          },
        ])
        .then((answer) => {
          const nameOfApp = answer.value;

          if (!nameOfApp) {
            shell.echo(chalk.redBright('please provide name of your app.'));
            process.exit(0);
          } else if (!/^[a-z0-9]+$/i.test(nameOfApp)) {
            shell.echo(chalk.redBright('app name should be alphaNumeric.'));
            process.exit(0);
          }

          let template = '';

          switch (options[0].value) {
            case TYPE_OF_APP.REACT:
              template =
                '-b master https://github.com/dooboolab/dooboo-frontend-ts.git';

              break;
            case TYPE_OF_APP.REACT_NATIVE:
              template =
                `-b release/${RN_PROJECT_VERSION} https://github.com/dooboolab/dooboo-native-ts.git`;

              break;
            case TYPE_OF_APP.EXPO:
              template =
                `-b release/${EXPO_VERSION} https://github.com/dooboolab/dooboo-expo.git`;

              break;
          }

          if (!template) {
            shell.echo(
              chalk.redBright(
                'There is no template for current choice. Please try again.',
              ),
            );

            process.exit(0);
          }

          const spinner = ora('creating app ' + nameOfApp + '...\n');

          spinner.start();

          if (options[0].value === TYPE_OF_APP.REACT_NATIVE) {
            /**
             * Check the installed package
             */
            if (!shell.which('react-native')) {
              shell.echo(
                chalk.redBright(
                  'Sorry, this script requires react-native to be installed. Are you in react-native project root?',
                ),
              );

              shell.exit(1);
            }

            if (!shell.which('git')) {
              shell.echo(
                chalk.redBright(
                  'Sorry, this script requires git to be installed.',
                ),
              );

              shell.exit(1);
            }

            if (!shell.which('yarn')) {
              shell.echo(
                chalk.redBright(
                  'Sorry, this script requires yarn to be installed.',
                ),
              );

              shell.exit(1);
            }

            if (os.type() === 'Darwin') {
              if (!shell.which('pod')) {
                shell.echo(
                  chalk.redBright(
                    `Sorry, this script requires cocoapod to be installed.
                    Are you on mac OS (darwin)?`,
                  ),
                );

                shell.exit(1);
              }
            }

            cbResultApp(template, nameOfApp, answer, options, spinner);
          } else if (options[0].value === TYPE_OF_APP.EXPO) {
            cbResultExpo(template, nameOfApp, answer, options, spinner);
          } else {
            cbResultWeb(template, nameOfApp, answer, options, spinner);
          }
        });
    });

    list.on('cancel', function(options: string) {
      shell.echo(
        `Operation has been canceled, ${options.length} option was selected.`,
      );

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
        shell.echo(
          chalk.redBright(
            '\nproject is not in dooboo repository. Are you sure you are in correct dir?',
          ),
        );

        spinner.stop();
        process.exit(0);
      }

      exists = await fsExists('node_modules');

      if (!exists) {
        shell.echo(chalk.cyanBright('installing dependencies...'));

        // childProcess.execSync(`yarn`, {stdio: 'inherit'})

        shell.exec('yarn', function(code) {
          if (code === 0) {
            shell.echo(chalk.cyanBright('running project...\n'));
            shell.exec('yarn run dev');

            // childProcess.execSync(`yarn run dev`, {stdio: 'inherit'});
            return;
          }

          shell.echo(
            chalk.redBright(
              'failed installing dependencies. Please try again with yarn.',
            ),
          );
        });

        return;
      }

      shell.echo(chalk.cyanBright('running project...'));
      // shell.exec(`yarn start`);
      shell.exec('yarn run dev');
      // childProcess.execFileSync('yarn', ['start'], {stdio: 'inherit'});
    } catch (err) {
      shell.echo(chalk.red(err));

      shell.echo(
        chalk.redBright(
          'failed installing dependencies. Please try again with yarn.',
        ),
      );
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

    exitIfNotDoobooRepo();

    shell.echo(chalk.cyanBright('\nchecking packages...'));

    const exists = await fsExists('node_modules');

    if (!exists) {
      shell.echo(chalk.cyanBright('installing dependencies...'));

      shell.exec('yarn', function(code) {
        if (code === 0) {
          shell.echo(chalk.cyanBright('running project...'));
          shell.exec('yarn test');
          spinner.stop();

          // process.exit(0);
          return;
        }

        shell.echo(
          chalk.redBright(
            'failed installing dependencies. Please try again with yarn.',
          ),
        );
      });

      return;
    }

    shell.echo(chalk.cyanBright('testing project...'));
    // shell.exec(`yarn start`);
    shell.exec('yarn test');
    spinner.stop();
    // process.exit(0);
  });

program
  .command('navigation <c>')
  .description('generate navigation component.')
  .action(async function(c) {
    exitIfNotDoobooRepo();

    const upperCamel = upperCamelize(c); // file name is upperCamelCase.
    const component = resolveComponent('navigation', upperCamel);

    let exists = await fsExists(component.file);

    if (exists) {
      shell.echo(
        chalk.redBright(
          `${upperCamel} navigation already exists. Delete or rename existing component first.`,
        ),
      );

      process.exit(0);
    }

    exists = await fsExists('.dooboo/react');

    if (exists) {
      const template = resolveTemplate('react', 'navigation', 'SwitchNavigator');

      shell.echo(chalk.cyanBright('creating navigation component...'));
      shell.cp(template.file, component.file);
      shell.cp(template.testFile, component.testFile);
      shell.sed('-i', 'SwitchNavigator', `${upperCamel}`, component.testFile);

      shell.sed(
        '-i',
        '../SwithNavigator',
        `../${upperCamel}`,
        component.testFile,
      );

      shell.echo(
        chalk.green(
          `generated: ${component.file}${'\n'}testFile: ${component.testFile}`,
        ),
      );

      process.exit(0);
    }

    exists = await fsExists('.dooboo/react-native');

    if (exists) {
      list
        .option(
          ' BottomTabNavigator ',
          TYPE_OF_RN_NAVIGATION.BottomTabNavigator,
        )
        .option(' DrawerNavigator ', TYPE_OF_RN_NAVIGATION.DrawerNavigator)
        .option(
          ' MaterialBottomTabNavigator ',
          TYPE_OF_RN_NAVIGATION.MaterialBottomTabNavigator,
        )
        .option(
          ' MaterialTopTabNavigator ',
          TYPE_OF_RN_NAVIGATION.MaterialTopTabNavigator,
        )
        .option(
          ' NativeStackNavigator ',
          TYPE_OF_RN_NAVIGATION.NativeStackNavigator,
        )
        .option(' StackNavigator ', TYPE_OF_RN_NAVIGATION.StackNavigator)
        .list();

      let template: TemplateType;

      list.on('select', function(options) {
        const navigationType = options[0].value;

        template = resolveTemplate('react-native', 'navigation', navigationType);

        shell.echo(chalk.cyanBright('creating navigation component...'));
        shell.cp(template.file, component.file);
        shell.cp(template.testFile, component.testFile);

        shell.echo(
          chalk.green(
            `generated: ${component.file}${'\n'}testFile: ${
              component.testFile
            }`,
          ),
        );

        process.exit(0);
      });
    }
  });

program
  .command('screen <c>')
  .description('generate screen component.')
  .action(async function(c) {
    exitIfNotDoobooRepo();

    // const camel = camelize(c); // inside component is camelCase.
    const upperCamel = upperCamelize(c); // file name is upperCamelCase.

    // const isTypescript = await fsExists('.dooboo/typescript');
    // const fileExt = isTypescript ? 'tsx' : 'js';
    const fileExt = 'tsx';

    const component = resolveComponent('screen', upperCamel, fileExt);

    let exists = await fsExists(component.file);

    if (exists) {
      shell.echo(
        chalk.redBright(
          `${upperCamel} screen already exists. Delete or rename existing component first.`,
        ),
      );

      process.exit(0);
    }

    exists = await fsExists('.dooboo/react');

    if (exists) {
      const template = resolveTemplate('react', 'screen', 'Screen');

      shell.echo(chalk.cyanBright('creating screen component...'));
      shell.cp(template.file, component.file);
      shell.cp(template.testFile, component.testFile);
      shell.sed('-i', 'Screen', `${upperCamel}`, component.file);
      shell.sed('-i', '../Screen', `../${upperCamel}`, component.testFile);

      shell.echo(
        chalk.green(
          `generated: ${component.file}${'\n'}testFile: ${component.testFile}`,
        ),
      );

      process.exit(0);
    }

    exists = await fsExists('.dooboo/react-native');

    if (exists) {
      const template = resolveTemplate('react-native', 'screen', 'Screen');

      shell.echo(chalk.cyanBright('creating screen component...'));
      shell.cp(template.file, component.file);
      shell.cp(template.testFile, component.testFile);
      shell.sed('-i', 'Screen', `${upperCamel}`, component.file);
      shell.sed('-i', '../Screen', `../${upperCamel}`, component.testFile);

      shell.echo(
        chalk.green(
          `generated: ${component.file}${'\n'}testFile: ${component.testFile}`,
        ),
      );

      process.exit(0);
    }

    shell.echo(
      chalk.redBright(
        `\nproject is not in dooboo repository.
        If you deleted any of file in .dooboo, you are not able to use dooboo-cli.`,
      ),
    );

    process.exit(0);
  });

program
  .command('shared <c>')
  .description('generate shared component.')
  .action(async function(c) {
    exitIfNotDoobooRepo();

    // const camel = camelize(c); // inside component is camelCase.
    const upperCamel = upperCamelize(c); // file name is upperCamelCase.

    // const isTypescript = await fsExists('.dooboo/typescript');
    // const fileExt = isTypescript ? 'tsx' : 'js';
    const component = resolveComponent('shared', upperCamel);

    let exists = await fsExists(component.file);

    if (exists) {
      shell.echo(
        chalk.redBright(
          `${upperCamel} shared already exists. Delete or rename existing component first.`,
        ),
      );

      process.exit(0);
    }

    exists = await fsExists('.dooboo/react');

    if (exists) {
      const template = resolveTemplate('react', 'shared', 'Shared');

      shell.echo(chalk.cyanBright('creating shared component...'));
      shell.cp(template.file, component.file);
      shell.cp(template.testFile, component.testFile);
      shell.sed('-i', 'Shared', `${upperCamel}`, component.file);
      shell.sed('-i', '../Shared', `../${upperCamel}`, component.testFile);

      shell.echo(
        chalk.green(
          `generated: ${component.file}${'\n'}testFile: ${component.testFile}`,
        ),
      );

      process.exit(0);
    }

    exists = await fsExists('.dooboo/react-native');

    if (exists) {
      const template = resolveTemplate('react-native', 'shared', 'Shared');

      shell.echo(chalk.cyanBright('creating shared component...'));
      shell.cp(template.file, component.file);
      shell.cp(template.testFile, component.testFile);
      shell.sed('-i', 'Shared', `${upperCamel}`, component.file);
      shell.sed('-i', '../Shared', `../${upperCamel}`, component.testFile);

      shell.echo(
        chalk.green(
          `generated: ${component.file}${'\n'}testFile: ${component.testFile}`,
        ),
      );

      process.exit(0);
    }

    shell.echo(
      chalk.redBright(
        `\nproject is not in dooboo repository.
        If you deleted any of file in .dooboo, you are not able to use dooboo-cli.`,
      ),
    );

    process.exit(0);
  });

program
  .command('api <c>')
  .description('generate file for api call format.')
  .action(async function(c) {
    exitIfNotDoobooRepo();

    const isTypescript = await fsExists('.dooboo/typescript');
    const fileExt = isTypescript ? 'tsx' : 'js';

    const camel = camelize(c);
    const upperCamel = upperCamelize(c);

    const apiFile = `./src/apis/${camel}.${fileExt}`;

    const exists = await fsExists(apiFile);

    if (exists) {
      shell.echo(
        chalk.redBright(
          `${upperCamel} store already exists. Delete or rename existing file first.`,
        ),
      );

      process.exit(0);
    }

    const template = path.resolve(
      __dirname,
      '..',
      `templates/common/Api.${fileExt}`,
    );

    shell.cp(template, apiFile);
    shell.echo(chalk.cyanBright('creating api file...'));
    shell.echo(chalk.green(`generated: src/apis/${camel}.${fileExt}`));

    process.exit(0);
  });

program
  .command('provider <c>')
  .description('generate provider file to use context api.')
  .action(async function(c) {
    exitIfNotDoobooRepo();

    const camel = camelize(c);
    const upperCamel = upperCamelize(c);

    const providerFile = `./src/providers/${upperCamel}.tsx`;
    const providerTestFile = `./src/providers/__tests__/${upperCamel}.test.tsx`;
    const exists = await fsExists(providerFile);

    if (exists) {
      shell.echo(
        chalk.redBright(
          `${upperCamel} store already exists. Delete or rename existing file first.`,
        ),
      );

      process.exit(0);
    }

    list
      .option(' Provider (Reducer Type) ', TYPE_OF_PROVIDER.ReducerProvider)
      .option(' Provider (State Type) ', TYPE_OF_PROVIDER.StateProvider)
      .list();

    list.on('select', function(options) {
      const providerType = options[0].value;

      const template = path.resolve(
        __dirname,
        '..',
        `templates/common/provider/${providerType}.tsx`,
      );

      const testTemplate = path.resolve(
        __dirname,
        '..',
        `templates/common/provider/${providerType}.test.tsx`,
      );

      shell.cp(template, providerFile);
      shell.cp(testTemplate, providerTestFile);
      shell.sed('-i', providerType, `${upperCamel}`, providerFile);
      shell.sed('-i', `${providerType}`, `${upperCamel}`, providerTestFile);

      shell.sed(
        '-i',
        `../${providerType}`,
        `../${upperCamel}`,
        providerTestFile,
      );

      shell.echo(chalk.cyanBright('creating provider file...'));

      shell.echo(
        chalk.green(
          `generated: ${providerFile}${'\n'}testFile: ${providerTestFile}`,
        ),
      );

      process.exit(0);
    });
  });

program.parse(process.argv);

let validCommands = program.commands.map(function(cmd) {
  return cmd.name;
});

if (validCommands.length && process.argv[2]) {
  switch (process.argv[2]) {
    case 'init':
    case 'start':
    case 'test':
    case 'navigation':
    case 'screen':
    case 'shared':
    case 'provider':
    case 'api':
      break;
    default:
      validCommands = program.commands.map(function(cmd) {
        return cmd.name;
      });

      shell.echo(
        `\n [ERROR] - Invalid command:
          "%s". See "-h or --help" for a list of available commands.\n`,
      );

      break;
  }
  // program.parse([process.argv[0], process.argv[1], '-h']);
}
