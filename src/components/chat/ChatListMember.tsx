import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChatDetailsWithId } from '../../models/ChatDetails';
import firestore from '@react-native-firebase/firestore';

type ChatListMemberProps = {
  chatDetails: ChatDetailsWithId;
  handlePress: (username: string, userChat: ChatDetailsWithId) => void;
};
const ChatListMember = ({
  chatDetails,
  handlePress,
}: ChatListMemberProps): JSX.Element => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    firestore()
      .collection('UserDetails')
      .doc(chatDetails.users.split('_')[1])
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUsername(doc.data()?.username);
        }
      });
  }, []);

  const onPress = () => {
    handlePress(username, chatDetails);
  };

  const renderSender = () => {
    return chatDetails.messages.slice(chatDetails.messages.length - 1)[0]
      .sentBy === chatDetails.users.split('_')[0]
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
      <Text style={{ fontSize: 17, color: '#1a3e56' }}>{username}</Text>
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
    borderRadius: 10,
    backgroundColor: 'white',
    borderBottomColor: 'darkgray',
    borderBottomWidth: 1,
    padding: 15,
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
