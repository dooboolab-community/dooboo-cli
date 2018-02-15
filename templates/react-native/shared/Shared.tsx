import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import { ratio, bgColor } from '@utils/Styles';

const styles: any = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',

    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14 * ratio,
  },
});

interface ItemProps {
  style?: View.propTypes.style;
  textStyle?: Text.propTypes.style;
  activeOpacity?: number;
}

class Shared extends Component<ItemProps, any> {
  private static defaultProps: Partial<ItemProps> = {
    activeOpacity: 0.5,
    style: styles.wrapper;
    textStyle: styles.text;
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View style={this.props.style}>
        <Text style={this.props.textStyle}>{this.props.children}</Text>
      </View>
    );
  }
}

export default Shared;
