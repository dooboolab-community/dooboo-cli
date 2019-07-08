import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

type Props = {
  children?: any;
}

function Shared(props: Props) {
  return (
    <Container>
      {props.children}
    </Container>
  );
}

export default Shared;
