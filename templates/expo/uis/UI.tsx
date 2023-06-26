import type {ReactElement} from 'react';
import type {ViewStyle} from 'react-native';
import styled, {css} from '@emotion/native';
import {Icon, useDooboo} from 'dooboo-ui';

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

function Component({style}: {style?: ViewStyle}): ReactElement {
  const {theme} = useDooboo();

  return (
    <Container
      style={[
        css`
          padding: 24px;
        `,
        style,
      ]}
    >
      <Icon name="QuestBoxFill" size={14} color={theme.text.disabled} />
    </Container>
  );
}

export default Component;
