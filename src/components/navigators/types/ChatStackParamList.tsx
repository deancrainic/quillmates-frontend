import { ChatDetailsWithId } from '../../../models/ChatDetails';

export type ChatStackParamList = {
  ChatList: undefined;
  Chat: { userChat: ChatDetailsWithId };
};
