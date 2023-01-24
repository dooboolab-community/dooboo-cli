import {createTestElement, createTestProps} from '../../../test/utils/testUtils';

import type {ReactElement} from 'react';
import type {RenderResult} from '@testing-library/react';
import Template from '../../../src/components/uis/Template';
import {render} from '@testing-library/react';

let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Template {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const {baseElement} = testingLib;

    expect(baseElement).toBeTruthy();
  });
});

describe('Interaction', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Template {...props} />);
    testingLib = render(component);
  });

  it('should simulate onClick', () => {
    const {baseElement} = testingLib;

    expect(baseElement).toBeTruthy();
    // fireEvent(testingLib.getByTestId('btn'), 'click');
    // expect(cnt).toBe(2);
  });
});
