// button which crosses off the todo, deletes it from the array, and shows a congratulatory message

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CompleteButton = ({ todo, todos, setTodos }) => {
  const [completed, setCompleted] = useState(false);

  const handleCompleteTodo = () => {
    setTodos(todos.filter((t) => t !== todo));
    setCompleted(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleCompleteTodo}>
        <Text>Complete</Text>
      </TouchableOpacity>
      {completed ? (
        <Text>Congratulations! You did something today.</Text>
      ) : null}
    </View>
  );
};

export default CompleteButton;
