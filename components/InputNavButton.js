import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InputNavButton = ({ todos }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Input Screen', { todos });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={require('./images/inputButton.png')}
        style={{
          width: 40,
          height: 40,
          resizeMode: 'contain',
          tintColor: 'white',
          opacity: 0.7,
          paddingRight: 10,
        }}
      />
    </TouchableOpacity>
  );
};

export default InputNavButton;
