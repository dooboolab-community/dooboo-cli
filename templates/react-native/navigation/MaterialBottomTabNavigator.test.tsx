import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  cleanup,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import BottomTabNavigator from '../BottomTabNavigator';
import { NavigationNativeContainer } from '@react-navigation/native';

describe('[BottomTab] navigator', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  let component: ReactElement;
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(
      <NavigationNativeContainer>
        <BottomTabNavigator {...props} />
      </NavigationNativeContainer>,
    );
    testingLib = render(component);
  });

  afterEach(() => cleanup());

  it('should renders without crashing', () => {
    jest.useFakeTimers();
    const { baseElement } = testingLib;
    jest.runAllTimers();
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
