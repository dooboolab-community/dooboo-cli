import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React, {FC} from 'react';

const SwitchNavigator: FC = () => {
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
