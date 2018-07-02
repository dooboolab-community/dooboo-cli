import React, { Component } from 'react';

const styles = {
  wrapper: {
    display: flex,
    width: '100px',
    height: '40px',
  },
};

type Props = {

};

type State = {

};

class Component extends Component<Props, State> {
  render() {
    return (
      <div style={styles.wrapper}>
        {this.props.test}
      </div>
    );
  }
}

export default component;
