import { Message } from './Message';

export interface ChatDetails {
  users: string;
  messages: Message[];
}

export interface ChatDetailsWithId extends ChatDetails {
  id: string;
}
