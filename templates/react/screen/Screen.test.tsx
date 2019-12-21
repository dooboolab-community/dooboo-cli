import * as renderer from 'react-test-renderer';

import React, { ReactElement } from 'react';
import { RenderResult, render } from '@testing-library/react';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Screen from '../Screen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Screen {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { baseElement } = testingLib;
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('Interaction', () => {
  it('should render [myText]', () => {
    const textInstance = testingLib.getByTestId('myText');
    expect(textInstance.textContent).toEqual('dooboolab');
  });
});
