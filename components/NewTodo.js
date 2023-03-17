import React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodosContext } from './TodosContext';

const STORAGE_KEY = 'todos';

// const DismissKeyboard = ({ children }) => (
//   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//     {children}
//   </TouchableWithoutFeedback>
// );

const NewTodo = () => {
  // This variable holds the user's input
  const [todos, setTodos] = useContext(TodosContext);
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
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodo('');
      setIsAddTodoSuccess(true);
      setTimeout(() => setIsAddTodoSuccess(false), 1500); // Set isAddTodoSuccess to false after 3 seconds
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView>
        <View style={{ height: '100%' }}>
          <View>
            <Text>What do you want to do today?</Text>
          </View>
          {/* input todos*/}
          <View>
            <TextInput
              maxLength={30}
              returnKeyType="done"
              onSubmitEditing={handleAddTodo}
              blurOnSubmit={false}
              placeholder="Enter here"
              onChangeText={setNewTodo}
              value={newTodo}
            />
          </View>

          {isAddTodoSuccess && (
            <View>
              <Text>Added!</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default NewTodo;
