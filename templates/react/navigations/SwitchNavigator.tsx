import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {type ReactElement} from 'react';

type Props = {};

function SwitchNavigator({}: Props): ReactElement {
  return (
    <BrowserRouter>
      <div style={{textAlign: 'center', flex: 1, width: '100vw'}}>
        <Routes>
          <Route
            path="/"
            // render={(): ReactElement => <Page />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default SwitchNavigator;
