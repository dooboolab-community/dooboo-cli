import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React, {FC} from 'react';

const SwitchNavigator: FC = () => {
  return (
    <BrowserRouter>
      <div style={{textAlign: 'center'}}>
        <Switch>
          <Route
            exact={true}
            path="/"
            // render={(): ReactElement => <Page />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default SwitchNavigator;
