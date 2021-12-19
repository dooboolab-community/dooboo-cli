import 'react-native';

import {RenderAPI, cleanup, render} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import MaterialTopTabNavigator from '../MaterialTopTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {ReactElement} from 'react';

describe('[MaterialTopTab] navigator', () => {
  let props: any;
  let component: ReactElement;
  let testingLib: RenderAPI;

  beforeEach(() => {
    props = createTestProps();

    component = createTestElement(
      <NavigationContainer>
        <MaterialTopTabNavigator {...props} />
      </NavigationContainer>,
    );

    testingLib = render(component);
  });

  afterEach(() => cleanup());

  it('should renders without crashing', () => {
    jest.useFakeTimers();

    const baseElement = testingLib.toJSON();

    jest.runAllTimers();
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
