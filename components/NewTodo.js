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
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodosContext } from './TodosContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';

const STORAGE_KEY = 'todos';

const NewTodo = () => {
  // This variable holds the user's input
  const [todos, setTodos] = useContext(TodosContext);
  const [newTodo, setNewTodo] = useState('');
  const [isAddTodoSuccess, setIsAddTodoSuccess] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [placeholderOpacity] = useState(new Animated.Value(1));

  const navigation = useNavigation();

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

  useEffect(() => {
    blinkAnimation();
  }, [isInputFocused]);

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

  const blinkAnimation = () => {
    if (!isInputFocused) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(placeholderOpacity, {
            toValue: 0.7,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(placeholderOpacity, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      placeholderOpacity.setValue(1);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.todoContainer}>
        <StatusBar hidden={true} />
        <View style={styles.topRow}>
          <View style={styles.inputButtonWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Daily Screen')}
            >
              <Image
                source={require('./images/homeButton.png')}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'contain',
                  tintColor: 'white',
                  opacity: 0.7,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.centeredContent}>
          <Text style={styles.message}>
            Add all the things you've been meaning to do!
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              maxLength={30}
              returnKeyType="done"
              onSubmitEditing={handleAddTodo}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              blurOnSubmit={false}
              placeholder={isInputFocused ? '' : ' '}
              placeholderTextColor="rgba(255, 255, 255, 0.75)"
              onChangeText={setNewTodo}
              value={newTodo}
              style={styles.textInput}
            />
            {!isInputFocused && (
              <Animated.Text
                style={[
                  styles.placeholder,
                  {
                    opacity: placeholderOpacity,
                  },
                ]}
                pointerEvents="none"
              >
                Do laundry
              </Animated.Text>
            )}
          </View>

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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  // flexContainer: {
  //   flex: 1,
  //   backgroundColor: 'green',
  // },
  todoContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // paddingTop: 20,
    flex: 1,
    // paddingTop: StatusBar.currentHeight || 20,
    // backgroundColor: '#1E1E1E',
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
    // backgroundColor: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },

  inputContainer: {
    width: 300,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    padding: 10,
    opacity: 1,
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    // backgroundColor: 'white',
  },
  textInput: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    // backgroundColor: 'black',
  },
  placeholder: {
    color: 'rgba(255, 255, 255, 0.75)',
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
    alignSelf: 'center',
    textAlign: 'center',
    // backgroundColor: 'purple',
  },
  topRow: {
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // paddingHorizontal: 10,
    alignSelf: 'flex-start',
    paddingLeft: 10,
    // backgroundColor: 'pink',
  },
  inputButtonWrapper: {
    alignSelf: 'flex-start',
    // backgroundColor: 'orange',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewTodo;
