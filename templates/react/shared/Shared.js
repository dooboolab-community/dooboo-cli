// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import {
  IC_MASK,
} from '../../utils/Icons';

const Container = styled.div`
  display: flex,
  width: '100px',
  height: '40px',
`;

type Props = {
  children?: string;
};

type State = {

};

function Shared(props: Props, state: State) {
  return (
    <Container>
      {this.props.children}
    </Container>
  );
}

export default component;
