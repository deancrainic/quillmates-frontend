import React, { useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
  TouchableOpacity,
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (value.length === 0) {
      setHasText(false);
    }
  }, [value]);

  const handleTextChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const text = event.nativeEvent.text;
    onChangeText(text);
    text.length > 0 ? setHasText(true) : setHasText(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev); // Toggle password visibility
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
        secureTextEntry={!isPasswordVisible && secureTextEntry}
        value={value}
        onChange={handleTextChange}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={togglePasswordVisibility}
        >
          <Text>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      )}
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

  eyeButton: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
});

export default InputField;
