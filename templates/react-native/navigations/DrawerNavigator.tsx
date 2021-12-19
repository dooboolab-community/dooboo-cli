import {
  DrawerContentComponentProps,
  DrawerItem,
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {ScrollView, StyleSheet} from 'react-native';

import {ReactElement} from 'react';
import {useSafeArea} from 'react-native-safe-area-context';

export type DrawerParamList = {
  default: undefined;
};

export type DrawerNavigationProps<T extends keyof DrawerParamList = 'default'> =
  DrawerNavigationProp<DrawerParamList, T>;

const Drawer = createDrawerNavigator<DrawerParamList>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function CustomDrawerContent({drawerPosition}): ReactElement {
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
        label="Page"
        onPress={(): void => {
          // navigation.navigate('Page');
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
      {/* <Drawer.Screen name="Page" component={Page} /> */}
    </Drawer.Navigator>
  );
}

export default Navigator;
