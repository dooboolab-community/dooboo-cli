import React, { Component } from 'react';

import Button from '../shared/Button';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  history?: any;
}

function Page(props: Props) {
  return (
    <Container>
      <div data-testid='myText'>dooboolab</div>
    </Container>
  );
}

export default Page;
