import React, {ReactElement} from 'react';
import {RenderResult, render} from '@testing-library/react';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import Screen from '../Screen';

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
    const {baseElement} = testingLib;

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
