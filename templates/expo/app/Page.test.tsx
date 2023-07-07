import 'react-native';

import type {RenderAPI} from '@testing-library/react-native';
import {render, waitFor} from '@testing-library/react-native';

import Page from '../../app/Page';
import {createTestElement, createTestProps} from '../testUtils';

let props: any;
let component: JSX.Element;
let testingLib: RenderAPI;

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Page {...props} />);
  });

  it('renders without crashing', async () => {
    testingLib = render(component);

    const baseElement = await waitFor(() => testingLib.toJSON());
    expect(baseElement).toBeTruthy();
  });
});
