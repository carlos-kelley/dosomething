//button which deletes a todo on click
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CompleteButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('./images/complete.png')}
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

export default CompleteButton;
