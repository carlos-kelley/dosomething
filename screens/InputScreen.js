import React from 'react';
import { useState } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import NewTodo from '../components/NewTodo';

const InputScreen = () => {
  return (
    <SafeAreaView>
      <NewTodo />
    </SafeAreaView>
  );
};

export default InputScreen;
