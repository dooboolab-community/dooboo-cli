#!/usr/bin/env node
'use strict';

import {
  camelCaseToDash,
  camelize,
  fsExists,
  upperCamelize,
} from '../utils/functions';

import chalk from 'chalk';
import { setTimeout } from 'timers';

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

enum TYPE_OF_APP {
  REACT = 1,
  REACT_NATIVE = 2,
  EXPO = 3,
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

const cbResultWeb = (
  template: string,
  nameOfApp: string,
  answer: any,
  options: any,
  spinner: ora.Ora,
): void => {
  shell.exec(
    `git clone ${template} ${nameOfApp}`,
    (code: number, stdout: string, stderr: string) => {
      if (code !== 0) {
        shell.echo(chalk.cyanBright(`code: ${code}`));
        shell.echo(chalk.cyanBright(`Program output: ${stdout}`));
        shell.echo(chalk.cyanBright(`Program stderr: ${stderr}`));
      }
      spinner.stop();

      setTimeout(function() {
        shell.sed(
          '-i',
          'dooboo-starter',
          camelCaseToDash(`${nameOfApp}`),
          `./${nameOfApp}/package.json`,
        );
        shell.exec('pwd');
        shell.rm('-rf', `${nameOfApp}/.git`);
        shell.rm('-rf', `${nameOfApp}/.circleci`);

        shell.echo(chalk.greenBright(answer.value + ' created.'));
        shell.echo(
          chalk.greenBright('cd ' + answer.value + ' and dooboo start.'),
        );
        spinner.stop();
        process.exit(0);
      }, 2000);
    },
  );
};

const cbResultApp = (
  template: string,
  nameOfApp: string,
  answer: any,
  options: any,
  spinner: ora.Ora,
): void => {
  shell.exec(
    `git clone ${template} ${nameOfApp}`,
    (code: number, stdout: string, stderr: string) => {
      if (code !== 0) {
        shell.echo(chalk.cyanBright(`code: ${code}`));
        shell.echo(chalk.cyanBright(`Program output: ${stdout}`));
        shell.echo(chalk.cyanBright(`Program stderr: ${stderr}`));
      }
      shell.exec(`cd ${nameOfApp} && react-native init ${nameOfApp}`);
      spinner.stop();

      setTimeout(function() {
        shell.sed(
          '-i',
          'dooboo-starter',
          camelCaseToDash(`${nameOfApp}`),
          `./${nameOfApp}/package.json`,
        );
        shell.exec('pwd');
        shell.rm('-rf', `${nameOfApp}/.git`);
        shell.rm('-rf', `${nameOfApp}/.circleci`);
        // // ==> Android config
        shell.cp(
          `${nameOfApp}/metro.config.js`,
          `${nameOfApp}/${nameOfApp}/metro.config.js`,
        );
        shell.cp(
          `${nameOfApp}/android/build.gradle`,
          `${nameOfApp}/${nameOfApp}/android/build.gradle`,
        );
        shell.cp(
          `${nameOfApp}/android/gradle/wrapper/gradle-wrapper.properties`,
          `${nameOfApp}/${nameOfApp}/android/gradle/wrapper/gradle-wrapper.properties`,
        );
        shell.rm('-rf', `${nameOfApp}/android/*`);
        shell.rm('-rf', `${nameOfApp}/ios/*`);
        shell.sed(
          '-i',
          'dooboo',
          `${nameOfApp.toLowerCase()}`,
          `./${nameOfApp}/${nameOfApp}/android/app/build.gradle`,
        );
        shell.cp('-R', `${nameOfApp}/${nameOfApp}/ios/*`, `${nameOfApp}/ios`);
        shell.cp(
          '-R',
          `${nameOfApp}/${nameOfApp}/android/*`,
          `${nameOfApp}/android`,
        );
        // // <== Android config

        if (options[0].value === TYPE_OF_APP.REACT_NATIVE) {
          shell.sed(
            '-i',
            'DOOBOO NATIVE',
            `${nameOfApp}`,
            `./${nameOfApp}/src/components/screen/Intro.tsx`,
          );
        } else {
          // REACT_NATIVE_JS
          shell.sed(
            '-i',
            'DOOBOO NATIVE',
            `${nameOfApp}`,
            `./${nameOfApp}/src/components/screen/Intro.js`,
          );
        }
        shell.sed('-i', 'dooboo', `${nameOfApp}`, `./${nameOfApp}/index.js`);
        shell.rm('-rf', `${nameOfApp}/${nameOfApp}`);

        if (os.type() === 'Darwin') {
          childProcess.execSync(
            `cd ${nameOfApp} && yarn && cd ios && pod install`,
            { stdio: 'inherit' },
          );
        } else {
          childProcess.execSync(`cd ${nameOfApp} && yarn`, {
            stdio: 'inherit',
          });
        }

        spinner.stop();

        shell.echo(chalk.greenBright(`Created ${nameOfApp} successfully.`));
        shell.echo(
          chalk.greenBright(
            `cd ${nameOfApp} and yarn start. Open up another terminal and yarn run ios.`,
          ),
        );
        spinner.stop();
        process.exit(0);
      }, 2000);
    },
  );
};

const cbResultExpo = (
  template: string,
  nameOfApp: string,
  answer: any,
  options: any,
  spinner: ora.Ora,
): void => {
  shell.exec(
    `git clone ${template} ${nameOfApp}`,
    (code: number, stdout: string, stderr: string) => {
      if (code !== 0) {
        shell.echo(chalk.cyanBright(`code: ${code}`));
        shell.echo(chalk.cyanBright(`Program output: ${stdout}`));
        shell.echo(chalk.cyanBright(`Program stderr: ${stderr}`));
      }
      shell.exec(`cd ${nameOfApp}`);
      spinner.stop();

      setTimeout(function() {
        shell.sed(
          '-i',
          'dooboo',
          camelCaseToDash(`${nameOfApp}`),
          `./${nameOfApp}/package.json`,
        );
        shell.sed(
          '-i',
          'dooboo',
          camelCaseToDash(`${nameOfApp}`),
          `./${nameOfApp}/app.json`,
        );
        shell.exec('pwd');
        shell.rm('-rf', `${nameOfApp}/.git`);
        shell.rm('-rf', `${nameOfApp}/.circleci`);

        spinner.stop();

        shell.echo(chalk.greenBright(`Created ${nameOfApp} successfully.`));
        shell.echo(
          chalk.greenBright(
            `cd ${nameOfApp} and yarn && yarn start. Open up another terminal and yarn run ios.`,
          ),
        );
        spinner.stop();
        process.exit(0);
      }, 2000);
    },
  );
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
    shell.echo(chalk.cyanBright(welcome));
    shell.echo(
      chalk.yellow('Select which app you want to generate from dooboo.'),
    );
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
                '-b master https://github.com/dooboolab/dooboo-native-ts.git';
              break;
            case TYPE_OF_APP.EXPO:
              template =
                '-b master https://github.com/dooboolab/dooboo-expo.git';
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
                  'Sorry, this script requires react-native-cli to be installed.',
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
    shell.echo(chalk.cyanBright('\nchecking packages...'));

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
  .command('screen <c>')
  .description('generate screen component.')
  .action(async function(c) {
    let exists = await fsExists('.dooboo');
    if (!exists) {
      shell.echo(
        chalk.redBright(
          '\nproject is not in dooboo repository. Are you sure you are in correct dir?',
        ),
      );
      process.exit(0);
    }
    // const camel = camelize(c); // inside component is camelCase.
    const upperCamel = upperCamelize(c); // file name is upperCamelCase.

    // const isTypescript = await fsExists('.dooboo/typescript');
    // const fileExt = isTypescript ? 'tsx' : 'js';
    const fileExt = 'tsx';

    const componentFile = `./src/components/screen/${upperCamel}.${fileExt}`;
    const testFile = `./src/components/screen/__tests__/${upperCamel}.test.${fileExt}`;

    exists = await fsExists(componentFile);
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
      const template = path.resolve(
        __dirname,
        '..',
        `templates/react/screen/Screen.${fileExt}`,
      );
      const templateTest = path.resolve(
        __dirname,
        '..',
        `templates/react/screen/Screen.test.${fileExt}`,
      );
      shell.echo(chalk.cyanBright('creating screen component...'));
      shell.cp(template, componentFile);
      shell.cp(templateTest, testFile);
      shell.sed('-i', 'Screen', `${upperCamel}`, testFile);
      shell.sed('-i', '../Screen', `../${upperCamel}`, testFile);
      shell.echo(
        chalk.green(
          `generated: src/components/screen/${upperCamel}.${fileExt}
testFile: src/components/screen/__tests__/${upperCamel}.test.${fileExt}`,
        ),
      );
      process.exit(0);
    }

    exists = await fsExists('.dooboo/react-native');
    if (exists) {
      const template = path.resolve(
        __dirname,
        '..',
        `templates/react-native/screen/Screen.${fileExt}`,
      );
      const templateTest = path.resolve(
        __dirname,
        '..',
        `templates/react-native/screen/Screen.test.${fileExt}`,
      );
      shell.echo(chalk.cyanBright('creating screen component...'));
      shell.cp(template, componentFile);
      shell.cp(templateTest, testFile);
      shell.sed('-i', 'Screen', `${upperCamel}`, testFile);
      shell.sed('-i', '../Screen', `../${upperCamel}`, testFile);
      shell.echo(
        chalk.green(
          `generated: src/components/screen/${upperCamel}.${fileExt}
testFile: src/components/screen/__tests__/${upperCamel}.test.${fileExt}`,
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
    let exists = await fsExists('.dooboo');
    if (!exists) {
      shell.echo(
        chalk.redBright(
          '\nproject is not in dooboo repository. Are you sure you are in correct dir?',
        ),
      );
      process.exit(0);
    }
    // const camel = camelize(c); // inside component is camelCase.
    const upperCamel = upperCamelize(c); // file name is upperCamelCase.

    // const isTypescript = await fsExists('.dooboo/typescript');
    // const fileExt = isTypescript ? 'tsx' : 'js';
    const fileExt = 'tsx';

    const componentFile = `./src/components/shared/${upperCamel}.${fileExt}`;
    const testFile = `./src/components/shared/__tests__/${upperCamel}.test.${fileExt}`;

    exists = await fsExists(componentFile);
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
      const template = path.resolve(
        __dirname,
        '..',
        `templates/react/shared/Shared.${fileExt}`,
      );
      const templateTest = path.resolve(
        __dirname,
        '..',
        `templates/react/shared/Shared.test.${fileExt}`,
      );
      shell.echo(chalk.cyanBright('creating shared component...'));
      shell.cp(template, componentFile);
      shell.cp(templateTest, testFile);
      shell.sed('-i', 'Shared', `${upperCamel}`, testFile);
      shell.sed('-i', '../Shared', `../${upperCamel}`, testFile);
      shell.echo(
        chalk.green(
          `generated: src/components/shared/${upperCamel}.${fileExt}
testFile: src/components/shared/__tests__/${upperCamel}.test.${fileExt}`,
        ),
      );
      process.exit(0);
    }

    exists = await fsExists('.dooboo/react-native');
    if (exists) {
      const template = path.resolve(
        __dirname,
        '..',
        `templates/react-native/shared/Shared.${fileExt}`,
      );
      const templateTest = path.resolve(
        __dirname,
        '..',
        `templates/react-native/shared/Shared.test.${fileExt}`,
      );
      shell.echo(chalk.cyanBright('creating shared component...'));
      shell.cp(template, componentFile);
      shell.cp(templateTest, testFile);
      shell.sed('-i', 'Shared', `${upperCamel}`, testFile);
      shell.sed('-i', '../Shared', `../${upperCamel}`, testFile);
      shell.echo(
        chalk.green(
          `generated: src/components/shared/${upperCamel}.${fileExt}
testFile: src/components/shared/__tests__/${upperCamel}.test.${fileExt}`,
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
    let exists = await fsExists('.dooboo');
    if (!exists) {
      shell.echo(
        chalk.redBright(
          '\nproject is not in dooboo repository. Are you sure you are in correct dir?',
        ),
      );
      process.exit(0);
    }

    const isTypescript = await fsExists('.dooboo/typescript');
    const fileExt = isTypescript ? 'tsx' : 'js';

    const camel = camelize(c); // inside component is camelCase.
    const upperCamel = upperCamelize(c); // file name is upperCamelCase.

    const apiFile = `./src/apis/${camel}.${fileExt}`;

    exists = await fsExists(apiFile);
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

program.parse(process.argv);

/**
 * RUN help when command is not valid.
 */
if (!program.args.length) {
  // show help by default
  program.parse([process.argv[0], process.argv[1], '-h']);
  process.exit(0);
} else {
  // warn aboud invalid commands
  let validCommands = program.commands.map(function(cmd) {
    return cmd.name;
  });
  let invalidCommands = program.args.filter(function(cmd) {
    // if command executed it will be an object and not a string
    return typeof cmd === 'string' && validCommands.indexOf(cmd) === -1;
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
        // warn about invalid commands
        validCommands = program.commands.map(function(cmd) {
          return cmd.name;
        });
        invalidCommands = program.args.filter(function(cmd) {
          // if command executed it will be an object and not a string
          return typeof cmd === 'string' && validCommands.indexOf(cmd) === -1;
        });
        if (invalidCommands.length) {
          shell.echo(
            `\n [ERROR] - Invalid command:
            "%s". See "-h or --help" for a list of available commands.\n`,
            invalidCommands.join(', '),
          );
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
//     shell.echo('user: %s pass: %s file: %s',
//     program.username, program.password, file);
//   })
//   .parse(process.argv);
