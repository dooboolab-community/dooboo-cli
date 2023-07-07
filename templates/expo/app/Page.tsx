import styled, {css} from '@emotion/native';
import {Typography} from 'dooboo-ui';
import {Stack} from 'expo-router';

import {t} from '../src/STRINGS';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.bg.basic};
`;

const Content = styled.View`
  padding: 16px;
`;

type Props = {};

export default function Page({}: Props): JSX.Element {
  return (
    <Container>
      <Stack.Screen
        options={{
          title: t('PAGE'),
        }}
      />
      <Content>
        <Typography.Body1>{t('PAGE')}</Typography.Body1>
      </Content>
    </Container>
  );
}
