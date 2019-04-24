import 'react-native';
import * as React from 'react';
import Screen from '../Screen';

import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  ...props,
});

let props: any;

describe('[Screen]', () => {
  beforeAll(() => {
    props = createTestProps({});
  });

  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON = renderer.create(<Screen />).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Screen] Interaction', () => {
  beforeAll(() => {
    props = createTestProps({});
  });

  const component: any = <Screen {...props} />;
  let testing: any;

  beforeEach(() => {
    testing = render(component);
  });

  it('should render [Text] with value "myText"', () => {
    const textInstance: renderer.ReactTestInstance = testing.getByTestId('myText');
    expect(textInstance.props.children).toEqual('dooboolab');
  });
});
