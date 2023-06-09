/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import {
  Button,
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
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodosContext } from './TodosContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import soundUrl from './sounds/Morse.mp3';

const STORAGE_KEY = 'todos';

const NewTodo = () => {
  // This variable holds the user's input
  const [todos, setTodos] = useContext(TodosContext);
  const [newTodo, setNewTodo] = useState('');
  const [isAddTodoSuccess, setIsAddTodoSuccess] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [placeholderOpacity] = useState(new Animated.Value(1));
  const [sound, setSound] = useState(null);

  const navigation = useNavigation();
  const inputRef = useRef(null);
  const addButtonRef = useRef(null);

  useEffect(() => {
    async function loadSound() {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(soundUrl);
        await soundObject.setVolumeAsync(0.25);
        setSound(soundObject);
      } catch (error) {
        console.log('Error loading sound:', error);
      }
    }
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

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
    Haptics.notificationAsync(Haptics.ImpactFeedbackStyle.Error);
  }

  // This function adds the new todo to the list of todos
  const handleAddTodo = () => {
    logAsyncStorage();
    if (newTodo.trim() !== '') {
      playSound();
    }

    console.log('in handleAddTodo, newTodo: ', newTodo);
    if (newTodo.trim() !== '') {
      console.log('in handleAddTodo, todos is ', todos);
      setTodos([...todos, newTodo]);
      setNewTodo('');
      console.log('newTodo is now ', newTodo);
      setIsAddTodoSuccess(true);
      setTimeout(() => setIsAddTodoSuccess(false), 1500);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      // play
    }
  };

  const handleBackgroundPress = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    addButtonRef.current.measure(
      (x, y, width, height, pageXOffset, pageYOffset) => {
        if (
          pageX < pageXOffset ||
          pageX > pageXOffset + width ||
          pageY < pageYOffset ||
          pageY > pageYOffset + height
        ) {
          Keyboard.dismiss();
        }
      },
    );
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setNativeProps({
        selection: { start: newTodo.length, end: newTodo.length },
      });
    }
  }, [isInputFocused]);

  const playSound = async () => {
    if (sound) {
      try {
        await sound.setPositionAsync(0); // Reset sound to start
        await sound.playAsync();
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPressOut={handleBackgroundPress}
      accessible={false}
    >
      <SafeAreaView style={styles.todoContainer}>
        <StatusBar hidden={true} />
        <View style={styles.topRow}>
          <View style={styles.inputButtonWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
            {/* <TouchableOpacity
              onPress={clearAsyncStorage}
              style={{ marginLeft: 200 }}
            >
              <Image source={require('./images/deleteButton.png')} />
            </TouchableOpacity> */}
          </View>
        </View>
        {/* <Button
          title="Clear AsyncStorage"
          onPress={clearAsyncStorage}
          style={{ color: 'white' }}
        /> */}
        <KeyboardAvoidingView style={styles.todoContainer} behavior="padding">
          <View style={styles.centeredContent}>
            <Text style={styles.message}>Add some things you wanna do!</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref={inputRef}
                maxLength={40}
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
              {!isInputFocused && !newTodo && (
                <Animated.Text
                  style={[
                    styles.placeholder,
                    {
                      opacity: placeholderOpacity,
                    },
                  ]}
                  pointerEvents="none"
                >
                  Add a task
                </Animated.Text>
              )}
            </View>

            <View ref={addButtonRef} style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleAddTodo}>
                <Image
                  source={require('./images/addButton.png')}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: 'contain',
                    tintColor: 'white',
                    opacity: newTodo.length > 0 ? 1 : 0.7,
                  }}
                />
              </TouchableOpacity>
            </View>
            {/* </TouchableWithoutFeedback> */}
          </View>
        </KeyboardAvoidingView>
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
    marginHorizontal: 30,
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
