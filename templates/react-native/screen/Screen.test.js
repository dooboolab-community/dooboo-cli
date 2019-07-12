import 'react-native';
import * as React from 'react';
import Screen from '../Screen';

import renderer from 'react-test-renderer';
import { NavigationTestProp, NavigationStateRoute } from 'react-navigation';
import { render, fireEvent, act, RenderResult } from '@testing-library/react-native';

const props = {
  navigation: {
    goBack: jest.fn(),
  },
};

let component: React.ReactElement;
let testingLib: RenderResult;

const createTestProps = (obj: object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

describe('[Screen] screen', () => {
  beforeEach(() => {
    props = createTestProps({ });
    component = (
      <Screen {...props} />
    );
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  it('should render [Text] with value "myText"', () => {
    const textInstance = testing.getByTestId('myText');
    expect(textInstance.props.children).toEqual('dooboolab');
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should simulate onClick', () => {
      // const btn = testingLib.queryByTestId('btn');
      // act(() => {
      //   fireEvent.press(btn);
      //   fireEvent.press(btn);
      // });
      // expect(cnt).toBe(3);
    });
  });
});
