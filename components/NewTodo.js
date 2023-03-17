import React from 'react';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'todos';

const NewTodo = () => {
  // This variable holds the user's input
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isAddTodoSuccess, setIsAddTodoSuccess] = useState(false);

  // Load todos from AsyncStorage on component mount
  useEffect(() => {
    async function loadTodos() {
      try {
        const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTodos !== null) {
          setTodos(JSON.parse(storedTodos));
        }
      } catch (e) {
        console.log(e);
      }
    }
    loadTodos();
  }, []);

  // Save todos to AsyncStorage when the list is updated
  useEffect(() => {
    async function saveTodos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (e) {
        console.log(e);
      }
    }
    saveTodos();
  }, [todos]);

  // This function adds the new todo to the list of todos
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
      setIsAddTodoSuccess(true);
      setTimeout(() => setIsAddTodoSuccess(false), 1500); // Set isAddTodoSuccess to false after 3 seconds
    }
  };

  return (
    <SafeAreaView>
      <Text>What do you want to do today?</Text>
      {/* input todos*/}
      <TextInput
        maxLength={30}
        placeholder="Enter here"
        onChangeText={setNewTodo}
        value={newTodo}
      />
      {/* button that adds to todos */}
      <TouchableOpacity title="Add" onPress={handleAddTodo}>
        <Text>Add{'\n'}</Text>
        {/* if handleAddTodo worked, write that it worked */}
        {isAddTodoSuccess && <Text>Added!</Text>}
        <FlatList
          data={todos}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NewTodo;
