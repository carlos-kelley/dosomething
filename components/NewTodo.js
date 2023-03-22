/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodosContext } from './TodosContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

const STORAGE_KEY = 'todos';

const NewTodo = () => {
  // This variable holds the user's input
  const [todos, setTodos] = useContext(TodosContext);
  const [newTodo, setNewTodo] = useState('');
  const [isAddTodoSuccess, setIsAddTodoSuccess] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

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
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.todoContainer}>
        <StatusBar translucent backgroundColor="transparent" />
        <Text style={styles.todo}>
          Add all the things you've been meaning to do!
        </Text>
        <TextInput
          style={styles.inputContainer}
          maxLength={30}
          returnKeyType="done"
          onSubmitEditing={handleAddTodo}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          blurOnSubmit={false}
          placeholder={isInputFocused ? '' : 'Do laundry'}
          placeholderTextColor="rgba(255, 255, 255, 0.75)"
          onChangeText={setNewTodo}
          value={newTodo}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleAddTodo}
        >
          <Image
            source={require('./images/addButton.png')}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              tintColor: 'white',
              opacity: 0.7,
            }}
          />
        </TouchableOpacity>
        {isAddTodoSuccess && (
          <View>
            <Text>Added!</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  // safeArea: {
  //   flex: 1,
  // },
  todoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todo: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Avenir Next',
    fontWeight: 'bold',
    textAlignVertical: 'top',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  inputContainer: {
    width: 300,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    padding: 10,
    opacity: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default NewTodo;
