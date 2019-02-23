import 'react-native';
import * as React from 'react';
import Screen from '../Screen';

import renderer from 'react-test-renderer';
import { NavigationTestProp, NavigationStateRoute } from 'react-navigation';
import { render, fireEvent } from 'react-native-testing-library';

const props = {
  navigation: {
    goBack: jest.fn(),
  },
};

describe('[Screen]', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Screen />).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Screen] Interaction', () => {
  const component: React.Element<any> = <Screen {...props} />;
  let testing: RenderResult;

  beforeEach(() => {
    testing = render(component);
  });

  it('should render [Text] with value "myText"', () => {
    const textInstance: ReactTestInstance = testing.getByTestId('myText');
    expect(textInstance.props.children).toEqual('dooboolab');
  });
});
