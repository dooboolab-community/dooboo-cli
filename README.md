# dooboo-cli
<p align="left">
  <a href="https://npmjs.org/package/dooboo-cli"><img alt="npm version" src="http://img.shields.io/npm/v/dooboo-cli.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/dooboo-cli"><img alt="npm version" src="http://img.shields.io/npm/dm/dooboo-cli.svg?style=flat-square"></a>
</p>
=========

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
    model <c>            generate model class.
    store <c>            generate store class.
    api <c>              generate file for api call format.
```

## Post Installation
* Replace `/android/build.gradle` to [LINK](https://github.com/react-native-seoul/react-native-js-boilerplate/blob/master/android/build.gradle)
* Replace `/android/app/build.gradle` to [Link](https://github.com/react-native-seoul/react-native-js-boilerplate/blob/master/android/app/build.gradle)

## Preview
![alt text](https://firebasestorage.googleapis.com/v0/b/bookoo-89f6c.appspot.com/o/dooboo.png?alt=media&token=e0317870-8525-4878-9f61-ab0fc6ab35ea)

## Contribution
* [React App with Flow](https://github.com/react-native-seoul/react-js-boilerplate)
* [React Native App with Flow](https://github.com/react-native-seoul/react-native-js-boilerplate)
* [React App with Typescript](https://github.com/dooboolab/dooboo-frontend)
* [React Native App with Typescript](https://github.com/dooboolab/dooboo-native)

## Troubleshoot
* If android build failed, apply below in `build.gradle` for `react-native-localization` module.
  ```gradle
  apply plugin: 'com.android.library'

  android {
    compileSdkVersion rootProject.ext.compileSdkVersion
    buildToolsVersion rootProject.ext.buildToolsVersion

    defaultConfig {
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        ndk {
            abiFilters "armeabi-v7a", "x86"
        }
    }
  }

  dependencies { compile 'com.facebook.react:react-native:+' }
  ```

## TODO
- [ ] Support navigation templates for `react-native`
- [ ] Support personal boilerplate option for `react-native`
- [x] Upgrade template to `react-native@0.56`
