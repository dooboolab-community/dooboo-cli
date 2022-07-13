import {type ReactElement} from 'react';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

type Props = {};

const Template = (): ReactElement => {
  return <Container>{children}</Container>;
};

export default Template;
