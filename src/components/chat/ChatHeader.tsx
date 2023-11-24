import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ChatHeaderProps = {
  username: string;
  handleBack: () => void;
};
const ChatHeader = ({ username, handleBack }: ChatHeaderProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={handleBack}>
        <Icon name={'arrow-left'} size={23} color="black" />
      </TouchableOpacity>
      <Text style={styles.username}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  backIcon: {
    flex: 0.3,
  },
  username: {
    flex: 1,
  },
});

export default ChatHeader;
