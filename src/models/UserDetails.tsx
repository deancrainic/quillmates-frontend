import { ChatDetails } from './ChatDetails';

export default interface UserDetails {
  id: string;
  username: string;
  quote: string;
  interests: string[];
  ignoredUsers: string[];
  chats: ChatDetails[];
}
