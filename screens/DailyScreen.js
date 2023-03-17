import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import DailyTodo from '../components/DailyTodo';
import InputNavButton from '../components/InputNavButton';
import { TodosContext } from '../components/TodosContext';

const DailyScreen = () => {
  const [todos] = useContext(TodosContext);
  return (
    <SafeAreaView>
      <InputNavButton />
      <DailyTodo todos={todos} />
    </SafeAreaView>
  );
};

export default DailyScreen;
