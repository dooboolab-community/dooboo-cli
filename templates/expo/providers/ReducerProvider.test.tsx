import {Button, Text, View} from 'react-native';
import {ReducerProvider, useReducerContext} from '../../../src/providers/ReducerProvider';
import {RenderAPI, render} from '@testing-library/react-native';

const FakeChild = (): JSX.Element => {
  const {state, setUser} = useReducerContext();

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

  const testingLib: RenderAPI = render(component);

  it('component and snapshot matches', () => {
    const baseElement = testingLib.toJSON();

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

// TODO: add more interaction test, refer to ThemeProvider test
