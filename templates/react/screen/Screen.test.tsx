import * as renderer from 'react-test-renderer';

import React, { ReactElement } from 'react';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import { createTestElement, createTestProps, history } from '../../../../test/testUtils';

import Screen from '../Screen';

describe('[Screen] render', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  let component: ReactElement;
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Screen {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('Interaction', () => {
    it('should render [myText]', () => {
      const textInstance = testingLib.getByTestId('myText');
      expect(textInstance.textContent).toEqual('dooboolab');
    });
  });
});
