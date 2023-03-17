import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InputNavButton = ({ todos }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Input Screen', { todos });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>Input</Text>
    </TouchableOpacity>
  );
};

export default InputNavButton;
