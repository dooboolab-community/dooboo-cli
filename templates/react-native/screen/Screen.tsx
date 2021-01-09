import React, { FC } from 'react';

import Container from '../navigation/Container';
import {RootStackNavigationProps} from '../navigation/RootStackNavigator';
import styled from 'styled-components';

const Content = styled.View`
  background-color: ${({theme}): string => theme.background};

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  color: ${({ theme }): string => theme.font};
`;

type Props = {
  navigation: RootStackNavigationProps<'Page'>;
}

const Page: FC<Props> = () => {
  return (
    <Container>
      <Content>
        <StyledText>Screen</StyledText>
      </Content>
    </Container>
  );
};

export default Page;
