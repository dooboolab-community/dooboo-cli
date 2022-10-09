import {type ReactElement} from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  color: ${({theme}) => theme.text};
`;

type Props = {};

function Page({}: Props): ReactElement {
  return (
    <Container>
      <Text>Page</Text>
    </Container>
  );
};

export default Page;
