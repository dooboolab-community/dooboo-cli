// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { ratio, colors } from '../../utils/Styles';

type Styles = {
  container: ViewStyle;
  text: TextStyle,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

type Props = {

};
type State = {

}

class Screen extends Component<Props, State> {
  static navigationOptions = {
    title: 'Title',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Screen</Text>
      </View>
    );
  }
}

export default Screen;
