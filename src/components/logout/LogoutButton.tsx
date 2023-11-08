import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log('Error from logout');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
