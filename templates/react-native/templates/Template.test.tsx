import {RenderAPI, render} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../test/utils/testUtils';

import type {ReactElement} from 'react';
import Template from '../../../src/components/uis/Template';

let props: any;
let component: React.ReactElement;
let testingLib: RenderAPI;

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Template {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const baseElement = testingLib.toJSON();

    expect(baseElement).toBeTruthy();
  });
});
