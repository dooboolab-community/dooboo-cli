import {type ReactElement} from 'react';
import {RootStackNavigationProps} from '../navigations/RootStack';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.background};

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  color: ${({theme}) => theme.text};
`;

type Props = {
  navigation: RootStackNavigationProps<'Page'>;
};

const Page = (): ReactElement => {
  return (
    <Container>
      <StyledText>Page</StyledText>
    </Container>
  );
};

export default Page;
