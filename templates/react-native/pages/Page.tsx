import React, {FC} from 'react';

import {RootStackNavigationProps} from '../navigations/RootStack';
import styled from '@emotion/native';
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
  color: ${({theme}): string => theme.text};
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
