import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  cleanup,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import { NavigationNativeContainer } from '@react-navigation/native';
import StackNavigator from '../StackNavigator';
import { enableScreens } from 'react-native-screens';
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('[Stack] navigator', () => {
  beforeEach(() => {
    enableScreens();
    props = createTestProps();
    component = createTestElement(
      <NavigationNativeContainer>
        <StackNavigator {...props} />
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
