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

## Preview
![alt text](https://firebasestorage.googleapis.com/v0/b/bookoo-89f6c.appspot.com/o/dooboo.png?alt=media&token=81d08aa5-fd73-46bb-81e1-1d757007b520)

## Troubleshoot
* If android build failed, apply below in `build.gradle` for `react-native-localization` module.
  ```gradle
  apply plugin: 'com.android.library'

  android {
    compileSdkVersion 26
    buildToolsVersion "26.0.2"

    defaultConfig {
        minSdkVersion 16
        targetSdkVersion 26
        versionCode 1
        versionName "1.0"
        ndk {
            abiFilters "armeabi-v7a", "x86"
        }
    }
  }

  dependencies { compile 'com.facebook.react:react-native:+' }
  ```
* Facing `Can't find variable Symbol` error in `window` or `ubuntu`.
  ```
  npm install --save mobx@3.6.2
  npm install --save mobx-react@4.4.3
  ```
