import 'react-native';
import * as React from 'react';
import Screen from '../Screen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('rendering test', () => {
  const wrapper = shallow(
    <Screen />,
  );

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
