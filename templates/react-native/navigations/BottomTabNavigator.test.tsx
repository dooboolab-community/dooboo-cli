import 'react-native';

import {createTestElement, createTestProps} from '../../../test/utils/testUtils';

import BottomTabNavigator from '../../../src/components/navigations/BottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import type {ReactElement} from 'react';
import type {RenderAPI} from '@testing-library/react-native';
import {render} from '@testing-library/react-native';

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
