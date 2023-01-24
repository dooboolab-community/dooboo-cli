import {cleanup, render} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../test/utils/testUtils';

import MaterialTopTabNavigator from '../../../src/components/navigations/MaterialTopTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import type {ReactElement} from 'react';
import type {RenderAPI} from '@testing-library/react-native';

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
    expect(baseElement).toBeTruthy();
  });
});
