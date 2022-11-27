'use strict';

import {__dirname} from '../bin/root';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import shelljs from 'shelljs';

export interface TemplateType {
  file: string;
  testFile: string;
}

export const resolveTemplate = (
  projectType: string,
  componentType: string,
  componentName: string,
  fileExt = 'tsx',
): TemplateType => {
  const template = path.resolve(
    __dirname,
    '..',
    `templates/${projectType}/${componentType}s/${componentName}.${fileExt}`,
  );

  const testTemplate = path.resolve(
    __dirname,
    '..',
    `templates/${projectType}/${componentType}s/${componentName}.test.${fileExt}`,
  );

  return {
    file: template,
    testFile: testTemplate,
  };
};

export const resolveComponent = (
  componentType: string,
  name: string,
  fileExt = 'tsx',
): TemplateType => {
  const component = `./src/components/${componentType}s/${name}.${fileExt}`;
  const testComponent = `./test/components/${componentType}s/${name}.test.${fileExt}`;

  return {
    file: component,
    testFile: testComponent,
  };
};

export const exitIfNotDoobooRepo = async (): Promise<void> => {
  const exists = fs.existsSync('.dooboo');

  if (!exists) {
    shelljs.echo(
      chalk.redBright(
        '\nproject is not compatible with dooboo-cli v5. Are you sure you are in correct dir?',
      ),
    );

    process.exit(0);
  }
};

export const exitIfNotV5 = async (): Promise<void> => {
  const exists = fs.existsSync('.dooboo/v5');

  if (!exists) {
    shelljs.echo(
      chalk.redBright(
        `\nproject is not compatible with dooboo-cli v5.
        Maybe you are using older projects.
        Then please install version lower than dooboo-cli@5`,
      ),
    );

    process.exit(0);
  }
};

export const toCamelCase = (str: string, cap1st: boolean): string => {
  return ((cap1st ? '-' : '') + str).replace(/-+([^-])/g, (a, b) => {
    return b.toUpperCase();
  });
};

export const isCamelCase = (str: string): boolean => {
  if (toCamelCase(str, true) === str) {
    return true;
  } else {
    return false;
  }
};

export const camelCaseToDash = (str: string): string => {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
};

export const camelize = (str: string): string => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    // or if (/\s+/.test(match)) for white spaces

    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

export const upperCamelize = (str: string): string => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => {
    if (+match === 0) {
      return '';
    }
    // or if (/\s+/.test(match)) for white spaces

    return match.toUpperCase();
  });
};

export const exec = (command: string): Promise<string> => {
  return new Promise((resolve, reject): unknown =>
    shelljs.exec(command, {}, (code: number, value: string, error: string) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(value);
    }),
  );
};
