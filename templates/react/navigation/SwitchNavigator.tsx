import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { ReactElement } from 'react';

function SwitchNavigator(): ReactElement {
  return (
    <BrowserRouter>
      <div style={{ textAlign: 'center' }}>
        <Switch>
          <Route
            exact={true}
            path="/"
            // render={(): ReactElement => <Screen />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default SwitchNavigator;
