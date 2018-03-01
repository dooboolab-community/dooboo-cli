import React, { Component } from 'react';

const styles = {
  wrapper: {
    display: flex,
    width: '100px',
    height: '40px',
  },
};

export class Component extends Component<any, any> {
  public render() {
    return (
      <div style={styles.wrapper}>
        {this.props.test}
      </div>
    );
  }
}

export default component;
