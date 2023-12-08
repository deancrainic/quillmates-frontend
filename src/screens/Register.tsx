import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { UnauthenticatedStackParamList } from '../components/navigators/types/UnauthenticatedStackParamList';
import auth from '@react-native-firebase/auth';
import InputField from '../components/InputField';

type RegisterProps = NativeStackScreenProps<
  UnauthenticatedStackParamList,
  'Register'
>;

const Register = ({ navigation }: RegisterProps): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [email, password]);

  const handleRegister = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => console.log('Registered and logged in!'))
      .catch((err) => {
        setError('Invalid credentials');
        if (err.code === 'auth/invalid-email') {
          setError('Invalid email address');
        } else if (err.code === 'auth/email-already-in-use') {
          setError('Email is already in use');
        } else if (err.code === 'auth/weak-password') {
          setError('Password is too weak');
        }
      });
  };

  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={StatusBar.currentHeight}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <View>
              <Image
                source={require('../../assets/quillIcon.jpg')}
                style={styles.logo}
              />
              <InputField
                label={'email'}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <InputField
                label={'password'}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.errorContainer}>
              {error.length > 0 && (
                <Text style={styles.errorText}>{error}</Text>
              )}
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.belowButton}>Go to sign-in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    width: 250,
    alignSelf: 'center',
  },
  errorContainer: {
    height: 20,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
  },
  buttonsContainer: {
    marginTop: 30,
  },
  button: {
    alignItems: 'center',
    width: 200,
    alignSelf: 'center',
    backgroundColor: '#a38b48',
    padding: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '900',
  },
  belowButton: {
    marginTop: 4,
    alignSelf: 'center',
    color: '#1a3e56',
  },
});
export default Register;
