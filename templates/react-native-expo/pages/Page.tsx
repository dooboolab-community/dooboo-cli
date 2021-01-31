import React, {FC} from 'react';

import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: ${({theme}): string => theme.font};
`;

interface Props {
  navigation: RootStackNavigationProps<'default'>;
}

const Page: FC<Props> = () => {
  return (
    <Container>
      <StyledText>Page</StyledText>
    </Container>
  );
};

export default Page;
