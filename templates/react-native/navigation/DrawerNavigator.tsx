import {
  DrawerContentComponentProps,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React, { ReactElement } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { useSafeArea } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function CustomDrawerContent({ drawerPosition, navigation }): ReactElement {
  const insets = useSafeArea();

  return (
    <ScrollView
      contentContainerStyle={[
        {
          paddingTop: insets.top + 4,
          paddingLeft: drawerPosition === 'left' ? insets.left : 0,
          paddingRight: drawerPosition === 'right' ? insets.right : 0,
        },
      ]}
      style={styles.container}
    >
      <DrawerItem
        label="Screen"
        onPress={(): void => {
          // navigation.navigate('Screen');
        }}
      />
    </ScrollView>
  );
}

function Navigator(): ReactElement {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps): ReactElement => (
        <CustomDrawerContent {...props} />
      )}
    >
      {/* <Drawer.Screen name="Screen" component={Screen} /> */}
    </Drawer.Navigator>
  );
}

export default Navigator;
