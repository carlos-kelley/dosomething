import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'react-native';
import { TodosContext } from './TodosContext';
import DeleteButton from './DeleteButton';
import CompleteButton from './CompleteButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

// This component displays a random todo from the list of todos, once per day
function DailyTodo() {
  const [todos, setTodos, handleDeleteTodo] = useContext(TodosContext);
  const [index, setIndex] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    console.log('in dailyTodo useEffect, todos: ', todos);
    console.log(new Date().getTime());
    const getInitialIndex = async () => {
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const timestamp = midnight.getTime();
      const storedIndex = await AsyncStorage.getItem('index');
      const storedTimestamp = await AsyncStorage.getItem('timestamp');

      if (
        storedIndex !== null &&
        storedTimestamp !== null &&
        index !== 0 &&
        Number(storedTimestamp) > new Date().getTime()
      ) {
        setIndex(Number(storedIndex));
        console.log('in getInitialIndex, setIndex: ', Number(storedIndex));
        setCompleted(false);
      } else if (todos && todos.length > 0) {
        // check if todos is not empty
        const newIndex = Math.floor(Math.random() * todos.length);
        console.log('todos: ', todos);
        console.log('newIndex: ', newIndex);
        setIndex(newIndex);
        setCompleted(false);
        await AsyncStorage.setItem('index', newIndex.toString());
        await AsyncStorage.setItem('timestamp', timestamp.toString());
      }
    };

    getInitialIndex(); // Call getInitialIndex immediately on component mount

    const intervalId = setInterval(() => {
      getInitialIndex();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [todos]);

  const handleDeleteTodoPress = () => {
    handleDeleteTodo(index);
    if (index === todos.length - 1) {
      console.log('in handleDeleteTodoPress, index === todos.length');
      // If the deleted todo was the last one in the list,
      // set the index to the new last todo in the list
      setIndex(0);
    }
  };

  const handleCompleteTodoPress = () => {
    console.log('in handleCompleteTodoPress');
    handleDeleteTodo(index);
    setCompleted(true);
    console.log('completed: ', completed);
  };

  return (
    <>
      {todos && todos.length === 0 ? (
        <Text>Add a todo in the Input page</Text>
      ) : index !== null ? (
        <>
          {completed === true ? (
            <Text>Congratulations! You did something today.</Text>
          ) : (
            <>
              <Text>Index: {index}</Text>
              <Text>{todos[index]}</Text>
              <DeleteButton title="Delete" onPress={handleDeleteTodoPress} />
              <CompleteButton
                title="Complete"
                onPress={handleCompleteTodoPress}
              />
            </>
          )}
        </>
      ) : (
        <Text>Nope</Text>
      )}
    </>
  );
}

export default DailyTodo;
