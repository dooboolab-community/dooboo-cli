'use strict';

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import shelljs from 'shelljs';

import {__dirname} from '../bin/root.js';

export type TemplateFileType = {
  file: string;
  testFile: string;
};

export type ComponentType =
  | 'app'
  | 'uis'
  | 'providers'
  | 'modals'
  | 'hooks'
  | 'fragments';

export type ProjectType = 'expo';

export const resolveTemplate = ({
  projectType,
  componentType,
  fileExt = 'tsx',
}: {
  projectType: ProjectType;
  componentType: ComponentType;
  fileExt?: string;
}): TemplateFileType => {
  const filePrefix =
    componentType === 'uis' ? 'UI' : componentType === 'app' ? 'Page' : '';

  const template = path.resolve(
    __dirname,
    '..',
    `templates/${projectType}/${componentType}/${filePrefix}.${fileExt}`,
  );

  const testTemplate = path.resolve(
    __dirname,
    '..',
    `templates/${projectType}/${componentType}/${filePrefix}.test.${fileExt}`,
  );

  return {
    file: template,
    testFile: testTemplate,
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

export const toPascalCase = (str: string): string => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => {
    if (+match === 0) {
      return '';
    }
    // or if (/\s+/.test(match)) for white spaces

    return match.toUpperCase();
  });
};

export function pascalToKebabCase(str: string): string {
  return str
    .replace(/\.?([A-Z]+)/g, (x, y) => '-' + y.toLowerCase())
    .replace(/^-/, '');
}

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

export const resolveComponent = ({
  type,
  name,
  fileExt = 'tsx',
}: {
  type: ComponentType;
  name: string;
  fileExt?: string;
}): TemplateFileType => {
  if (type === 'app') {
    const kebab = pascalToKebabCase(name);
    const component = `./${type}/${kebab}.${fileExt}`;
    const testComponent = `./test/${type}/${kebab}.test.${fileExt}`;

    return {
      file: component,
      testFile: testComponent,
    };
  }

  const component = `./src/${type}/${name}.${fileExt}`;
  const testComponent = `./test/src/${type}/${name}.test.${fileExt}`;

  return {
    file: component,
    testFile: testComponent,
  };
};
