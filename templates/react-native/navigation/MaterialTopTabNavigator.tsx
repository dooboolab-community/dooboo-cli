import React, { ReactElement } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function SwitchNavigator(): ReactElement {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: 'blue' },
      }}
    >
      {/* <Tab.Screen name="Screen" component={Screen} /> */}
    </Tab.Navigator>
  );
}

export default SwitchNavigator;
