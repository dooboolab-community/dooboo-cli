import React, { ReactElement } from 'react';

// import { IC_MASK } from '../../utils/Icons';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

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
      }
    >
      {/* <Tab.Screen name="Screen" component={Screen} /> */}
    </Tab.Navigator>
  );
}

export default MaterialBottomTabNavigator;
