import { ChatDetailsWithId } from '../models/ChatDetails';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { Timestamp } from '@react-native-firebase/firestore/lib/modular/Timestamp';
import { Message } from '../models/Message';

export interface UserChatContextInterface {
  userChat: ChatDetailsWithId;
  setUserChat: Dispatch<SetStateAction<ChatDetailsWithId>>;
}

const defaultState = {
  userChat: {
    id: '',
    users: '',
    messages: [
      {
        content: '',
        sentBy: '',
        sentAt: Timestamp.fromDate(new Date()),
      } as Message,
    ],
  } as ChatDetailsWithId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUserChat: (userChat: ChatDetailsWithId) => {},
} as UserChatContextInterface;

export const UserChatContext =
  createContext<UserChatContextInterface>(defaultState);
type UserProviderProps = {
  children: ReactNode;
};

export default function UserChatProvider({ children }: UserProviderProps) {
  const [userChat, setUserChat] = useState<ChatDetailsWithId>({
    id: '',
    users: '',
    messages: [
      {
        content: '',
        sentBy: '',
        sentAt: Timestamp.fromDate(new Date()),
      } as Message,
    ],
  });

  return (
    <UserChatContext.Provider value={{ userChat, setUserChat }}>
      {children}
    </UserChatContext.Provider>
  );
}
