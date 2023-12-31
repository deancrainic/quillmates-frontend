import { ChatDetailsWithId } from './ChatDetails';

export default interface UserDetails {
  id: string;
  username: string;
  quote: string;
  interests: string[];
  ignoredUsers: string[];
  chats: ChatDetailsWithId[];
  country: string;
}
