import React, { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import { UserDetailsContext } from '../contexts/UserDetailsContext';
import { UserDetailsWithScore } from '../models/UserDetailsWithScore';
import { calculateInterestsScore } from '../utils/InterestsList';
import QuillmateSuggestion from '../components/QuillmateSuggestion';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Timestamp } from '@react-native-firebase/firestore/lib/modular/Timestamp';

const FindQuillmates = (): JSX.Element => {
  const [suggestions, setSuggestions] = useState<UserDetailsWithScore[]>([]);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const handleSwipeLeft = (userId: string) => {
    setUserDetails((prevState) => {
      firestore()
        .collection('UserDetails')
        .doc(prevState.id)
        .update({
          ignoredUsers: [...prevState.ignoredUsers, userId],
        });

      return {
        ...prevState,
        ignoredUsers: [...prevState.ignoredUsers, userId],
      };
    });
  };

  const handleSwipeRight = (userId: string) => {
    setUserDetails((prevState) => {
      const dateSent = new Date();
      const chatId = prevState.id + userId;

      firestore()
        .collection('UserDetails')
        .doc(prevState.id)
        .collection('chats')
        .doc(chatId)
        .set({
          users: `${prevState.id}_${userId}`,
          messages: [
            {
              content: 'Hi!',
              sentBy: prevState.id,
              sentAt: Timestamp.fromDate(dateSent),
            },
          ],
        })
        .then(() => {
          firestore()
            .collection('UserDetails')
            .doc(userId)
            .collection('chats')
            .doc(chatId)
            .set({
              users: `${userId}_${prevState.id}`,
              messages: [
                {
                  content: 'Hi!',
                  sentBy: prevState.id,
                  sentAt: Timestamp.fromDate(dateSent),
                },
              ],
            });
        });

      return {
        ...prevState,
        chats: [
          ...prevState.chats,
          {
            id: chatId,
            users: `${prevState.id}_${userId}`,
            messages: [
              {
                content: 'Hi!',
                sentBy: prevState.id,
                sentAt: Timestamp.fromDate(dateSent),
              },
            ],
          },
        ],
      };
    });
  };

  const onUpdate = () => {
    firestore()
      .collection('UserDetails')
      .get()
      .then((querySnapshot) => {
        let users: UserDetailsWithScore[] = [];

        for (const user of querySnapshot.docs) {
          const userData = user.data() as UserDetailsWithScore;
          userData.id = user.id;
          userData.score = calculateInterestsScore(
            userDetails.interests,
            userData.interests,
          );

          if (userData.id === userDetails.id) {
            continue;
          }

          if (userDetails.ignoredUsers.includes(userData.id)) {
            continue;
          }

          if (
            userDetails.chats.filter((c) => c.users?.includes(userData.id))
              .length > 0
          ) {
            continue;
          }

          users.push(userData);
        }

        users = users.sort((a, b) => b.score - a.score).slice(0, 5);
        setSuggestions(users);
      });
  };

  useEffect(() => {
    onUpdate();
  }, [userDetails]);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.header}>Your top suggestions are...</Text>
        <ScrollView style={styles.listContainer}>
          {suggestions.map((suggestion) => (
            <QuillmateSuggestion
              quillmateDetails={suggestion}
              key={suggestion.id}
              onSwipeRight={handleSwipeRight}
              onSwipeLeft={handleSwipeLeft}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.tutContainer}>
        <View style={styles.tutIcon}>
          <Icon name={'gesture-swipe-left'} size={20} />
          <Text style={{ fontSize: 14 }}>Ignore suggestion</Text>
        </View>
        <View style={styles.tutIcon}>
          <Icon name={'gesture-swipe-right'} size={20} />
          <Text style={{ fontSize: 14 }}>Start chatting</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onUpdate}>
        <Text>Update quillmates sugestions</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  container: {
    flex: 0.96,
  },
  header: {
    color: '#1a3e56',
    fontSize: 30,
    padding: 10,
  },
  listContainer: {
    padding: 8,
    flex: 0.5,
  },
  button: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  tutIcon: {
    flexDirection: 'row',
  },
});

export default FindQuillmates;
