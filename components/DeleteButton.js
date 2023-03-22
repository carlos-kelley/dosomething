//button which deletes a todo on click
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const DeleteButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('./images/deleteButton.png')}
        style={{
          width: 40,
          height: 40,
          resizeMode: 'contain',
          tintColor: 'white',
          opacity: 0.7,
        }}
      />
    </TouchableOpacity>
  );
};

export default DeleteButton;
