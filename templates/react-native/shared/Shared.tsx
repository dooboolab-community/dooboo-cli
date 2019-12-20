import React, { ReactChildren, ReactElement } from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  children?: ReactChildren;
}

function Shared(props: Props): ReactElement {
  return <Container>{props.children}</Container>;
}

export default Shared;
