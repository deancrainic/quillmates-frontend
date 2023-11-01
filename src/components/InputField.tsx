import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type InputFieldProps = {
  label: string;
  placeholder: string;
};

const InputField = ({ label, placeholder }: InputFieldProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    fontSize: 12,
    color: 'darkgray',
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
  },
});

export default InputField;
