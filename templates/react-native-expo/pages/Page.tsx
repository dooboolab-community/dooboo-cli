import {type ReactElement} from 'react';
import {RootStackNavigationProps} from '../navigations/RootStack';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.text};
`;

interface Props {
  navigation: RootStackNavigationProps<'default'>;
}

function Page({}: Props): ReactElement {
  return (
    <Container>
      <StyledText>Page</StyledText>
    </Container>
  );
};

export default Page;
