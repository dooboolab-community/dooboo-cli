import {
  MaterialBottomTabNavigationProp,
  createMaterialBottomTabNavigator,
} from '@react-navigation/material-bottom-tabs';
import React, {ReactElement} from 'react';

// import { IC_MASK } from '../../utils/Icons';

export type MaterialBottomTabParamList = {
  default: undefined;
};

export type MaterialBottomTabNavigationProps<
  T extends keyof MaterialBottomTabParamList = 'default'
> = MaterialBottomTabNavigationProp<MaterialBottomTabParamList, T>;

const Tab = createMaterialBottomTabNavigator<MaterialBottomTabParamList>();

// const TabBarIcon = (focused: boolean): React.ReactElement => {
//   return (
//     <Image
//       style={{
//         width: focused ? 24 : 18,
//         height: focused ? 24 : 18,
//       }}
//       source={IC_MASK}
//     />
//   );
// };

function MaterialBottomTabNavigator(): ReactElement {
  return (
    <Tab.Navigator
      screenOptions={
        {
          // tabBarIcon: ({ focused }): React.ReactElement => TabBarIcon(focused),
        }
      }>
      {/* <Tab.Screen name="Screen" component={Screen} /> */}
    </Tab.Navigator>
  );
}

export default MaterialBottomTabNavigator;
