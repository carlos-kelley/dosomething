import React, { useContext } from 'react';
import { SafeAreaView, FlatList, Text } from 'react-native';
import CompleteButton from '../components/CompleteButton';
import DailyTodo from '../components/DailyTodo';
import DeleteButton from '../components/DeleteButton';
import InputNavButton from '../components/InputNavButton';
import { TodosContext } from '../components/TodosContext';

const DailyScreen = () => {
  const [todos, setTodos] = useContext(TodosContext);
  return (
    <SafeAreaView>
      <InputNavButton />
      <DailyTodo todos={todos} />
      <DeleteButton />
      <CompleteButton />
    </SafeAreaView>
  );
};

export default DailyScreen;
