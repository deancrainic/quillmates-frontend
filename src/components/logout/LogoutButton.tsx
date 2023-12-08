import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { UserDetailsContext } from '../../contexts/UserDetailsContext';

export default function LogoutButton() {
  const { setUserDetails } = useContext(UserDetailsContext);

  const handleLogout = async () => {
    auth()
      .signOut()
      .then(() => {
        setUserDetails({
          id: '',
          username: '',
          quote: '',
          interests: [],
          ignoredUsers: [],
          chats: [],
        });
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.fontText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fontText: {
    padding: 10,
    fontSize: 15,
  },
});
