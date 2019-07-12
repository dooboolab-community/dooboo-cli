import 'react-native';
import * as React from 'react';
import Shared from '../Shared';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent, act, RenderResult } from '@testing-library/react-native';

let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

const createTestProps = (obj: object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

describe('[Shared] render', () => {
  beforeEach(() => {
    props = createTestProps({ });
    component = (
      <Shared {...props} />
    );
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should simulate onClick', () => {
      // const btn = testingLib.queryByTestId('btn');
      // act(() => {
      //   fireEvent.press(btn);
      // });
      // expect(cnt).toBe(3);
    });
  });
});
