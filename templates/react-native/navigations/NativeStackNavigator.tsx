import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import React from 'react';
import {useThemeContext} from '@dooboo-ui/native-theme';

export type NativeStackParamList = {
  default: undefined;
};

export type NativeStackNavigationProps<
  T extends keyof NativeStackParamList = 'default'
> = NativeStackNavigationProp<NativeStackParamList, T>;

const Stack = createNativeStackNavigator<NativeStackParamList>();

function RootNavigator(): React.ReactElement {
  const {theme} = useThemeContext();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {color: theme.fontColor},
        headerTintColor: theme.tintColor,
      }}>
      {/* <Stack.Screen name="Page" component={Page} /> */}
    </Stack.Navigator>
  );
}

export default RootNavigator;
