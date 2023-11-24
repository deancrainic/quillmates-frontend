import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChatDetails } from '../../models/ChatDetails';

type ChatListMemberProps = {
  chatDetails: ChatDetails;
  handlePress: (userChat: ChatDetails) => void;
};
const ChatListMember = ({
  chatDetails,
  handlePress,
}: ChatListMemberProps): JSX.Element => {
  const onPress = () => {
    handlePress(chatDetails);
  };

  const renderSender = () => {
    return chatDetails.messages.slice(chatDetails.messages.length - 1)[0]
      .sentBy === chatDetails.users[0]
      ? 'You: '
      : 'Them: ';
  };

  const renderContext = () => {
    const message = chatDetails.messages.slice(
      chatDetails.messages.length - 1,
    )[0].content;

    return message.length > 40 ? message.slice(0, 40) + '...' : message;
  };

  const renderTime = () => {
    const date = chatDetails.messages
      .slice(chatDetails.messages.length - 1)[0]
      .sentAt.toDate();

    if (date.getDate() === new Date().getDate()) {
      return date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
      });
    } else if (date.getDate() === new Date().getDate() - 1) {
      return 'yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>{chatDetails.users[1]}</Text>
      <View style={styles.messageContainer}>
        <View style={styles.message}>
          <Text>{renderSender()}</Text>
          <Text>{renderContext()}</Text>
        </View>
        <Text>{renderTime()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomColor: 'darkgray',
    borderBottomWidth: 1,
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  message: {
    flexDirection: 'row',
  },
});

export default ChatListMember;
