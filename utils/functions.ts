'use strict';

import chalk from 'chalk';
import shelljs = require('shelljs');
import fs = require('fs');

import path = require('path');

export interface TemplateType {
  file: string;
  testFile: string;
}

export const fsExists = function(file: fs.PathLike): Promise<boolean> {
  return new Promise((resolve): void => {
    fs.exists(file, function(exists) {
      resolve(exists);
    });
  });
};

export const resolveTemplate = (
  projectType: string,
  componentType: string,
  componentName: string,
  fileExt = 'tsx',
): TemplateType => {
  const template = path.resolve(
    __dirname,
    '..',
    `templates/${projectType}/${componentType}/${componentName}.${fileExt}`,
  );

  const testTemplate = path.resolve(
    __dirname,
    '..',
    `templates/${projectType}/${componentType}/${componentName}.test.${fileExt}`,
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
  const component = `./src/components/${componentType}/${name}.${fileExt}`;
  const testComponent = `./src/components/${componentType}/__tests__/${name}.test.${fileExt}`;

  return {
    file: component,
    testFile: testComponent,
  };
};

export const exitIfNotDoobooRepo = async (): Promise<void> => {
  const exists = await fsExists('.dooboo');

  if (!exists) {
    shelljs.echo(
      chalk.redBright(
        '\nproject is not in dooboo repository. Are you sure you are in correct dir?',
      ),
    );

    process.exit(0);
  }
};

export const toCamelCase = function(str: string, cap1st: boolean): string {
  return ((cap1st ? '-' : '') + str).replace(/-+([^-])/g, function(a, b) {
    return b.toUpperCase();
  });
};

export const isCamelCase = function(str: string): boolean {
  if (toCamelCase(str, true) === str) {
    return true;
  } else {
    return false;
  }
};

export const camelCaseToDash = function(str: string): string {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
};

export const camelize = function(str: string): string {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) {
      return '';
    } // or if (/\s+/.test(match)) for white spaces

    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

export const upperCamelize = function(str: string): string {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match) {
    if (+match === 0) {
      return '';
    } // or if (/\s+/.test(match)) for white spaces

    return match.toUpperCase();
  });
};

export const exec = function(command: string): Promise<string> {
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
