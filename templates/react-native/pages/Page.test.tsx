import 'react-native';

import {createTestElement, createTestProps} from '../../../test/utils/testUtils';

import Page from '../../../src/components/pages/Page';
import {ReactElement} from 'react';
import type {RenderAPI} from '@testing-library/react-native';
import {render} from '@testing-library/react-native';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Page {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const baseElement = testingLib.toJSON();

    expect(baseElement).toBeTruthy();
  });
});
