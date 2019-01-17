import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};

interface IProps {
  store: any;
}
interface IState {}

@inject('store') @observer
class Screen extends Component<IProps, IState> {
  public render() {
    const { getString } = this.props.store.locale;
    return (
      <div style={styles.wrapper}>
        Screen
      </div>
    );
  }
}

export default Screen;
