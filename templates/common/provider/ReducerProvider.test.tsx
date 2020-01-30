import * as React from 'react';

import { Button, Text, View } from 'react-native';
import { ReducerProvider, useReducerContext } from '../ReducerProvider';
import { RenderResult, act, fireEvent, render } from '@testing-library/react-native';

const FakeChild = (): React.ReactElement => {
  const { state, setUser } = useReducerContext();

  return (
    <View>
      <Text testID="TEXT">{JSON.stringify(state, null, 2)}</Text>
      <Button
        testID="BUTTON"
        onPress={(): void => {
          setUser({
            displayName: 'test',
          });
        }}
        title="Button"
      />
    </View>
  );
};

describe('[ReducerProvider] rendering test', () => {
  const component = (
    <ReducerProvider>
      <FakeChild />
    </ReducerProvider>
  );
  const testingLib: RenderResult = render(component);

  it('component and snapshot matches', () => {
    const { baseElement } = testingLib;
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

// TODO: add more interaction test, refer to ThemeProvider test
