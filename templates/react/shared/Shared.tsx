import React, { Component } from 'react';

export class Component extends Component<any, any> {
  public render() {
    return (
      <div style={styles.wrapper}>
        {this.props.test}
      </div>
    );
  }
}

const styles = {
  wrapper: {
    display: flex,
    width: '100px',
    height: '40px',
  },
};

export default component;
