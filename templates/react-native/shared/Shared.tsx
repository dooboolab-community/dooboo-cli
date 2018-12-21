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

import { ratio, colors } from '../../utils/Styles';

interface IStyles {
  wrapper: ViewStyle;
  text: TextStyle;
}

const styles: Styles = StyleSheet.create({
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

interface ItemProps {
  style?: View.propTypes.style;
}

class Shared extends Component<ItemProps, any> {
  private static defaultProps: Partial<ItemProps> = {
    style: styles.wrapper,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View style={this.props.style}>
        <Text style={styles.text}>Shared</Text>
      </View>
    );
  }
}

export default Shared;
