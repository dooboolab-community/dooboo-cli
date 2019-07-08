import 'react-native';
import * as React from 'react';
import Shared from '../Shared';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { fireEvent, render, RenderAPI } from 'react-native-testing-library';

let props: object;
let component: React.ReactElement;
let testingLib: any;

describe('[Shared] render', () => {
  beforeEach(() => {
    props = {
    };
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
      // fireEvent(testingLib.getByTestId('btn'), 'click');
      // expect(cnt).toBe(2);
    });
  });
});
