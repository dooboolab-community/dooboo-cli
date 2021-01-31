import React, {FC} from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

type Props = {};

const Template: FC<Props> = ({children}) => {
  return <Container>{children}</Container>;
};

export default Template;
