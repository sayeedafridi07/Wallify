import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import StackCardItem from './StackCardItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { data } from '../data/images';

const StackCard = () => {
  const [actualIndex, setActualIndex] = useState(data.length - 1);
  return (
    <GestureHandlerRootView style={styles.gestureHandlerView}>
      <View style={styles.container}>
        {data.map((item, index) => (
          <StackCardItem
            key={item.id}
            actualIndex={actualIndex}
            item={item}
            index={index}
            setActualIndex={setActualIndex}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

export default StackCard;

const styles = StyleSheet.create({
  gestureHandlerView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
