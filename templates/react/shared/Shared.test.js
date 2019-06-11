import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import Shared from '../Shared';
import { render, fireEvent, getByTestId } from '@testing-library/react';

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
