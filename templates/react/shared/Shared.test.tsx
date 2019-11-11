import {
  RenderResult,
  fireEvent,
  getByTestId,
  render,
} from '@testing-library/react';
import { createTestElement, history } from '../../../../test/testUtils';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import React from 'react';
import Shared from '../Shared';

const props = {};
const element = createTestElement(<Shared {...props} />);
let testingLib: RenderResult;

describe('[Shared] render', () => {
  it('renders without crashing', () => {
    const rendered: ReactTestRendererJSON = renderer.create(element).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(element);
    });

    it('should simulate onClick', () => {
      // fireEvent(testingLib.getByTestId('btn'), 'click');
      // expect(cnt).toBe(2);
    });
  });
});
