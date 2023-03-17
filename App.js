import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DailyScreen from './screens/DailyScreen';
import InputScreen from './screens/InputScreen';

const RootStack = createStackNavigator();

const App = () => {
  return (
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
  );
};

export default App;
