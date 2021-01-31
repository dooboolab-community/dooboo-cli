import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {ReactElement} from 'react';

// import { IC_MASK } from '../../utils/Icons';

export type BottomTabParamList = {
  default: undefined;
};

export type BottomTabNavigationProps<
  T extends keyof BottomTabParamList = 'default'
> = BottomTabNavigationProp<BottomTabParamList, T>;

const Tab = createBottomTabNavigator<BottomTabParamList>();

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
      {/* <Tab.Screen name="Page" component={Page} /> */}
    </Tab.Navigator>
  );
}

export default MaterialBottomTabNavigator;
