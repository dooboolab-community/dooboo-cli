import React, { Component } from 'react';

const styles = {
  wrapper: {
    display: flex,
    width: '100px',
    height: '40px',
  },
};

interface IProps {};
interface IState {};

class Component extends Component<IProps, IState> {
  public render() {
    return (
      <div style={styles.wrapper}>
        {this.props.test}
      </div>
    );
  }
}

export default component;
