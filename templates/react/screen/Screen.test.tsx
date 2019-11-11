import * as renderer from 'react-test-renderer';

import { RenderResult, fireEvent, render } from '@testing-library/react';
import { createTestElement, history } from '../../../../test/testUtils';

import React from 'react';
import Screen from '../Screen';

const props = {};

describe('[Screen] render', () => {
  const element = createTestElement(<Screen {...props} />);
  it('renders without crashing', () => {
    const rendered = renderer.create(element).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Screen] Interaction', () => {
  const element = createTestElement(<Screen {...props} />);
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(element);
  });

  it('should render [myText]', () => {
    const textInstance = renderResult.getByTestId('myText');
    expect(textInstance.textContent).toEqual('dooboolab');
  });
});
