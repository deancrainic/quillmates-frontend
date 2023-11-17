import React, { useContext, useRef } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';
import { UserDetailsWithScore } from '../models/UserDetailsWithScore';
import interestsDictionary from '../utils/InterestsList';
import InterestShown from './InterestShown';
import { UserDetailsContext } from '../contexts/UserDetailsContext';

type QuillmateSuggestionProps = {
  quillmateDetails: UserDetailsWithScore;
  onSwipeRight: (text: any) => void;
  onSwipeLeft: (text: any) => void;
};
const QuillmateSuggestion = ({
  quillmateDetails,
  onSwipeRight,
  onSwipeLeft,
}: QuillmateSuggestionProps): JSX.Element => {
  const { userDetails } = useContext(UserDetailsContext);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(event, gestureState);
      },
      onPanResponderRelease: (event, gestureState) => {
        const swipeDistanceThreshold = 200;

        if (gestureState.dx > swipeDistanceThreshold) {
          onSwipeRight(quillmateDetails.id);
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        } else if (gestureState.dx < -swipeDistanceThreshold) {
          onSwipeLeft(quillmateDetails.id);
          Animated.timing(pan, {
            toValue: { x: -500, y: 0 }, // Adjust the destination position as needed
            duration: 300, // Adjust the duration as needed
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ translateX: pan.x }, { translateY: 0 }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.field}>
        <Text style={styles.name}>{quillmateDetails.username}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.quote}>&quot;{quillmateDetails.quote}&quot;</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.text}>Common interests: </Text>
        <Text style={styles.text}>{quillmateDetails.score}</Text>
      </View>
      <View style={styles.scrollContainer}>
        {quillmateDetails.interests.map((item) => (
          <InterestShown
            key={item}
            icon={interestsDictionary[item]}
            name={item}
            common={userDetails.interests.includes(item)}
          />
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },
  field: {
    flexDirection: 'row',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  quote: {
    fontSize: 16,
    color: '#365204',
  },
  text: {
    fontSize: 14,
    color: '#03736a',
  },
});

export default QuillmateSuggestion;
