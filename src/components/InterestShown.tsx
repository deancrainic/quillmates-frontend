import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type InterestProps = {
  icon: string;
  name: string;
  common: boolean;
};
const InterestShown = ({ icon, name, common }: InterestProps) => {
  return (
    <View style={common ? [styles.interest, styles.common] : styles.interest}>
      <Icon name={icon} size={23} color="black" />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  interest: {
    margin: 3,
    padding: 10,
    backgroundColor: '#f8cbcb',
    borderRadius: 5,
    alignItems: 'center',
  },
  common: {
    backgroundColor: '#e6f6c9',
  },
  text: {
    fontSize: 14,
  },
});

export default InterestShown;
