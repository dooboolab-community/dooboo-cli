import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import Shared from '../Shared';
import { render, fireEvent, getByTestId } from '@testing-library/react';


let props: object;
let component: React.ReactElement;
let testingLib: any;

describe('[Shared] render', () => {
  beforeEach(() => {
    props = {
      history: {
        goBack: jest.fn(),
      },
    };
    component = (
      <Shared />
    );
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
