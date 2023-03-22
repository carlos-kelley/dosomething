import React, { useContext } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import DailyTodo from '../components/DailyTodo';
import InputNavButton from '../components/InputNavButton';
import { TodosContext } from '../components/TodosContext';
import { LinearGradient } from 'expo-linear-gradient';
const DailyScreen = () => {
  const [todos] = useContext(TodosContext);
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.dailybg}>
        <View style={styles.topRow}>
          <View style={styles.inputButtonWrapper}>
            <InputNavButton />
          </View>
        </View>
        <DailyTodo todos={todos} />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  dailybg: {
    // backgroundColor: 'linear-gradient(to bottom, rgb(18, 167, 173), #fff)',
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  inputButtonWrapper: {
    alignSelf: 'flex-end',
  },
});

export default DailyScreen;
