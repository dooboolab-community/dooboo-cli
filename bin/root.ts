#! /usr/bin/env node

'use strict';

import boxen from 'boxen';
import chalk from 'chalk';
import {Command} from 'commander';
import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import path from 'path';
import selectShell from 'select-shell';
import shell from 'shelljs';
import updateNotifier from 'update-notifier';
import {fileURLToPath} from 'url';

import pkg from '../package.json' assert {type: 'json'};
import type {ComponentType} from '../utils/functions.js';
import {
  camelize,
  exitIfNotDoobooRepo,
  resolveComponent,
  resolveTemplate,
  toPascalCase,
} from '../utils/functions.js';

import {cbResultExpo} from './cb.js';
import {EXPO_PROJECT_BRANCH} from './const.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

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

const program = new Command();

const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24, // 1 day
});

if (notifier.update) {
  shell.echo(
    chalk.blueBright(
      boxen(`Update available: ${notifier.update.latest}`, {padding: 1}),
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
  .action(() => {
    // sed -i 's/original/new/g' file.txt
    // https://askubuntu.com/questions/20414/find-and-replace-text-within-a-file-using-commands
    shell.echo(chalk.cyanBright(welcome));

    shell.echo(
      chalk.yellow('Select which app you want to generate from dooboo.'),
    );
    // const stream = process.stdin;

    list.option(' Expo App (Typescript) ', TYPE_OF_APP.EXPO).list();

    list.on('select', (options: any[]) => {
      shell.echo(chalk.yellow('select the name of the app.'));

      inquirer
        .prompt([
          {
            name: 'value',
            message: 'name of your app: ',
          },
        ])
        .then((answer) => {
          const nameOfApp = answer.value;

          if (!nameOfApp) {
            shell.echo(chalk.redBright('please provide name of your app.'));
            process.exit(0);
          }

          let template = '';

          switch (options[0].value) {
            case TYPE_OF_APP.EXPO:
              template = `-b ${EXPO_PROJECT_BRANCH} https://github.com/dooboolab-community/expo-router-starter.git`;

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

          const spinner = ora('Creating app ' + nameOfApp + '...\n');

          spinner.start();

          // Check programs are installed
          if (!shell.which('npx')) {
            shell.echo(
              chalk.redBright(
                'Sorry, this script requires npx to be installed.',
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

          if (options[0].value === TYPE_OF_APP.EXPO) {
            cbResultExpo(template, nameOfApp, answer, options, spinner);
          }
        });
    });

    list.on('cancel', (options: string) => {
      shell.echo(
        `Operation has been canceled, ${options.length} option was selected.`,
      );

      process.exit(0);
    });
  });

program
  .command('start')
  .description('Run the project')
  .action(async () => {
    const spinner = ora('Configuring project...\n');

    spinner.start();

    try {
      let exists = fs.existsSync('.dooboo');

      if (!exists) {
        shell.echo(
          chalk.redBright(
            '\nProject is not in dooboo repository. Are you sure you are in correct dir?',
          ),
        );

        spinner.stop();
        process.exit(0);
      }

      exists = fs.existsSync('node_modules');

      if (!exists) {
        shell.echo(chalk.cyanBright('Installing dependencies...'));

        shell.exec('yarn', (code) => {
          if (code === 0) {
            shell.echo(chalk.cyanBright('Running project...\n'));
            shell.exec('yarn start');

            return;
          }

          throw new Error();
        });

        return;
      }

      shell.echo(chalk.cyanBright('Running project...'));
      shell.exec('yarn start');
    } catch (err) {
      shell.echo(chalk.red(err));

      shell.echo(
        chalk.redBright(
          'Failed while installing dependencies. Please try again with yarn.',
        ),
      );
    } finally {
      spinner.stop();
      process.exit(0);
    }
  });

program
  .command('test')
  .description('Run all tests in your project.')
  .action(async () => {
    const spinner = ora('Configuring project...');
    spinner.start();
    exitIfNotDoobooRepo();
    shell.echo(chalk.cyanBright('\nChecking packages...'));

    const exists = fs.existsSync('node_modules');

    if (!exists) {
      shell.echo(chalk.cyanBright('Installing dependencies...'));

      shell.exec('yarn', (code) => {
        if (code === 0) {
          shell.echo(chalk.cyanBright('Running project...'));
          shell.exec('yarn test');
          spinner.stop();

          // process.exit(0);
          return;
        }

        shell.echo(
          chalk.redBright(
            'Failed installing dependencies. Please try again with yarn.',
          ),
        );
      });

      return;
    }

    shell.echo(chalk.cyanBright('Testing project...'));
    shell.exec('yarn test');
    spinner.stop();
    // process.exit(0);
  });

program
  .command('page <c>')
  .description(
    'Generate page component in `app` directory. The file name is converted to kebab-case from PascalCase which is user input.',
  )
  .action(async (c) => {
    exitIfNotDoobooRepo();

    const componentType: ComponentType = 'app';
    const upperCamel = toPascalCase(c); // file name is upperCamelCase.

    const component = resolveComponent({
      type: componentType,
      name: upperCamel,
    });

    let exists = fs.existsSync(component.file);

    if (exists) {
      shell.echo(
        chalk.redBright(
          `${upperCamel} page already exists. Delete or rename existing component first.`,
        ),
      );

      process.exit(0);
    }

    exists = fs.existsSync('.dooboo/expo');

    if (exists) {
      const template = resolveTemplate({
        projectType: 'expo',
        componentType,
      });

      shell.echo(
        chalk.cyanBright('Creating page component in app directory...'),
      );

      shell.cp(template.file, component.file);
      shell.cp(template.testFile, component.testFile);
      shell.sed('-i', 'Page', `${upperCamel}`, component.testFile);

      shell.sed(
        '-i',
        `../../${componentType}/Page`,
        `../../${componentType}/${upperCamel}`,
        component.testFile,
      );

      shell.echo(
        chalk.green(
          `Generated files.${'\n'}Component: ${component.file}${'\n'}Test: ${
            component.testFile
          }`,
        ),
      );

      process.exit(0);
    }
  });

program
  .command('ui <c>')
  .description('Generate ui component.')
  .action(async (c) => {
    exitIfNotDoobooRepo();

    const componentType: ComponentType = 'uis';
    const camel = camelize(c);
    const upperCamel = toPascalCase(camel);

    const component = resolveComponent({
      type: componentType,
      name: upperCamel,
    });

    let exists = fs.existsSync(component.file);

    if (exists) {
      shell.echo(
        chalk.redBright(
          `${upperCamel} template already exists. Delete or rename existing component first.`,
        ),
      );

      process.exit(0);
    }

    const template = resolveTemplate({
      componentType,
      projectType: 'expo',
    });

    shell.echo(chalk.cyanBright('Creating template component...'));
    shell.cp(template.file, component.file);
    shell.cp(template.testFile, component.testFile);

    shell.sed('-i', 'Component', `${upperCamel}`, component.file);
    shell.sed(
      '-i',
      '../../../src/uis/UI',
      `../../../src/uis/${upperCamel}`,
      component.testFile,
    );

    shell.echo(
      chalk.green(
        `Generated:${'\n'}File: ${component.file}${'\n'}testFile: ${
          component.testFile
        }`,
      ),
    );

    process.exit(0);
  });

program
  .command('api <c>')
  .description('Generate file for api call format.')
  .action(async (c) => {
    exitIfNotDoobooRepo();

    const camel = camelize(c);
    const upperCamel = toPascalCase(c);
    const apiFile = `./src/apis/${camel}.ts`;
    const apiTestFile = `./test/src/apis/${camel}.ts`;
    const exists = fs.existsSync(apiFile);

    if (exists) {
      shell.echo(
        chalk.redBright(
          `${upperCamel} file already exists. Delete or rename existing file first.`,
        ),
      );

      process.exit(0);
    }

    const template = path.resolve(__dirname, '..', `templates/common/Api.ts`);

    const testTemplate = path.resolve(
      __dirname,
      '..',
      `templates/common/Api.test.ts`,
    );

    shell.cp(template, apiFile);
    shell.cp(testTemplate, apiTestFile);
    shell.echo(chalk.cyanBright('Creating api file...'));

    shell.echo(
      chalk.green(
        `Generated files.${'\n'}File: ${apiFile}${'\n'}Test: ${apiTestFile}`,
      ),
    );

    process.exit(0);
  });

program
  .command('provider <c>')
  .description('generate provider file to use context api.')
  .action(async (c) => {
    exitIfNotDoobooRepo();

    const componentType: ComponentType = 'providers';
    const upperCamel = toPascalCase(c);

    const providerFile = `./src/${componentType}/${upperCamel}.tsx`;
    const providerTestFile = `./test/src/${componentType}/${upperCamel}.test.tsx`;
    const exists = fs.existsSync(providerFile);

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

    list.on('select', (options: any[]) => {
      const providerType = options[0].value;

      const template = path.resolve(
        __dirname,
        '..',
        `templates/expo/providers/${providerType}.tsx`,
      );

      const testTemplate = path.resolve(
        __dirname,
        '..',
        `templates/expo/providers/${providerType}.test.tsx`,
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

      shell.echo(chalk.cyanBright('Creating provider file...'));

      shell.echo(
        chalk.green(
          `Generated:${'\n'}File: ${providerFile}${'\n'}testFile: ${providerTestFile}`,
        ),
      );

      process.exit(0);
    });
  });

program.parse(process.argv);

let validCommands = program.commands.map((cmd) => {
  return cmd.name;
});

if (validCommands.length && process.argv[2]) {
  switch (process.argv[2]) {
    case 'init':
    case 'start':
    case 'test':
    case 'page':
    case 'ui':
    case 'provider':
    case 'api':
      break;
    default:
      validCommands = program.commands.map((cmd) => {
        return cmd.name;
      });

      shell.echo(
        `\n [ERROR] - Invalid command:
          "%s". See "-h or --help" for a list of available commands.\n`,
      );

      break;
  }
}
// program.parse([process.argv[0], process.argv[1], '-h']);
