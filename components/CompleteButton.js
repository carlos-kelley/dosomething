//button which deletes a todo on click
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const CompleteButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Complete</Text>
    </TouchableOpacity>
  );
};

export default CompleteButton;
