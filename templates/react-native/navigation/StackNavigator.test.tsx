import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderAPI,
  cleanup,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '../StackNavigator';

describe('[Stack] navigator', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  let component: ReactElement;
  let testingLib: RenderAPI;

  beforeEach(() => {
    props = createTestProps();

    component = createTestElement(
      <NavigationContainer>
        <StackNavigator {...props} />
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
