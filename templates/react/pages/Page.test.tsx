import {RenderResult, render} from '@testing-library/react';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import Page from './Page';
import {ReactElement} from 'react';

let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Page {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const {baseElement} = testingLib;

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});
