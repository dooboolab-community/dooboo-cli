import type {Dispatch, ReactElement, SetStateAction} from 'react';

import {useState} from 'react';
import createCtx from '../utils/createCtx';

interface User {
  displayName: string;
  age: number;
  job: string;
}

interface Context {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children?: ReactElement;
}

function StateProvider({children}: Props): ReactElement {
  const [user, setUser] = useState<User>({
    displayName: 'dooboolab',
    age: 18,
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

export {useCtx as useStateContext, StateProvider};
