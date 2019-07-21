// @flow
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: '100px';
  height: '40px';
`;

type Props = {
  children?: string;
};

function Shared(props: Props) {
  return (
    <Container>
      {props.children}
    </Container>
  );
}

export default Shared;
