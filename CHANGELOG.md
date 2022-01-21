## 7.3.2

- Remove `withScreen` wrapper from the RN template.

## 7.3.0

- React Native Project with [expo modules](https://docs.expo.dev/bare/installing-expo-modules)

## 7.2.0

- TS config fixes and organize packages

## 7.1.2

- Remove `import React` from all templates. From `Expo 44`, this can be removed.

## 7.1.0

- Upgrade expo project to sdk `44`.

## 7.0.1

- Upgrade react-native-project to `0.66.3`.

## 7.0.0

- Upgrade react-native project to `0.66+` with [dooboo-ui](https://github.com/dooboolab/dooboo-ui) preinstalled.

- Upgrade expo project to sdk 43 with [dooboo-ui](https://github.com/dooboolab/dooboo-ui) preinstalled.

## 6.7.1

- Update packages

  ```
  @dooboo/eslint-config    ^0.8.2  →   ^0.8.5
  @types/inquirer          ^7.3.3  →   ^8.1.1
  @types/node            ^16.4.13  →  ^16.9.2
  typescript               ^4.3.5  →   ^4.4.3
  boxen                    ^5.0.1  →   ^5.1.2
  commander                ^8.1.0  →   ^8.2.0
  inquirer                 ^8.1.2  →   ^8.1.5
  ora                      ^5.4.1  →   ^6.0.1
  ```

## 6.7.0

- Upgrade RN project to 0.65.1

## 6.6.0

- Update expo project to sdk 42.

## 6.5.0

- Migrate `react` template to `emotion v11` and `react-router-dom v6`.

## 6.4.3

- Add `react-native link` command at the end. It now includes [dooboo-ui](https://dooboo-ui.dooboolab.com).

## 6.4.2

[Bugfix]

- Rename `package` in `MainActivity` to lowercase.

## 6.4.1

Fix file search from `app.json` to `app.config.ts`.

## 6.4.0

Integrate [dooboo-ui](https://github.com/dooboolab/dooboo-ui) to `react-native` and `expo` projects.

## 6.3.0

Update `react` and `react-native` templates to [emotion](https://emotion.sh)
Update `expo` project template to `sdk 41`.

## 6.2.1

Android app registry name to original.

## 6.2.0

React Native project is now based on `0.64.+`.

## 6.1.0

Changed generate component path: `templates` => `uis`

## 6.0.7

Fixed provider template paths.

## 6.0.6

Fix `sed` script during test file creation.
Changed `theme.font` => `theme.text` in template files.

## 6.0.5

Fix typo in `react-native` page tempalte.

## 6.0.4

Generate files in plural dir. Now the boilerplate has all plural folder name.

## 6.0.2

Boilerplates are not configured in atomic design pattern.

## 5.1.1

Changed react-native screen template text to `Page` from `Screen`. Because we now have `withScreen` wrapper in it which shouldn't be changed.

## 5.1.0

Added `withScreen` utility function imports rather than wrapping `Container` which is removed in `react-native` template.

## 5.0.2

Added below style for `react-native` screen template to fulfil the screen.

```css
flex: 1;
align-self: stretch;
```

## 5.0.0

- React Native template now support web!

- Renamed callback func more specifically

  - cbResultWeb to cbResultReact and cbResultApp to cbResultReactNative.
  - Replaced `cd ios && pod install to npx pod-install`.

- Renamed templates dir to `expo`
  Expo is the higher condition that overlap react-native. Since we now have some differences between react-native and expo templates, we separate them to expo

- Separated screen templates for rn and expo

- Changed pointing RN and EXPO project branches

- Applied new linting rules and refactor the codebase

- Added compatibility command for v5
