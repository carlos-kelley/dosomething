import React, { useContext } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import DailyTodo from '../components/DailyTodo';
import InputNavButton from '../components/InputNavButton';
import { TodosContext } from '../components/TodosContext';
import { LinearGradient } from 'expo-linear-gradient';
import GestureRecognizer from 'react-native-swipe-gestures';
// import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

const DailyScreen = () => {
  const [todos] = useContext(TodosContext);
  // const navigation = useNavigation();

  // const handleSwipeLeft = () => {
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  // };

  const config = {
    velocityThreshold: 0.7,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      style={styles.dailybg}
      config={config}
      // onSwipeLeft={() => {
      //   console.log('swiped left');
      //   handleSwipeLeft();
      // }}
    >
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.dailybg}>
          <View style={styles.topRow}>
            <InputNavButton />
          </View>
          <DailyTodo todos={todos} />
        </SafeAreaView>
      </LinearGradient>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  dailybg: {
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
    paddingRight: 10,
  },
});

export default DailyScreen;
