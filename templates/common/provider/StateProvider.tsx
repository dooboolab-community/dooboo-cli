import React, { useState } from 'react';

import createCtx from '../utils/createCtx';

interface User {
  displayName: string;
  age: number;
  job: string;
}

interface Context {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children?: React.ReactElement;
}

function StateProvider({ children }: Props): React.ReactElement {
  const [user, setUser] = useState<User>({
    displayName: '',
    age: 0,
    job: 'dev',
  });

  return (
    <Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </Provider>
  );
}

export { useCtx as useStateContext, StateProvider };
