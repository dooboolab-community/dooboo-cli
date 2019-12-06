import 'react-native';

import React, { ReactElement } from 'react';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import BottomTabNavigator from '../BottomTabNavigator';
import { NavigationNativeContainer } from '@react-navigation/native';
import { cleanup } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

let props: any;
let component: ReactElement;

describe('[BottomTab] navigator', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(
      <NavigationNativeContainer>
        <BottomTabNavigator {...props} />
      </NavigationNativeContainer>,
    );
  });

  it('should renders without crashing', () => {
    jest.useFakeTimers();
    const rendered = renderer.create(component).toJSON();
    jest.runAllTimers();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
