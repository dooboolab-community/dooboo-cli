# dooboo-cli

[![Npm Version](http://img.shields.io/npm/v/dooboo-cli.svg?style=flat-square)](https://npmjs.org/package/dooboo-cli)
[![Downloads](http://img.shields.io/npm/dm/dooboo-cli.svg?style=flat-square)](https://npmjs.org/package/dooboo-cli)
[![Build Status](https://travis-ci.com/dooboolab/dooboo-cli.svg?branch=master)](https://travis-ci.com/dooboolab/dooboo-cli)
![License](http://img.shields.io/npm/l/dooboo-cli.svg?style=flat-square)
[![Greenkeeper badge](https://badges.greenkeeper.io/dooboolab/dooboo-cli.svg)](https://greenkeeper.io/)

## Quick News
- [v3 release announcement](https://medium.com/dooboolab/announcing-dooboo-cli-v3-5c9fceeb2ac4)
- Latest stable version is `3.2.0`.
- Please install `3.1.0` if you'd like to cover the [post install step](https://reactnavigation.org/docs/en/getting-started.html) for `react-navigation`.

## Compatability
- version 3

  - React

    | package           | necessary |
    | ----------------- | --------- |
    | react-router-dom  | >= 5.0.0  |
    | styled-components | >= 4.0.0  |
    | react             | >= 16.9.0 |

  - React Native

    | package           | necessary |
    | ----------------- | --------- |
    | react-navigation  | >= 5.0.0  |
    | styled-components | >= 4.0.0  |
    | react-native      | >= 59.0.0 |

  - React Native & Expo Templates

    | dooboo-cli         | RN template   | Expo template   |
    | ------------------ | ------------- | --------------- |
    | 3.3.11             | 0.61.5        | 36              |
    | 3.4.+              | 0.62.+        | 37              |

## Stacks we use

#### Web based project

- [react](https://github.com/facebook/react)
- [react-router](https://github.com/ReactTraining/react-router)
- [styled-components](https://github.com/styled-components/styled-components)
- [jest](https://github.com/facebook/jest)
- [react-testing-library](https://github.com/kentcdodds/react-testing-library)
- [typescript](https://github.com/Microsoft/TypeScript)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [prettier](https://prettier.io)

#### Native mobile based project

- [react-native](https://github.com/facebook/react-native)
- [react-navigation](https://github.com/react-navigation/react-navigation)
- [localization](https://github.com/stefalda/ReactNativeLocalization)
- [styled-components](https://github.com/styled-components/styled-components)
- [@testing-library/react-native](https://github.com/testing-library/native-testing-library)
- [typescript](https://github.com/Microsoft/TypeScript)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [prettier](https://prettier.io)

## Important

- You should use `dooboo-cli` from version `1.1.0` because there was a movement of codes in this version which won't work as expected in previous version. This will be fixed for now.
- Another major migration has been done in version `1.4.1`. With the release of `react-hook` we decided to make our major boilerplates into `functional` rather than `oop` style (which was most suitable with `mobx`).
- From `dooboo-cli@2.0.0` we decided to remove `flow` projects since, those aren't maintained well enough as `ts` projects since we focus on `typescript`. Therefore, flow projects are currently deprecated.

## Installation

- with npm
  ```
    npm install -g dooboo-cli
  ```
- with yarn
  ```
    yarn global add dooboo-cli
  ```

## Usage

```
  Usage: dooboo [source file]

  Options:
    -V, --version        output the version number
    -h, --help           output usage information

  Commands:
    init                 init boilerplate of dooboo generated app.
    start                start the project
    test                 run test for your project
    screen <c>           generate screen component.
    shared <c>           generate shared component.
    api <c>              generate file for api call format.
```

## Preview

![image](https://user-images.githubusercontent.com/27461460/63132984-1798d080-bffe-11e9-9b4d-672662b79540.png)

## Contribution

- [React App with Flow](https://github.com/react-native-seoul/dooboo-frontend-js) [![CircleCI](https://circleci.com/gh/dooboolab/dooboo-frontend-js.svg?style=shield)](https://circleci.com/gh/dooboolab/dooboo-frontend-js) `Deprecated`
- [React Native App with Flow](https://github.com/react-native-seoul/dooboo-native-js) [![CircleCI](https://circleci.com/gh/dooboolab/dooboo-frontend-js.svg?style=shield)](https://circleci.com/gh/dooboolab/dooboo-native-js) `Deprecated`
- [React App with Typescript](https://github.com/react-native-seoul/dooboo-frontend-ts) [![CircleCI](https://circleci.com/gh/dooboolab/dooboo-frontend-js.svg?style=shield)](https://circleci.com/gh/dooboolab/dooboo-frontend-ts)
- [React Native App with Typescript](https://github.com/react-native-seoul/dooboo-native-ts) [![CircleCI](https://circleci.com/gh/dooboolab/dooboo-frontend-js.svg?style=shield)](https://circleci.com/gh/dooboolab/dooboo-native-ts)
- [Expo with Typescript](https://github.com/react-native-seoul/dooboo-expo) [![CircleCI](https://circleci.com/gh/dooboolab/dooboo-expo.svg?style=shield)](https://circleci.com/gh/dooboolab/dooboo-expo)

## TODO

- [x] Support navigation templates for `react` & `react-native`
- [x] Upgrade template to `react@16.9.+`
- [x] Upgrade template to `react-native@0.60.+`
- [x] Upgrade template to `react-navigation v3`
- [ ] Support personal boilerplate option for `react-native`
