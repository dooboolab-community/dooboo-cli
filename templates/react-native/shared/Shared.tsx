import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import { ratio, colors } from '../../utils/Styles';

const styles: any = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',

    alignItems: 'center',
    justifyContent: 'center',
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
        <Text>Shared</Text>
      </View>
    );
  }
}

export default Shared;
