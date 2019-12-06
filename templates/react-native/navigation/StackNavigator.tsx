import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useThemeContext } from '../../providers/ThemeProvider';

const Stack = createStackNavigator();

function RootNavigator(): React.ReactElement {
  const { theme } = useThemeContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: { color: theme.fontColor },
        headerTintColor: theme.tintColor,
      }}
    >
      {/* <Stack.Screen name="Screen" component={Screen} /> */}
    </Stack.Navigator>
  );
}

export default RootNavigator;
