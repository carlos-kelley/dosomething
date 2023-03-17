import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'react-native';
import { TodosContext } from './TodosContext';
import DeleteButton from './DeleteButton';

// This component displays a random todo from the list of todos, once per day
function DailyTodo() {
  const [todos, setTodos, handleDeleteTodo] = useContext(TodosContext);
  const [dayOfYear, setDayOfYear] = useState(0);
  const [index, setIndex] = useState(null);

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
    }
  }, [todos, dayOfYear]);

  const handleDeleteTodoPress = () => {
    handleDeleteTodo(index);
  };

  return (
    <>
      {todos && todos.length === 0 ? (
        <Text>Add a todo in the Input page</Text>
      ) : index !== null ? (
        <>
          <Text>{todos[index]}</Text>
          <DeleteButton onPress={handleDeleteTodoPress} />
        </>
      ) : null}
    </>
  );
}

export default DailyTodo;
