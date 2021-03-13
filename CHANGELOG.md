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

* React Native template now support web!

* Renamed callback func more specifically

   - cbResultWeb to cbResultReact and cbResultApp to cbResultReactNative.
   - Replaced `cd ios && pod install to npx pod-install`.

* Renamed templates dir to `expo`
   Expo is the higher condition that overlap react-native. Since we now have some differences between react-native and expo templates, we separate them to expo

* Separated screen templates for rn and expo

* Changed pointing RN and EXPO project branches

* Applied new linting rules and refactor the codebase

* Added compatibility command for v5