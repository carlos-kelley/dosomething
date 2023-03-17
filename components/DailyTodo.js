/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Text } from 'react-native';
import { TodosContext } from './TodosContext';
import DeleteButton from './DeleteButton';
import CompleteButton from './CompleteButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

// This component displays a random todo from the list of todos, once per day
function DailyTodo() {
  // eslint-disable-next-line no-unused-vars
  const [todos, setTodos, handleDeleteTodo] = useContext(TodosContext);
  const [index, setIndex] = useState(null);
  const [completed, setCompleted] = useState(false);

  const logAsyncStorage = async () => {
    const storedIndex = await AsyncStorage.getItem('index');
    const storedTimestamp = await AsyncStorage.getItem('timestamp');
    const storedCompleted = await AsyncStorage.getItem('completed');
    console.log('storedIndex: ', storedIndex);
    console.log('storedTimestamp: ', storedTimestamp);
    console.log('storedCompleted: ', storedCompleted);
  };

  useEffect(() => {
    console.log('in completed useEffect, completed is:', completed);
    async function fetchCompleted() {
      try {
        const storedCompleted = await AsyncStorage.getItem('completed');
        if (storedCompleted === 'true') {
          console.log(
            'in true completed useEffect, stored is:',
            storedCompleted,
          );
          setCompleted(true);
        } else {
          console.log(
            'in false completed useEffect, stored is:',
            storedCompleted,
          );
          setCompleted(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchCompleted();
  }, [completed]);

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
        console.log('in getInitialIndex, setCompleted: ', completed);
      } else if (todos && todos.length > 0) {
        // check if todos is not empty
        const newIndex = Math.floor(Math.random() * todos.length);
        console.log('todos: ', todos);
        console.log('newIndex: ', newIndex);
        setIndex(newIndex);
        setCompleted(false);
        await AsyncStorage.setItem('index', newIndex.toString());
        await AsyncStorage.setItem('timestamp', timestamp.toString());
        await AsyncStorage.setItem('completed', 'false');
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

  const handleCompleteTodoPress = async () => {
    console.log('in handleCompleteTodoPress');
    handleDeleteTodo(index);
    setCompleted(true);
    console.log('completed: ', completed);
    await AsyncStorage.setItem('completed', 'true');
    logAsyncStorage();
  };

  // const logCompleted = () => {
  //   console.log('completed: ', completed);
  // };

  return (
    <>
      {todos && todos.length === 0 && completed === false ? (
        <Text>Add a todo in the Input page</Text>
      ) : index !== null ? (
        <>
          {completed === true ? (
            <>
              <Text>Congratulations! You did something meaningful today.</Text>

              <Text>See you tomorrow!</Text>
            </>
          ) : (
            <>
              {/* <TouchableOpacity onPress={logCompleted}>
                <Text>Log Completed</Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={logAsyncStorage}>
                <Text>Log AsyncStorage</Text>
              </TouchableOpacity> */}
              {/* <Text>Index: {index}</Text> */}
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
