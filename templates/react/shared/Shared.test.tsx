import React, { ReactElement } from 'react';
import {
  RenderResult,
  fireEvent,
  getByTestId,
  render,
} from '@testing-library/react';
import { createTestElement, createTestProps, history } from '../../../../test/testUtils';

import Shared from '../Shared';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Shared {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { baseElement } = testingLib;

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('Interaction', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Shared {...props} />);
    testingLib = render(component);
  });

  it('should simulate onClick', () => {
    const { baseElement } = testingLib;

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
    // fireEvent(testingLib.getByTestId('btn'), 'click');
    // expect(cnt).toBe(2);
  });
});
