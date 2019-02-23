import 'react-native';
import * as React from 'react';
import Screen from '../Screen';
// import appStore from '../../../stores/appStore';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('[Screen] rendering test', () => {
  const wrapper = shallow(
    <Screen/>,
    // <Screen store={appStore}/>,
  );

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
