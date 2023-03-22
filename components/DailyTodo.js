/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TodosContext } from './TodosContext';
import DeleteButton from './DeleteButton';
import CompleteButton from './CompleteButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

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
  });

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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Trigger haptic feedback
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success);
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
        <View style={styles.todoWrapper}>
          <Text style={styles.todo}>Welcome!</Text>
          <Text style={styles.message}>Add a Todo on the Input page.</Text>
        </View>
      ) : index !== null ? (
        <>
          {completed === true ? (
            <>
              <Text style={styles.header}>Congratulations!</Text>
              <Text style={styles.message}>
                You did something meaningful today.
              </Text>

              <Text style={styles.message}>See you tomorrow!</Text>
            </>
          ) : (
            <>
              <View style={styles.todoWrapper}>
                <Text style={styles.todo}>{todos[index]}</Text>
                <View style={styles.buttonsContainer}>
                  <View style={styles.buttonWrapper}>
                    <DeleteButton
                      title="Delete"
                      onPress={handleDeleteTodoPress}
                    />
                  </View>
                  <View style={styles.buttonWrapper}>
                    <CompleteButton
                      title="Complete"
                      onPress={handleCompleteTodoPress}
                    />
                  </View>
                </View>
              </View>
            </>
          )}
        </>
      ) : (
        <Text>Null error.</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
  },
  todoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Avenir Next',
    fontWeight: '600',
    textAlignVertical: 'top',
    textAlign: 'center',
    marginBottom: 20,
    // paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  todo: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Avenir Next',
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    marginHorizontal: 20,
  },
});

export default DailyTodo;
