import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useThemeContext } from '../../providers/ThemeProvider';

const Stack = createNativeStackNavigator();

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
