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