/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DailyScreen from './screens/DailyScreen';
import InputScreen from './screens/InputScreen';
import { TodosContext } from './components/TodosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = createStackNavigator();

const App = () => {
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

  return (
    <TodosContext.Provider value={[todos, setTodos, handleDeleteTodo]}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <RootStack.Screen name="Daily Screen" component={DailyScreen} />
          <RootStack.Screen name="Input Screen" component={InputScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </TodosContext.Provider>
  );
};

export default App;
