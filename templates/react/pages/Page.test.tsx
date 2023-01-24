import {createTestElement, createTestProps} from '../../../test/utils/testUtils';

import Page from '../../../src/components/pages/Page';
import type {ReactElement} from 'react';
import type {RenderResult} from '@testing-library/react';
import Template from './Template';
import {render} from '@testing-library/react';

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
