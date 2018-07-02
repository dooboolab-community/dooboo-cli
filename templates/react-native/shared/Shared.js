// @flow
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { ratio, colors } from '../../utils/Styles';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',

    alignItems: 'center',
    justifyContent: 'center',
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
        <Text>Shared</Text>
      </View>
    );
  }
}

export default Shared;
