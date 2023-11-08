import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';

type InputFieldProps = {
  label: string;
  value: string;
  secureTextEntry?: boolean;
  onChangeText: (text: any) => void;
};

const InputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
}: InputFieldProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);

  const handleTextChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const text = event.nativeEvent.text;
    onChangeText(text);
    text.length > 0 ? setHasText(true) : setHasText(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.labelContainer]}>
        {(isFocused || hasText) && (
          <Text style={[styles.label, isFocused ? styles.labelFocused : {}]}>
            {label}
          </Text>
        )}
      </View>

      <TextInput
        style={[styles.input, isFocused ? styles.inputFocused : {}]}
        placeholder={isFocused ? '' : label}
        secureTextEntry={secureTextEntry}
        value={value}
        onChange={handleTextChange}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
  },
  labelContainer: {
    height: 15,
  },
  label: {
    fontSize: 14,
    color: '#16715e',
  },
  labelFocused: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 0,
    borderColor: '#16715e',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  inputFocused: {
    borderBottomWidth: 2,
  },
});

export default InputField;
