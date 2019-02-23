import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import Screen from '../Screen';
import { render, fireEvent, getByTestId } from 'react-testing-library';

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
  const component: React.Element<any> = <Screen {...props} />;
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(component);
  });

  it('should simulate [onClick] when [btn] has been clicked', () => {
    const textInstance: ReactTestInstance = renderResult.getByTestId('myText');
    expect(textInstance.textContent).toEqual('dooboolab');
  });
});
