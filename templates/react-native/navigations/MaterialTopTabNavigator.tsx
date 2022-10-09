import type {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import type {ReactElement} from 'react';
import {
createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';

export type MaterialTopTabParamList = {
  default: undefined;
};

export type MaterialTopTabNavigationProps<
  T extends keyof MaterialTopTabParamList = 'default',
> = MaterialTopTabNavigationProp<MaterialTopTabParamList, T>;

const Tab = createMaterialTopTabNavigator<MaterialTopTabNavigationProps>();

function SwitchNavigator(): ReactElement {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {fontSize: 12},
        style: {backgroundColor: 'blue'},
      }}
    >
      {/* <Tab.Screen name="Page" component={Page} /> */}
    </Tab.Navigator>
  );
}

export default SwitchNavigator;
