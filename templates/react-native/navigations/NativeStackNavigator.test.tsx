import 'react-native';

import {cleanup, render} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../test/utils/testUtils';

import {NavigationContainer} from '@react-navigation/native';
import type {ReactElement} from 'react';
import type {RenderAPI} from '@testing-library/react-native';
import StackNavigator from '../../../src/components/navigations/StackNavigator';
import {enableScreens} from 'react-native-screens';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

describe('[Stack] navigator', () => {
  beforeEach(() => {
    enableScreens();
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
    expect(baseElement).toBeTruthy();
  });
});
