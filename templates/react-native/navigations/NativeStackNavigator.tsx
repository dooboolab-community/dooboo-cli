import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import React from 'react';
import {useTheme} from 'dooboo-ui';

export type NativeStackParamList = {
  default: undefined;
};

export type NativeStackNavigationProps<
  T extends keyof NativeStackParamList = 'default',
> = NativeStackNavigationProp<NativeStackParamList, T>;

const Stack = createNativeStackNavigator<NativeStackParamList>();

function RootNavigator(): React.ReactElement {
  const {theme} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {color: theme.text},
        headerTintColor: theme.tintColor,
      }}>
      {/* <Stack.Screen name="Page" component={Page} /> */}
    </Stack.Navigator>
  );
}

export default RootNavigator;
