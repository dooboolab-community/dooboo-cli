import * as React from 'react';

import { Button, Text, View } from 'react-native';
import { ReducerProvider, useReducerContext } from '../ReducerProvider';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

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
  let json: renderer.ReactTestRendererJSON;
  const component = (
    <ReducerProvider>
      <FakeChild />
    </ReducerProvider>
  );

  it('component and snapshot matches', () => {
    json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
    expect(json).toBeTruthy();
  });
});

// TODO: add more interaction test, refer to ThemeProvider test
