# dooboo-cli
[![Npm Version](http://img.shields.io/npm/v/dooboo-cli.svg?style=flat-square)](https://npmjs.org/package/dooboo-cli)
[![Downloads](http://img.shields.io/npm/dm/dooboo-cli.svg?style=flat-square)](https://npmjs.org/package/dooboo-cli)
[![Build Status](https://travis-ci.com/dooboolab/dooboo-cli.svg?branch=master)](https://travis-ci.com/dooboolab/dooboo-cli)
![License](http://img.shields.io/npm/l/dooboo-cli.svg?style=flat-square)
[![Greenkeeper badge](https://badges.greenkeeper.io/dooboolab/dooboo-cli.svg)](https://greenkeeper.io/)

=========
> We decided to remove `mobx` from all our major boilerplates in `dooboo-cli@1.4.+`. If you still want to use `mobx template`, you can choosing `legacy` template. However, `dooboo-cli` will not generate `mobx` template from `1.4.0`, so you may have to downgrade to `1.3.+`. The reason for removing `mobx` is that we thought this isn't suitable with what `react` brought up today as a design pattern. `Functional programming` has been powered by `react-hook` so we chose to remove work on `object-oriented programming` which was more suitable with `mobx`. We hope you enjoy what we've brought up today.

## Stacks we use
#### Web based project
* [react](https://github.com/facebook/react)
* [react-router](https://github.com/ReactTraining/react-router)
* [flow](https://github.com/facebook/flow) - for `js` project
* [styled-components](https://github.com/styled-components/styled-components)
* [jest](https://github.com/facebook/jest)
* [react-testing-library](https://github.com/kentcdodds/react-testing-library)
* [typescript](https://github.com/Microsoft/TypeScript) - for `ts` project
* [ts-jest](https://github.com/kulshekhar/ts-jest) - for `ts` project

#### Native mobile based project
* [react-native](https://github.com/facebook/react-native)
* [react-navigation](https://github.com/react-navigation/react-navigation)
* [localization](https://github.com/stefalda/ReactNativeLocalization)
* [styled-components](https://github.com/styled-components/styled-components)
* [flow](https://github.com/facebook/flow) - for `js` project
* [react-native-testing-library](https://github.com/callstack/react-native-testing-library)
* [typescript](https://github.com/Microsoft/TypeScript) - for `ts` project
* [ts-jest](https://github.com/kulshekhar/ts-jest) - for `ts` project

## Important
- You should use `dooboo-cli` from version `1.1.0` because there was a movement of codes in this version which won't work as expected in previous version. This will be fixed for now.
- Another major migration has been done in version `1.4.1`. With the release of `react-hook` we decided to make our major boilerplates into `functional` rather than `oop` style (which was most suitable with `mobx`).

## Installation
```
  npm install -g dooboo-cli
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
![alt text](https://firebasestorage.googleapis.com/v0/b/bookoo-89f6c.appspot.com/o/dooboo.png?alt=media&token=e0317870-8525-4878-9f61-ab0fc6ab35ea)

## Contribution
* [React App with Flow](https://github.com/react-native-seoul/dooboo-frontend-js) [![CircleCI](https://circleci.com/gh/dooboolab/dooboo-frontend-js.svg?style=shield)](https://circleci.com/gh/dooboolab/dooboo-frontend-js)
* [React Native App with Flow](https://github.com/react-native-seoul/dooboo-native-js) [![CircleCI](https://circleci.com/gh/dooboolab/dooboo-frontend-js.svg?style=shield)](https://circleci.com/gh/dooboolab/dooboo-native-js)
* [React App with Typescript](https://github.com/react-native-seoul/dooboo-frontend-ts) [![CircleCI](https://circleci.com/gh/dooboolab/dooboo-frontend-js.svg?style=shield)](https://circleci.com/gh/dooboolab/dooboo-frontend-ts)
* [React Native App with Typescript](https://github.com/react-native-seoul/dooboo-native-ts) [![CircleCI](https://circleci.com/gh/dooboolab/dooboo-frontend-js.svg?style=shield)](https://circleci.com/gh/dooboolab/dooboo-native-ts)
* [Expo with Typescript](https://github.com/react-native-seoul/dooboo-expo)

## TODO
- [ ] Support navigation templates for `react-native`
- [ ] Support personal boilerplate option for `react-native`
- [x] Upgrade template to `react@16.8.+`
- [x] Upgrade template to `react-native@0.59.+`
- [x] Upgrade template to `react-navigation v3`
