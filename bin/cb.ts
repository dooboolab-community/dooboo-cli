import chalk from 'chalk';
import type {Ora} from 'ora';
import shell from 'shelljs';
import {setTimeout} from 'timers';

import {camelCaseToDash} from '../utils/functions';

export const cbResultExpo = (
  template: string,
  nameOfApp: string,
  answer: any,
  options: any,
  spinner: Ora,
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
          `./${nameOfApp}/app.config.ts`,
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
