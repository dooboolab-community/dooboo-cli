import 'react-native';

import {cleanup, render} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../test/utils/testUtils';

import DrawerNavigator from '../../../src/components/navigations/DrawerNavigator';
import {NavigationContainer} from '@react-navigation/native';
import type {ReactElement} from 'react';
import type {RenderAPI} from '@testing-library/react-native';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

describe('[Drawer] navigator', () => {
  beforeEach(() => {
    props = createTestProps();

    component = createTestElement(
      <NavigationContainer>
        <DrawerNavigator {...props} />
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
