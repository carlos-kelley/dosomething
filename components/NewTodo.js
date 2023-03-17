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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodosContext } from './TodosContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const STORAGE_KEY = 'todos';

const NewTodo = () => {
  // This variable holds the user's input
  const [todos, setTodos] = useContext(TodosContext);
  const [newTodo, setNewTodo] = useState('');
  const [isAddTodoSuccess, setIsAddTodoSuccess] = useState(false);

  // Load todos from AsyncStorage on component mount
  useEffect(() => {
    console.log('in NewTodo useEffect, todos: ', todos);

    async function loadTodos() {
      try {
        const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
        console.log('in NewTodo loadTodos, storedTodos: ', storedTodos);
        if (storedTodos === null) {
          setTodos([]);
          console.log('in NewTodo loadTodos, setTodos([])');
        } else if (storedTodos !== null) {
          setTodos(JSON.parse(storedTodos));
          console.log(
            'in NewTodo loadTodos, setTodos(JSON.parse(storedTodos), storedTodos: ',
            storedTodos,
          );
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

  async function logAsyncStorage() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);

      console.log('AsyncStorage contents:');
      items.forEach((item) => {
        console.log(`${item[0]}: ${item[1]}`);
      });
    } catch (error) {
      console.log('Error logging AsyncStorage:', error);
    }
  }
  async function clearAsyncStorage() {
    try {
      await AsyncStorage.clear();
      logAsyncStorage();
    } catch (error) {
      console.log('Error clearing AsyncStorage:', error);
    }
  }

  // This function adds the new todo to the list of todos
  const handleAddTodo = () => {
    logAsyncStorage();
    console.log('in handleAddTodo, newTodo: ', newTodo);
    if (newTodo.trim() !== '') {
      console.log('in handleAddTodo, todos is ', todos);
      setTodos([...todos, newTodo]);
      setNewTodo('');
      console.log('newTodo is now ', newTodo);
      setIsAddTodoSuccess(true);
      setTimeout(() => setIsAddTodoSuccess(false), 1500);
      // Set isAddTodoSuccess to false after 3 seconds
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView>
        <View style={{ height: '100%' }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                clearAsyncStorage();
              }}
            >
              <Text>Clear AsyncStorage</Text>
            </TouchableOpacity>
          </View>
          {/* input todos*/}
          <View>
            <TextInput
              maxLength={30}
              returnKeyType="done"
              onSubmitEditing={handleAddTodo}
              blurOnSubmit={false}
              placeholder="Add all the things you've been meaning to do!"
              onChangeText={setNewTodo}
              value={newTodo}
            />
          </View>
          {/* add todos button */}
          <View>
            <TouchableOpacity onPress={handleAddTodo}>
              <Text>Add</Text>
            </TouchableOpacity>
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
