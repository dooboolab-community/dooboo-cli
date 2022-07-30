import {type ReactElement} from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100px;
  height: 40px;
`;

type Props = {};

const Template = (): ReactElement => {
  return <Container />;
};

export default Template;
