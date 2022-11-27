import * as renderer from 'react-test-renderer';

import type {RenderResult} from '@testing-library/react';
import SwitchNavigator from '../../../src/components/navigations/SwitchNavigator';
import {createTestElement} from '../../../test/utils/testUtils';
import {render} from '@testing-library/react';

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
