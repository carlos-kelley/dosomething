import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import CompleteButton from '../components/CompleteButton';
import DailyTodo from '../components/DailyTodo';
import DeleteButton from '../components/DeleteButton';
import InputNavButton from '../components/InputNavButton';

const DailyScreen = ({ todos }) => {
  return (
    <SafeAreaView>
      <InputNavButton todos={todos} />
      {/* <DailyTodo /> */}
      <DeleteButton />
      <CompleteButton />
    </SafeAreaView>
  );
};

export default DailyScreen;
