import 'react-native';
import * as React from 'react';
import Screen from '../Screen';
// import appStore from '../../../stores/appStore';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('[Screen]', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Screen />).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
