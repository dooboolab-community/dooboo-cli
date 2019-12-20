import React, { ReactElement } from 'react';
import {
  RenderResult,
  fireEvent,
  getByTestId,
  render,
} from '@testing-library/react';
import { createTestElement, createTestProps, history } from '../../../../test/testUtils';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import Shared from '../Shared';

describe('[Shared] render', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  let component: ReactElement;
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Shared {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const rendered: ReactTestRendererJSON = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('interactions', () => {
    it('should simulate onClick', () => {
      expect(testingLib.baseElement).toMatchSnapshot();
      // fireEvent(testingLib.getByTestId('btn'), 'click');
      // expect(cnt).toBe(2);
    });
  });
});
