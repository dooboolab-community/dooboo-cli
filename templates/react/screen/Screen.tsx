import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};

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

export default inject('store')(observer(Screen));
