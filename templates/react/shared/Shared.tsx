import React, { Component } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: '100px';
  height: '40px';
`;

interface Props {
  children?: string;
}

function Shared(props: Props): React.ReactElement {
  return <Container>{props.children}</Container>;
}

export default Shared;
