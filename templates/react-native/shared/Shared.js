// @flow
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';

// import type {
//   ____ViewStyleProp_Internal as ViewStyle,
//   ____TextStyleProp_Internal as TextStyle,
//   ____ImageStyleProp_Internal as ImageStyle,
// } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { ratio, colors } from '../../utils/Styles';

type Styles = {
  wrapper: ViewStyle,
  text: TextStyle,
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

type Props = {
  style: ViewStyle;
};

type State = {

};

class Shared extends Component<Props, State> {
  static defaultProps: Props = {
    style: styles.wrapper,
  };

  render() {
    return (
      <View style={this.props.style}>
        <Text style={styles.textStyle}>Shared</Text>
      </View>
    );
  }
}

export default Shared;
