//button which deletes a todo on click
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const DeleteButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Delete</Text>
    </TouchableOpacity>
  );
};

export default DeleteButton;
