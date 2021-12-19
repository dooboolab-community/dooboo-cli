import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import {useTheme} from 'dooboo-ui';

export type StackParamList = {
  default: undefined;
};

export type StackNavigationProps<T extends keyof StackParamList = 'default'> =
  StackNavigationProp<StackParamList, T>;

const Stack = createStackNavigator<StackParamList>();

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
      }}
    >
      {/* <Stack.Screen name="Page" component={Page} /> */}
    </Stack.Navigator>
  );
}

export default RootNavigator;
