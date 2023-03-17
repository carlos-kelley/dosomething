//button which deletes a todo on click

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const DeleteButton = ({ todo, todos, setTodos }) => {
  const handleDeleteTodo = () => {
    setTodos(todos.filter((t) => t !== todo));
  };

  return (
    <TouchableOpacity onPress={handleDeleteTodo}>
      <Text>Delete</Text>
    </TouchableOpacity>
  );
};

export default DeleteButton;
