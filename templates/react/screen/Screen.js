import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};

type Props = {

};

type State = {

}

@inject('store') @observer
class Screen extends Component<Props, State> {
  render() {
    const { getString } = this.props.store.locale;
    return (
      <div style={styles.wrapper}>
        Screen
      </div>
    );
  }
}

export default Screen;
