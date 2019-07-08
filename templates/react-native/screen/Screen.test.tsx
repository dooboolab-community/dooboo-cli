import 'react-native';
import * as React from 'react';
import Screen from '../Screen';

import renderer from 'react-test-renderer';
import { render, fireEvent, RenderAPI } from 'react-native-testing-library';

let props: any;
let component: React.ReactElement;
let testingLib: RenderAPI;

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
    const textInstance: renderer.ReactTestInstance = testingLib.getByTestId('myText');
    expect(textInstance.props.children).toEqual('dooboolab');
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should simulate onClick', () => {
      // fireEvent(testingLib.getByTestId('btn'), 'click');
      // expect(cnt).toBe(2);
    });
  });
});
