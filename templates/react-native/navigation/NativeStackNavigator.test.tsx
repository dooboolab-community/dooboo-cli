import 'react-native';

import React, { ReactElement } from 'react';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import { NavigationNativeContainer } from '@react-navigation/native';
import StackNavigator from '../StackNavigator';
import { cleanup } from '@testing-library/react-native';
import { enableScreens } from 'react-native-screens';
import renderer from 'react-test-renderer';

describe('[Stack] navigator', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  let component: ReactElement;

  beforeEach(() => {
    enableScreens();
    props = createTestProps();
    component = createTestElement(
      <NavigationNativeContainer>
        <StackNavigator {...props} />
      </NavigationNativeContainer>,
    );
  });

  afterEach(() => cleanup());

  it('should renders without crashing', () => {
    jest.useFakeTimers();
    const rendered = renderer.create(component).toJSON();
    jest.runAllTimers();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
