import {
  MaterialTopTabNavigationProp,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import React, {ReactElement} from 'react';

export type MaterialTopTabParamList = {
  default: undefined;
};

export type MaterialTopTabNavigationProps<
  T extends keyof MaterialTopTabParamList = 'default'
> = MaterialTopTabNavigationProp<MaterialTopTabParamList, T>;

const Tab = createMaterialTopTabNavigator<MaterialTopTabNavigationProps>();

function SwitchNavigator(): ReactElement {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {fontSize: 12},
        style: {backgroundColor: 'blue'},
      }}>
      {/* <Tab.Screen name="Screen" component={Screen} /> */}
    </Tab.Navigator>
  );
}

export default SwitchNavigator;
