import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import NewTodo from '../components/NewTodo';
import { TodosContext } from '../components/TodosContext';
import { LinearGradient } from 'expo-linear-gradient';

const InputScreen = () => {
  const [todos] = useContext(TodosContext);
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={{ flex: 1 }}
    >
      <NewTodo todos={todos} />
    </LinearGradient>
  );
};

export default InputScreen;
