import * as renderer from 'react-test-renderer';

import { RenderResult, render } from '@testing-library/react';

import React from 'react';
import SwitchNavigator from '../SwitchNavigator';
import { createTestElement } from '../../../../test/testUtils';

const props = {};
const component = createTestElement(<SwitchNavigator {...props} />);

describe('[SwitchNavigator] rendering', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(component);
  });

  it('should renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();

    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
