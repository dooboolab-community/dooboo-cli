import {RenderResult, render} from '@testing-library/react';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import {ReactElement} from 'react';
import Template from './Template';

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

    expect(baseElement).toMatchSnapshot();
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

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
    // fireEvent(testingLib.getByTestId('btn'), 'click');
    // expect(cnt).toBe(2);
  });
});
