import { fireEvent, getByTestId, render } from '@testing-library/react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import React from 'react';
import Shared from '../Shared';

let props: any;
let component: React.ReactElement;
let testingLib: any;

describe('[Shared] render', () => {
  beforeEach(() => {
    props = {
      history: {
        goBack: jest.fn(),
      },
    };
    component = <Shared />;
  });

  it('renders without crashing', () => {
    const rendered: ReactTestRendererJSON = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
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
