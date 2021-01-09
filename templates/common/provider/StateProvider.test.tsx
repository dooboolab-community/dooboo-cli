import * as React from 'react';

import {Button, View} from 'react-native';
import {RenderAPI, act, fireEvent, render} from '@testing-library/react-native';
import {StateProvider, useStateContext} from '../StateProvider';

const FakeChild = (): React.ReactElement => {
  const {setUser} = useStateContext();

  return (
    <View>
      <Button
        testID="BUTTON"
        onPress={(): void =>
          setUser({
            displayName: 'displayName',
            age: 12,
            job: 'dev',
          })
        }
        title="Button"
      />
    </View>
  );
};

describe('Rendering', () => {
  const component = (
    <StateProvider>
      <FakeChild />
    </StateProvider>
  );

  const testingLib: RenderAPI = render(component);

  it('component and snapshot matches', () => {
    const baseElement = testingLib.toJSON();

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('Interactions', () => {
  it('should setUser', async () => {
    const {getByTestId} = render(
      <StateProvider>
        <FakeChild />
      </StateProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('BUTTON'));
    });
  });
});
