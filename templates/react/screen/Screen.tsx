import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

export class Screen extends Component<any, any> {
  public render() {
    const { getString } = this.props.store.locale;
    return (
      <div style={styles.wrapper}>
        Screen
      </div>
    );
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};

export default inject('store')(observer(Screen));
