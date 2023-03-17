//button which deletes a todo on click
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const DeleteButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default DeleteButton;
