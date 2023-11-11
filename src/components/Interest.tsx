import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type InterestProps = {
  icon: string;
  name: string;
  onAdd: (name: string, selected: boolean) => void;
};
export default function Interest({ icon, name, onAdd }: InterestProps) {
  const [selected, setSelected] = useState(false);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onAdd(name, selected);
  }, [selected]);
  const handlePress = () => {
    setSelected((prevState) => !prevState);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={
          selected
            ? [styles.interest, styles.selectedInterest]
            : styles.interest
        }
      >
        <Icon name={icon} size={23} color="#16715e" />
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  interest: {
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 8,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    alignItems: 'center',
    width: 180,
  },

  selectedInterest: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});
