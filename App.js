/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DailyScreen from './screens/DailyScreen';
import InputScreen from './screens/InputScreen';
import { TodosContext } from './components/TodosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import * as Haptics from 'expo-haptics';

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

  const renderScene = SceneMap({
    daily: DailyScreen,
    input: InputScreen,
  });

  const initialLayout = { width: '100%' };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'daily', title: 'Daily Screen' },
    { key: 'input', title: 'Input Screen' },
  ]);

  return (
    <TodosContext.Provider value={[todos, setTodos, handleDeleteTodo]}>
      <NavigationContainer>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={() => null}
          onSwipeStart={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }
        />
      </NavigationContainer>
    </TodosContext.Provider>
  );
};

export default App;
