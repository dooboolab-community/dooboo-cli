import 'react-native';

import React, { ReactElement } from 'react';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import DrawerNavigator from '../DrawerNavigator';
import { NavigationNativeContainer } from '@react-navigation/native';
import { cleanup } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

describe('[Drawer] navigator', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  let component: ReactElement;

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(
      <NavigationNativeContainer>
        <DrawerNavigator {...props} />
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
