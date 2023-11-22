import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserDetailsContext } from '../../contexts/UserDetailsContext';
import ChatListMember from './ChatListMember';

const ChatList = (): JSX.Element => {
  const { userDetails } = useContext(UserDetailsContext);

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={styles.listContainer}>
        {userDetails.chats.map((chat, index) => (
          <ChatListMember key={index} chatDetails={chat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});

export default ChatList;
