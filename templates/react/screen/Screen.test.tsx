import { fireEvent, getByTestId, render } from '@testing-library/react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import React from 'react';
import Screen from '../Screen';

const props = {
  history: {
    goBack: jest.fn(),
  },
};

describe('[Screen] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Screen />).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Screen] Interaction', () => {
  const component = <Screen {...props} />;
  let renderResult: any;

  beforeEach(() => {
    renderResult = render(component);
  });

  it('should simulate [onClick] when [btn] has been clicked', () => {
    const textInstance = renderResult.getByTestId('myText');
    expect(textInstance.textContent).toEqual('dooboolab');
  });
});
