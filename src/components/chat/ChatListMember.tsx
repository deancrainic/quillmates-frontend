import React from 'react';
import { Text, View } from 'react-native';
import { ChatDetails } from '../../models/ChatDetails';

type ChatListMemberProps = {
  chatDetails: ChatDetails;
};
const ChatListMember = ({ chatDetails }: ChatListMemberProps): JSX.Element => {
  return (
    <View>
      <Text>{chatDetails.users[1]}</Text>
      <Text>
        {chatDetails.messages.slice(chatDetails.messages.length - 1)[0].content}
      </Text>
    </View>
  );
};

export default ChatListMember;
