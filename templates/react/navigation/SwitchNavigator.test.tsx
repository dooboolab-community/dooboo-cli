import * as renderer from 'react-test-renderer';

import { RenderResult, fireEvent, render } from '@testing-library/react';
import { createTestElement, history } from '../../../../test/testUtils';

import React from 'react';
import SwitchNavigator from '../SwitchNavigator';

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
