import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DailyNavButton = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('DailyScreen');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>Daily</Text>
    </TouchableOpacity>
  );
};

export default DailyNavButton;
