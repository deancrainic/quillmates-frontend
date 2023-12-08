import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
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
  editable?: boolean;
};

const InputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  editable = true,
}: InputFieldProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (value.length === 0) {
      setHasText(false);
    } else {
      setHasText(true);
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
        editable={editable}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={togglePasswordVisibility}
        >
          <Text>
            {isPasswordVisible ? (
              <Icon name="eye-outline" size={23} color="#1a3e56" />
            ) : (
              <Icon name="eye-off-outline" size={23} color="#1a3e56" />
            )}
          </Text>
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
    height: 17,
  },
  label: {
    fontSize: 14,
    color: '#1a3e56',
  },
  labelFocused: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 0,
    borderColor: '#1a3e56',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  inputFocused: {
    borderBottomWidth: 2,
  },

  eyeButton: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
});

export default InputField;
