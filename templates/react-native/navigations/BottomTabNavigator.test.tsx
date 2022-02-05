import 'react-native';

import {RenderAPI, render} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import BottomTabNavigator from '../BottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {ReactElement} from 'react';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

describe('[BottomTab] navigator', () => {
  beforeEach(() => {
    props = createTestProps();

    component = createTestElement(
      <NavigationContainer>
        <BottomTabNavigator {...props} />
      </NavigationContainer>,
    );

    testingLib = render(component);
  });

  it('should renders without crashing', () => {
    jest.useFakeTimers();

    const baseElement = testingLib.toJSON();

    jest.runAllTimers();
    expect(baseElement).toBeTruthy();
  });
});
