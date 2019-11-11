import React, { ReactElement } from 'react';

import Button from '../shared/Button';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

type Props = {};

function Page(): ReactElement {
  return (
    <Container>
      <div data-testid="myText">dooboolab</div>
    </Container>
  );
}

export default Page;
