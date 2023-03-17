import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'react-native';
import { TodosContext } from './TodosContext';
import DeleteButton from './DeleteButton';
import CompleteButton from './CompleteButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

// This component displays a random todo from the list of todos, once per day
function DailyTodo() {
  const [todos, setTodos, handleDeleteTodo] = useContext(TodosContext);
  const [dayOfYear, setDayOfYear] = useState(0);
  const [index, setIndex] = useState(null);
  const [completed, setCompleted] = useState(false);

  // // This effect runs once per day only if there is at least one todo

  useEffect(() => {
    // Get the current day of the year (between 1 and 365)
    const newDayOfYear = Math.floor(
      (Date.now() - new Date().setFullYear(new Date().getFullYear(), 0, 0)) /
        86400000,
    );

    // Set the index to a random number based on the current day of the year
    if (newDayOfYear !== dayOfYear && todos.length > 0) {
      const newIndex =
        (Math.floor(Math.random() * todos.length) + newDayOfYear) %
        todos.length;
      setIndex(newIndex);
      setDayOfYear(newDayOfYear);
      setCompleted(false);
    }
  }, [todos, dayOfYear]);

  const handleDeleteTodoPress = () => {
    handleDeleteTodo(index);
  };

  const handleCompleteTodoPress = () => {
    handleDeleteTodo(index);
    setCompleted(true);
  };

  return (
    <>
      {todos && todos.length === 0 && completed === false ? (
        <Text>Add a todo in the Input page</Text>
      ) : index !== null ? (
        <>
          {completed ? (
            <Text>Congratulations! You did something today.</Text>
          ) : (
            <>
              <Text>{todos[index]}</Text>
              <Text>Index is {index}</Text>
              <DeleteButton title="Delete" onPress={handleDeleteTodoPress} />
              <CompleteButton
                title="Complete"
                onPress={handleCompleteTodoPress}
              />
            </>
          )}
        </>
      ) : null}
    </>
  );
}

export default DailyTodo;
