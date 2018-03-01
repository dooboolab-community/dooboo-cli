import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';

import { ratio, colors } from '@utils/Styles';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class Screen extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>Screen</Text>
      </View>
    );
  }
}

export default Screen;
