import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
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
  Button,
  PermissionsAndroid,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LogoutButton from '../components/logout/LogoutButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AuthenticatedTabsParamList } from '../components/navigators/types/AuthenticatedTabsParamList';
import InputField from '../components/InputField';
import Interest from '../components/Interest';
import interestsDictionary from '../utils/InterestsList';
import auth from '@react-native-firebase/auth';
import { UserDetailsContext } from '../contexts/UserDetailsContext';
import Geolocation from 'react-native-geolocation-service';
type ProfileProps = BottomTabScreenProps<AuthenticatedTabsParamList, 'Profile'>;

const Profile = ({ navigation, route }: ProfileProps): JSX.Element => {
  const { usernameEditable } = route.params;
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const [username, setUsername] = useState(userDetails.username);
  const [quote, setQuote] = useState(userDetails.quote);
  const [interests, setInterests] = useState<string[]>(userDetails.interests);

  useEffect(() => {
    console.log(userDetails);
    setUsername(userDetails.username);
    setQuote(userDetails.quote);
    setInterests(userDetails.interests);
  }, [userDetails]);

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
    if (
      username.length === 0 ||
      interests.length === 0 ||
      !userDetails.country
    ) {
      Alert.alert(
        'Missing details :(',
        'Please enter a username and select at least an interest and press the button for getting the location',
      );

      return;
    }
    const currentUser = auth().currentUser;

    firestore().collection('UserDetails').doc(currentUser?.uid).set({
      username,
      quote,
      interests,
      ignoredUsers: userDetails.ignoredUsers,
      chats: userDetails.chats,
    });

    setUserDetails((prevState) => {
      return {
        id: currentUser!.uid,
        username,
        quote,
        interests,
        ignoredUsers: prevState.ignoredUsers,
        chats: prevState.chats,
        country: prevState.country,
      };
    });
  };

  const locationPermissionStatus = async function requestPermissions() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=9c82528e42414a968283acf2f0a3dd45`,
            )
              .then((response) => response.json())
              .then((data) => {
                // Extract country information from the response
                const country = data.results[0].components.country;
                // const countryObj = addressComponents.find(
                //   (component: { types: string[] }) =>
                //     component.types.includes('country'),
                // );

                if (country) {
                  console.log(country);
                  setUserDetails((prevState) => {
                    return {
                      id: prevState.id,
                      username: prevState.username,
                      quote: prevState.quote,
                      interests: prevState.interests,
                      ignoredUsers: prevState.ignoredUsers,
                      chats: prevState.chats,
                      country: country,
                    };
                  });
                }
              })
              .catch((error) => {
                console.error('Error fetching geolocation data:', error);
              });
          },
          (error) => {
            console.error('Error getting location:', error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    }
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

            <View style={styles.locationBtn}>
              <Button
                title="Use my location"
                color="green"
                onPress={locationPermissionStatus}
              />
            </View>

            <View>
              <Text style={styles.title}>My interests</Text>
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              style={styles.scroll}
            >
              {Object.keys(interestsDictionary).map((key) => (
                <Interest
                  key={key}
                  icon={interestsDictionary[key]}
                  name={key}
                  onAdd={onAddInterest}
                  initialSelected={interests.includes(key)}
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
    backgroundColor: '#f2f3f4',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  textButton: {
    fontSize: 15,
  },

  locationBtn: {
    padding: 15,
  },
});

export default Profile;
