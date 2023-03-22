/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DailyScreen from './screens/DailyScreen';
import InputScreen from './screens/InputScreen';
import { TodosContext } from './components/TodosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as Haptics from 'expo-haptics';
import 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler';

const App = () => {
  const Tab = createMaterialTopTabNavigator();

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log('in App useEffect, todos: ', todos);
    async function loadTodos() {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');
        setTodos(JSON.parse(storedTodos));
      } catch (e) {
        console.log(e);
      }
    }
    loadTodos();
  }, []);

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    AsyncStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const handleStateChange = (state) => {
    console.log('in handleStateChange, state.index: ', state.index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <TodosContext.Provider value={[todos, setTodos, handleDeleteTodo]}>
      <NavigationContainer
        onStateChange={(state) => {
          console.log('New state is', state);
          handleStateChange(state);
        }}
      >
        <Tab.Navigator tabBar={() => null}>
          <Tab.Screen name="Daily Screen" component={DailyScreen} />
          <Tab.Screen name="Input Screen" component={InputScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TodosContext.Provider>
  );
};

export default App;
