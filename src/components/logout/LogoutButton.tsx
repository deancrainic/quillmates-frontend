import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function LogoutButton() {
  const handleLogout = async () => {
    await auth().signOut();
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
