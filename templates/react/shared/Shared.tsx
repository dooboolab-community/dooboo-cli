import React, { FC } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100px;
  height: 40px;
`;

interface Props {

}

const Shared: FC<Props> = ({
  children,
}) => {
  return <Container>{children}</Container>;
};

export default Shared;
