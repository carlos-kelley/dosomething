import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import NewTodo from '../components/NewTodo';
import { TodosContext } from '../components/TodosContext';

const InputScreen = () => {
  const [todos, setTodos] = useContext(TodosContext);
  return (
    <SafeAreaView>
      <NewTodo todos={todos} />
    </SafeAreaView>
  );
};

export default InputScreen;
