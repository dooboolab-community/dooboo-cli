import React, { FC } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  color: ${({ theme }): string => theme.font};
`;

type Props = {

}

const Page: FC<Props> = () => {
  return (
    <Container>
      <Text>Screen</Text>
    </Container>
  );
};

export default Page;
