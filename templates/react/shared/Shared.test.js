import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import Shared from '../Shared';
import { render, fireEvent, getByTestId } from 'react-testing-library';

const props = {
  history: {
    goBack: jest.fn(),
  },
};

describe('[Shared] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Shared />).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
