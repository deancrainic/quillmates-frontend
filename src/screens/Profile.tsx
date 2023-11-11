import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LogoutButton from '../components/logout/LogoutButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AuthenticatedTabsParamList } from '../components/navigators/types/AuthenticatedTabsParamList';
import InputField from '../components/InputField';
import Interest from '../components/Interest';
import interestsList from '../utils/InterestsList';
import auth from '@react-native-firebase/auth';
type ProfileProps = BottomTabScreenProps<AuthenticatedTabsParamList, 'Profile'>;

const Profile = ({ navigation, route }: ProfileProps): JSX.Element => {
  const { usernameEditable } = route.params;

  const [username, setUsername] = useState('');
  const [quote, setQuote] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const onAddInterest = (name: string, selected: boolean) => {
    if (selected) {
      setInterests((prevState) => [...prevState, name]);
    } else {
      setInterests((prevState) => [
        ...prevState.filter((item) => item !== name),
      ]);
    }
  };

  const onSave = () => {
    console.log(interests);
    const currentUser = auth().currentUser;
    firestore().collection('UserDetails').doc(currentUser?.uid).set({
      username,
      quote,
      interests,
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
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={styles.title}>Account details</Text>
              <LogoutButton />
            </View>

            <View style={styles.inputsContainer}>
              <InputField
                label={'Username'}
                value={username}
                onChangeText={(text) => setUsername(text)}
                editable={usernameEditable}
              />
              <InputField
                label={'Favourite Quote'}
                value={quote}
                onChangeText={(text) => setQuote(text)}
                editable={true}
              />
            </View>

            <View>
              <Text style={styles.title}>My interests</Text>
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              style={styles.scroll}
            >
              {interestsList.map((item) => (
                <Interest
                  key={item.name}
                  icon={item.icon}
                  name={item.name}
                  onAdd={onAddInterest}
                />
              ))}
            </ScrollView>
            <TouchableOpacity onPress={onSave} style={styles.saveButton}>
              <Text style={styles.textButton}>Save</Text>
            </TouchableOpacity>
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
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  scroll: {
    flex: 0.5,
  },

  inputsContainer: {
    padding: 15,
    paddingTop: 0,
  },
  title: {
    fontSize: 30,
    padding: 10,
  },
  saveButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  textButton: {
    fontSize: 15,
  },
});

export default Profile;
