import {RN_VERSION} from './const';
import {camelCaseToDash} from '../utils/functions';
import chalk from 'chalk';
import {setTimeout} from 'timers';

import ora = require('ora');
import os = require('os');
import shell = require('shelljs');
import childProcess = require('child_process');

export const cbResultReact = (
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

      setTimeout(() => {
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

export const cbResultReactNative = (
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

      shell.exec(
        `cd ${nameOfApp} && npx react-native init ${nameOfApp} --version ${RN_VERSION}`,
      );

      spinner.stop();

      setTimeout(() => {
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

        shell.cp(
          `${nameOfApp}/android/app/src/main/java/com/dooboo/MainActivity.java`,
          `${nameOfApp}/${nameOfApp}/android/app/src/main/java/com/${nameOfApp.toLocaleLowerCase()}/MainActivity.java`,
        );

        shell.rm('-rf', `${nameOfApp}/android/*`);
        shell.rm('-rf', `${nameOfApp}/ios/*`);

        shell.sed(
          '-i',
          'dooboo',
          `${nameOfApp.toLowerCase()}`,
          `./${nameOfApp}/${nameOfApp}/android/app/build.gradle`,
        );

        shell.sed(
          '-i',
          'dooboo',
          `${nameOfApp.toLowerCase()}`,
          `./${nameOfApp}/${nameOfApp}/android/app/src/main/java/com/${nameOfApp.toLocaleLowerCase()}/MainActivity.java`,
        );

        shell.cp('-R', `${nameOfApp}/${nameOfApp}/ios/*`, `${nameOfApp}/ios`);

        shell.cp(
          '-R',
          `${nameOfApp}/${nameOfApp}/android/*`,
          `${nameOfApp}/android`,
        );

        shell.sed(
          '-i',
          'DOOBOO NATIVE',
          `${nameOfApp}`,
          `./${nameOfApp}/src/components/screen/Intro.tsx`,
        );

        shell.sed('-i', 'dooboo', `${nameOfApp}`, `./${nameOfApp}/index.js`);
        shell.rm('-rf', `${nameOfApp}/${nameOfApp}`);

        if (os.type() === 'Darwin')
          childProcess.execSync(`cd ${nameOfApp} && yarn && npx pod-install`, {
            stdio: 'inherit',
          });
        else
          childProcess.execSync(`cd ${nameOfApp} && yarn`, {
            stdio: 'inherit',
          });

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

export const cbResultExpo = (
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

      setTimeout(() => {
        shell.sed(
          '-i',
          'dooboo-starter',
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
