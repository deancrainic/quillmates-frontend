import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  PropsWithChildren,
} from 'react';

export interface AuthModel {
  userId: string;
  exp: string;
  token: string;
}

export type AuthContextType = {
  auth: AuthModel;
  setAuth: Dispatch<SetStateAction<AuthModel>>;
};

export const defaultState = {
  auth: {
    userId: '',
    exp: '',
    token: '',
  },
  setAuth: (auth: AuthModel) => {},
} as AuthContextType;

export const AuthContext = createContext(defaultState);

type AuthProviderProps = PropsWithChildren;

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [auth, setAuth] = useState<AuthModel>({
    userId: '',
    exp: '',
    token: '',
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
