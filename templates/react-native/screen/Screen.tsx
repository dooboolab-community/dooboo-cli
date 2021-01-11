import React, {FC} from 'react';

import {RootStackNavigationProps} from '../navigation/RootStackNavigator';
import styled from 'styled-components/native';
import {withScreen} from '../../utils/wrapper';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}): string => theme.background};

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  color: ${({theme}): string => theme.font};
`;

type Props = {
  navigation: RootStackNavigationProps<'Page'>;
};

const Page: FC<Props> = () => {
  return (
    <Container>
      <StyledText>Page</StyledText>
    </Container>
  );
};

export default withScreen(Page);
