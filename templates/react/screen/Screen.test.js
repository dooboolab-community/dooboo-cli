import React from 'react';
import { shallow, render } from 'enzyme';

// import appStore from '../../../stores/appStore';
import Screen from '../Screen';

// test for the container page in dom
describe('rendering test', () => {
  const screen = shallow(
    <Screen />,
    // <Screen store={appStore} />,
  );
  it('Screen has to match the snapshot', () => {
    expect(screen).toMatchSnapshot();
  });
});
