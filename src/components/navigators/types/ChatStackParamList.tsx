import { ChatDetailsWithId } from '../../../models/ChatDetails';

export type ChatStackParamList = {
  ChatList: undefined;
  Chat: { username: string; userChat: ChatDetailsWithId };
};
