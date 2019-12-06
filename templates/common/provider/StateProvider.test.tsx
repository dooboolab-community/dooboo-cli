import * as React from 'react';

import { Button, View } from 'react-native';
import { StateProvider, useStateContext } from '../StateProvider';
import { act, fireEvent, render } from '@testing-library/react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const FakeChild = (): React.ReactElement => {
  return (
    <View>
      <Button
        testID="BUTTON"
        onPress={(): void => {
          useStateContext();
        }}
        title="Button"
      />
    </View>
  );
};

describe('[StateProvider] rendering test', () => {
  let json: renderer.ReactTestRendererJSON;
  const component = (
    <StateProvider>
      <FakeChild />
    </StateProvider>
  );

  it('component and snapshot matches', () => {
    json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
    expect(json).toBeTruthy();
  });
});

describe('[StateProvider] interactions', () => {
  it('test setUser()', async () => {
    const { getByTestId } = render(
      <StateProvider>
        <FakeChild />
      </StateProvider>,
    );
    act(() => {
      fireEvent.press(getByTestId('BUTTON'));
    });
  });
});
