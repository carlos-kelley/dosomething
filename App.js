import React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DailyScreen from './screens/DailyScreen';
import InputScreen from './screens/InputScreen';
import { TodosContext } from './components/TodosContext';

const RootStack = createStackNavigator();

const App = () => {
  const [todos, setTodos] = useState({ list: [] });

  return (
    <TodosContext.Provider value={[todos, setTodos]}>
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
