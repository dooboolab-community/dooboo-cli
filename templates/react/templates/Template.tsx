import {FC} from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  width: 100px;
  height: 40px;
`;

type Props = {};

const Template: FC<Props> = ({children}) => {
  return <Container>{children}</Container>;
};

export default Template;
