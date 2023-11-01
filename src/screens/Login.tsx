import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputField from '../components/InputField';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { UnauthenticatedStackParamList } from '../components/navigators/types/UnauthenticatedStackParamList';
import { SafeAreaView } from 'react-native-safe-area-context';

type LoginProps = NativeStackScreenProps<
  UnauthenticatedStackParamList,
  'Login'
>;

const Login = ({ navigation }: LoginProps): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View>
          <Image
            source={require('../../assets/quillmateslogo.jpg')}
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

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>No account? Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log(`Login: ${email} + ${password}`)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  formContainer: {
    paddingTop: 10,
    flex: 0.4,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#16715e',
    padding: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default Login;
