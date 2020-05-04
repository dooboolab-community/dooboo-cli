import React, { FC } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {

}

const Page: FC<Props> = () => {
  return (
    <Container>
      <div data-testid="myText">dooboolab</div>
    </Container>
  );
};

export default Page;
