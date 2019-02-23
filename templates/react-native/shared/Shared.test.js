import 'react-native';
import * as React from 'react';
import Shared from '../Shared';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('[Shared]', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Shared />).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
