# dooboo-cli

The cli tool for building faster app with [Expo](http://expo.io) and [Expo Router](https://expo.github.io/router).

[![CI](https://github.com/dooboolab/dooboo-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/dooboolab/dooboo-cli/actions/workflows/ci.yml)
[![deploy pkg](https://github.com/dooboolab/dooboo-cli/actions/workflows/deploy.yml/badge.svg)](https://github.com/dooboolab/dooboo-cli/actions/workflows/deploy.yml)
[![Npm Version](http://img.shields.io/npm/v/dooboo.svg?style=flat-square)](https://npmjs.org/package/dooboo)
[![Downloads](http://img.shields.io/npm/dm/dooboo.svg?style=flat-square)](https://npmjs.org/package/dooboo)
[![Build Status](https://travis-ci.com/dooboolab/dooboo-cli.svg?branch=main)](https://travis-ci.com/dooboolab/dooboo-cli)
![License](http://img.shields.io/npm/l/dooboo.svg?style=flat-square)
[![Greenkeeper badge](https://badges.greenkeeper.io/dooboolab-community/dooboo-cli.svg)](https://greenkeeper.io/)

## Announcement

The new CLI tool, dooboo, is now available and can be used with the [npx](https://docs.npmjs.com/cli/commands/npx) command as shown.
```sh
npx dooboo init
```

We planned to deprecate [`dooboo-cli`](https://www.npmjs.com/package/dooboo-cli) :wrench:, a tool for speeding up React Native, React, and Expo development. Since Expo :rocket: supports development across Android, iOS, and web, we decided to concentrate our efforts on a single codebase and tool within this ecosystem, and we chose [Expo](https://expo.io) :tada:!

## Stacks used

- [react-native](https://github.com/facebook/react-native)
- [expo-router](https://expo.github.io/router)
- [emotion](https://emotion.sh)
- [dooboo-ui](https://github.com/dooboolab-community/dooboo-ui)
- [jest](https://github.com/facebook/jest)
- [react-native-testing-library](https://github.com/callstack/react-native-testing-library)
- [typescript](https://github.com/Microsoft/TypeScript)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [prettier](https://prettier.io)
- [react-native-web](https://github.com/necolas/react-native-web)
- [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization)

## Quick News

- In default, [dooboo-ui](https://github.com/dooboolab/dooboo-ui) ui framework is preinstalled in the project. Hope you like it 🧡.

## Usage

No installation required.

```sh
npx dooboo init
```

### More commands
```
  Usage: dooboo [source file]

  Options:
    -V, --version        output the version number
    -h, --help           output usage information

  Commands:
    init                 init boilerplate of dooboo generated app.
    start                start the project
    test                 run test for your project
    page <c>             generate page (aka screen) component.
    ui <c>               generate ui (aka shared) component.
    api <c>              generate file for api call format.
```

## Preview

![image](https://user-images.githubusercontent.com/27461460/63132984-1798d080-bffe-11e9-9b4d-672662b79540.png)

## Contribution

- [Expo Router Starter](https://github.com/dooboolab-community/expo-router-starter)
