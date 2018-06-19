#!/usr/bin/env node
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("../utils/functions");
const timers_1 = require("timers");
const chalk_1 = require("chalk");
// const prompt = require('cli-prompt');
const inquirer = require("inquirer");
const ora = require("ora");
const download = require("download-git-repo");
const selectShell = require("select-shell");
const shell = require("shelljs");
const path = require("path");
const program = require("commander");
const childProcess = require("child_process");
const updateNotifier = require("update-notifier");
const boxen = require("boxen");
const pkg = require("../package.json");
const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24 // 1 day
});
if (notifier.update) {
    console.log(chalk_1.default.blueBright(boxen(`Update available: ${notifier.update.latest}`, { padding: 1 })));
}
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
    .action(function () {
    // sed -i 's/original/new/g' file.txt
    // https://askubuntu.com/questions/20414/find-and-replace-text-within-a-file-using-commands
    console.log(chalk_1.default.cyanBright(welcome));
    console.log(chalk_1.default.yellow('Select which app you want to generate from dooboo.'));
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
        prepend: true
    });
    var stream = process.stdin;
    list.option(' React App with typescript  ', TYPE_OF_APP['REACT'])
        .option(' React Native App with typescript  ', TYPE_OF_APP['REACT-NATIVE'])
        .option(' Expo App with typescript  ', TYPE_OF_APP['EXPO'])
        .list();
    list.on('select', function (options) {
        console.log(chalk_1.default.yellow('select the name of the app.'));
        // console.log(options[0].value);
        if (options[0].value === TYPE_OF_APP['NODE']) {
            console.log(chalk_1.default.red('sorry we currently do not support node express starter.'));
            process.exit(0);
        }
        inquirer.prompt([{
                name: 'value',
                message: 'name of your app(camel-case): ',
            }]).then(answer => {
            const nameOfApp = answer.value;
            if (!nameOfApp) {
                console.log(chalk_1.default.redBright('please provide name of your app.'));
                process.exit(0);
            }
            else if (!functions_1.isCamelCase(nameOfApp)) {
                console.log(chalk_1.default.redBright('app name should be camel-case.'));
                process.exit(0);
            }
            let template = '';
            // console.log(options[0].value);
            if (options[0].value === TYPE_OF_APP['REACT']) {
                template = 'github.com:dooboolab/dooboo-frontend';
            }
            else if (options[0].value === TYPE_OF_APP['REACT-NATIVE']) {
                template = 'github.com:dooboolab/dooboo-native';
            }
            else if (options[0].value === TYPE_OF_APP['EXPO']) {
                template = 'github.com:dooboolab/dooboo-expo';
            }
            if (!template) {
                console.log(chalk_1.default.redBright('There is no template for current choice. Please try again.'));
                process.exit(0);
            }
            const spinner = ora('creating app ' + nameOfApp + '...');
            spinner.start();
            if (options[0].value === TYPE_OF_APP['REACT-NATIVE']) {
                shell.exec(`mkdir ${nameOfApp} && cd ${nameOfApp} && react-native init ${nameOfApp}`);
            }
            else {
                shell.exec(`mkdir ${nameOfApp}`);
            }
            download(template, `./${nameOfApp}`, null, (err) => {
                spinner.stop();
                if (err) {
                    console.log(chalk_1.default.redBright('failed to download repo ' + template + ': ' + err.message.trim()));
                    process.exit(0);
                }
                timers_1.setTimeout(function () {
                    shell.sed('-i', 'dooboo-starter', functions_1.camelCaseToDash(`${nameOfApp}`), `./${nameOfApp}/package.json`);
                    if (options[0].value === TYPE_OF_APP['REACT-NATIVE']) {
                        shell.rm('-rf', `${nameOfApp}/.git`);
                        shell.rm('-rf', `${nameOfApp}/android`);
                        shell.rm('-rf', `${nameOfApp}/ios`);
                        shell.cp('-R', `${nameOfApp}/${nameOfApp}/ios`, `${nameOfApp}/ios`);
                        shell.cp('-R', `${nameOfApp}/${nameOfApp}/android`, `${nameOfApp}/android`);
                        shell.rm('-rf', `${nameOfApp}/${nameOfApp}`);
                        shell.sed('-i', 'DOOBOO NATIVE', `${nameOfApp}`, `./${nameOfApp}/src/components/screen/Intro.tsx`);
                        shell.sed('-i', 'dooboo', `${nameOfApp}`, `./${nameOfApp}/index.js`);
                        childProcess.execSync(`cd ${nameOfApp} && npm install && react-native link`, { stdio: 'inherit' });
                        spinner.stop();
                        console.log(chalk_1.default.greenBright(`Created ${nameOfApp} successfully.`));
                        console.log(chalk_1.default.greenBright(`cd ${nameOfApp} and npm start. Open up another terminal and npm run ios.`));
                    }
                    else {
                        console.log(chalk_1.default.greenBright(answer.value + ' created.'));
                        console.log(chalk_1.default.greenBright('cd ' + answer.value + ' and dooboo start.'));
                    }
                    process.exit(0);
                    spinner.stop();
                }, 2000);
            });
        });
    });
    list.on('cancel', function (options) {
        console.log('cancel list, ' + options.length + ' options selected');
        process.exit(0);
    });
});
program
    .command('start')
    .description('start the project.')
    .action(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = ora('configuring project...\n');
        spinner.start();
        try {
            let exists = yield functions_1.fsExists('.dooboo');
            if (!exists) {
                console.log(chalk_1.default.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
                spinner.stop();
                process.exit(0);
                return;
            }
            exists = yield functions_1.fsExists('node_modules');
            if (!exists) {
                console.log(chalk_1.default.cyanBright('installing dependencies...'));
                // childProcess.execSync(`npm install`, {stdio: 'inherit'})
                shell.exec(`npm install`, function (code) {
                    if (code === 0) {
                        console.log(chalk_1.default.cyanBright('running project...\n'));
                        shell.exec(`npm run dev`);
                        // childProcess.execSync(`npm run dev`, {stdio: 'inherit'});
                        return;
                    }
                    console.log(chalk_1.default.redBright('failed installing dependencies. Please try again with npm install.'));
                });
                return;
            }
            console.log(chalk_1.default.cyanBright('running project...'));
            // shell.exec(`npm start`);
            shell.exec(`npm run dev`);
            // childProcess.execFileSync('npm', ['start'], {stdio: 'inherit'});
        }
        catch (err) {
            console.log(chalk_1.default.red(err));
            console.log(chalk_1.default.redBright('failed installing dependencies. Please try again with npm install.'));
        }
        finally {
            spinner.stop();
            process.exit(0);
        }
    });
});
program
    .command('test')
    .description('run test for your project.')
    .action(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = ora('configuring project...');
        spinner.start();
        let exists = yield functions_1.fsExists('.dooboo');
        if (!exists) {
            console.log(chalk_1.default.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
            spinner.stop();
            process.exit(0);
            return;
        }
        exists = yield functions_1.fsExists('node_modules');
        console.log(chalk_1.default.cyanBright('\nchecking packages...'));
        if (!exists) {
            console.log(chalk_1.default.cyanBright('installing dependencies...'));
            shell.exec(`npm install`, function (code) {
                if (code === 0) {
                    console.log(chalk_1.default.cyanBright('running project...'));
                    shell.exec(`npm test`);
                    spinner.stop();
                    // process.exit(0);
                    return;
                }
                console.log(chalk_1.default.redBright('failed installing dependencies. Please try again with npm install.'));
            });
            return;
        }
        console.log(chalk_1.default.cyanBright('testing project...'));
        // shell.exec(`npm start`);
        shell.exec(`npm test`);
        spinner.stop();
        // process.exit(0);
    });
});
program
    .command('screen <c>')
    .description('generate screen component.')
    .action(function (c) {
    return __awaiter(this, void 0, void 0, function* () {
        let exists = yield functions_1.fsExists('.dooboo');
        if (!exists) {
            console.log(chalk_1.default.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
            process.exit(0);
            return;
        }
        const camel = functions_1.camelize(c); // inside component is camelCase.
        const upperCamel = functions_1.upperCamelize(c); // file name is upperCamelCase.
        const componentFile = `./src/components/screen/${upperCamel}.tsx`;
        const testFile = `./src/components/screen/__tests__/${upperCamel}.test.tsx`;
        exists = yield functions_1.fsExists(componentFile);
        if (exists) {
            console.log(chalk_1.default.redBright(`${upperCamel} screen already exists. Delete or rename existing component first.`));
            process.exit(0);
            return;
        }
        exists = yield functions_1.fsExists('.dooboo/react.js');
        let tsx, tsxTest;
        if (exists) {
            tsx = path.resolve(__dirname, '..', 'templates/react/screen/Screen.tsx');
            tsxTest = path.resolve(__dirname, '..', 'templates/react/screen/Screen.test.tsx');
            console.log(chalk_1.default.cyanBright(`creating screen component...`));
            shell.cp(tsx, componentFile);
            shell.cp(tsxTest, testFile);
            shell.sed('-i', 'Screen', `${camel}`, testFile);
            console.log(chalk_1.default.green(`generated: src/components/screen/${upperCamel}.tsx
testFile: src/components/screen/__tests__/${upperCamel}.test.tsx`));
            process.exit(0);
            return;
        }
        exists = yield functions_1.fsExists('.dooboo/react-native.js');
        if (exists) {
            tsx = path.resolve(__dirname, '..', 'templates/react-native/screen/Screen.tsx');
            tsxTest = path.resolve(__dirname, '..', 'templates/react-native/screen/Screen.test.tsx');
            console.log(chalk_1.default.cyanBright(`creating screen component...`));
            shell.cp(tsx, componentFile);
            shell.cp(tsxTest, testFile);
            shell.sed('-i', 'Screen', `${camel}`, testFile);
            console.log(chalk_1.default.green(`generated: src/components/screen/${upperCamel}.tsx
testFile: src/components/screen/__tests__/${upperCamel}.test.tsx`));
            process.exit(0);
        }
        console.log(chalk_1.default.redBright('\nproject is not in dooboo repository. If you deleted any of file in .dooboo, you are not able to use dooboo-cli.'));
        process.exit(0);
    });
});
program
    .command('shared <c>')
    .description('generate shared component.')
    .action(function (c) {
    return __awaiter(this, void 0, void 0, function* () {
        let exists = yield functions_1.fsExists('.dooboo');
        if (!exists) {
            console.log(chalk_1.default.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
            process.exit(0);
            return;
        }
        const camel = functions_1.camelize(c); // inside component is camelCase.
        const upperCamel = functions_1.upperCamelize(c); // file name is upperCamelCase.
        const componentFile = `./src/components/shared/${upperCamel}.tsx`;
        const testFile = `./src/components/shared/__tests__/${upperCamel}.test.tsx`;
        exists = yield functions_1.fsExists(componentFile);
        if (exists) {
            console.log(chalk_1.default.redBright(`${upperCamel} shared already exists. Delete or rename existing component first.`));
            process.exit(0);
            return;
        }
        exists = yield functions_1.fsExists('.dooboo/react.js');
        let tsx, tsxTest;
        if (exists) {
            tsx = path.resolve(__dirname, '..', 'templates/react/shared/Shared.tsx');
            tsxTest = path.resolve(__dirname, '..', 'templates/react/shared/Shared.test.tsx');
            console.log(chalk_1.default.cyanBright(`creating shared component...`));
            shell.cp(tsx, componentFile);
            shell.cp(tsxTest, testFile);
            shell.sed('-i', 'Shared', `${camel}`, testFile);
            console.log(chalk_1.default.green(`generated: src/components/shared/${upperCamel}.tsx
testFile: src/components/shared/__tests__/${upperCamel}.test.tsx`));
            process.exit(0);
            return;
        }
        exists = yield functions_1.fsExists('.dooboo/react-native.js');
        if (exists) {
            tsx = path.resolve(__dirname, '..', 'templates/react-native/shared/Shared.tsx');
            tsxTest = path.resolve(__dirname, '..', 'templates/react-native/shared/Shared.test.tsx');
            console.log(chalk_1.default.cyanBright(`creating shared component...`));
            shell.cp(tsx, componentFile);
            shell.cp(tsxTest, testFile);
            shell.sed('-i', 'Shared', `${camel}`, testFile);
            console.log(chalk_1.default.green(`generated: src/components/shared/${upperCamel}.tsx
testFile: src/components/shared/__tests__/${upperCamel}.test.tsx`));
            process.exit(0);
        }
        console.log(chalk_1.default.redBright('\nproject is not in dooboo repository. If you deleted any of file in .dooboo, you are not able to use dooboo-cli.'));
        process.exit(0);
    });
});
program
    .command('model <c>')
    .description('generate model class.')
    .action(function (c) {
    return __awaiter(this, void 0, void 0, function* () {
        let exists = yield functions_1.fsExists('.dooboo');
        if (!exists) {
            console.log(chalk_1.default.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
            process.exit(0);
            return;
        }
        const camel = functions_1.camelize(c); // inside component is camelCase.
        const upperCamel = functions_1.upperCamelize(c); // file name is upperCamelCase.
        const modelFile = `./src/models/${upperCamel}.tsx`;
        exists = yield functions_1.fsExists(modelFile);
        if (exists) {
            console.log(chalk_1.default.redBright(`${upperCamel} model already exists. Delete or rename existing file first.`));
            process.exit(0);
            return;
        }
        const tsx = path.resolve(__dirname, '..', 'templates/common/Model.tsx');
        shell.cp(tsx, modelFile);
        shell.sed('-i', 'Model', `${upperCamel}`, modelFile);
        console.log(chalk_1.default.cyanBright(`creating model...`));
        console.log(chalk_1.default.green(`generated: src/models/${upperCamel}.tsx`));
        process.exit(0);
    });
});
program
    .command('store <c>')
    .description('generate store class.')
    .action(function (c) {
    return __awaiter(this, void 0, void 0, function* () {
        let exists = yield functions_1.fsExists('.dooboo');
        if (!exists) {
            console.log(chalk_1.default.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
            process.exit(0);
            return;
        }
        const camel = functions_1.camelize(c); // inside component is camelCase.
        const upperCamel = functions_1.upperCamelize(c); // file name is upperCamelCase.
        const storeFile = `./src/stores/${camel}.tsx`;
        exists = yield functions_1.fsExists(storeFile);
        if (exists) {
            console.log(chalk_1.default.redBright(`${camel} store already exists. Delete or rename existing file first.`));
            process.exit(0);
            return;
        }
        const tsx = path.resolve(__dirname, '..', 'templates/common/Store.tsx');
        shell.cp(tsx, storeFile);
        shell.sed('-i', 'Store', `${upperCamel}`, storeFile);
        console.log(chalk_1.default.cyanBright(`creating store...`));
        console.log(chalk_1.default.green(`generated: src/stores/${camel}.tsx`));
        process.exit(0);
    });
});
program
    .command('api <c>')
    .description('generate file for api call format.')
    .action(function (c) {
    return __awaiter(this, void 0, void 0, function* () {
        let exists = yield functions_1.fsExists('.dooboo');
        if (!exists) {
            console.log(chalk_1.default.redBright('\nproject is not in dooboo repository. Are you sure you are in correct dir?'));
            process.exit(0);
            return;
        }
        const camel = functions_1.camelize(c); // inside component is camelCase.
        const upperCamel = functions_1.upperCamelize(c); // file name is upperCamelCase.
        const apiFile = `./src/apis/${camel}.tsx`;
        exists = yield functions_1.fsExists(apiFile);
        if (exists) {
            console.log(chalk_1.default.redBright(`${upperCamel} store already exists. Delete or rename existing file first.`));
            process.exit(0);
            return;
        }
        const tsx = path.resolve(__dirname, '..', 'templates/common/Api.tsx');
        shell.cp(tsx, apiFile);
        console.log(chalk_1.default.cyanBright(`creating api file...`));
        console.log(chalk_1.default.green(`generated: src/apis/${camel}.tsx`));
        process.exit(0);
    });
});
program.parse(process.argv);
/**
 * RUN help when command is not valid.
 */
if (!program.args.length) {
    // show help by default
    program.parse([process.argv[0], process.argv[1], '-h']);
    process.exit(0);
}
else {
    //warn aboud invalid commands
    const validCommands = program.commands.map(function (cmd) {
        return cmd.name;
    });
    const invalidCommands = program.args.filter(function (cmd) {
        //if command executed it will be an object and not a string
        return (typeof cmd === 'string' && validCommands.indexOf(cmd) === -1);
    });
    // if (invalidCommands.length) {
    //   console.log('\n [ERROR] - Invalid command: "%s". See "-h or --help" for a list of available commands.\n', invalidCommands.join(', '));
    //   process.exit(1);
    // }
}
//# sourceMappingURL=root.js.map