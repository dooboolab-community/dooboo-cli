import React from 'react';
import { shallow } from 'enzyme';

import Shared from '../shared';

// const component = shallow(
//     <Button white={true} btnTxt='Button 1st test' />
//   );

// test for the pure component
describe('Shared component test', () => {
  const component = shallow(
    <Shared />,
  );

  it('component and snapshot matches', () => {
    expect(component).toMatchSnapshot();
  });

  it('check child props', () => {
    component.find('div').children.toBe(true);
  });
});
