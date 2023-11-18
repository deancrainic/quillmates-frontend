import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import UserDetails from '../models/UserDetails';

export interface UserDetailsContextInterface {
  userDetails: UserDetails;
  setUserDetails: Dispatch<SetStateAction<UserDetails>>;
}

const defaultState = {
  userDetails: {
    id: '',
    username: '',
    quote: '',
    interests: [],
    ignoredUsers: [],
    chats: [],
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUserDetails: (userDetails: UserDetails) => {},
} as UserDetailsContextInterface;
export const UserDetailsContext =
  createContext<UserDetailsContextInterface>(defaultState);
type UserProviderProps = {
  children: ReactNode;
};

export default function UserDetailsProvider({ children }: UserProviderProps) {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    id: '',
    username: '',
    quote: '',
    interests: [],
    ignoredUsers: [],
    chats: [],
  });
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
}
