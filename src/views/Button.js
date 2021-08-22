import React, {useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Pressable} from 'react-native';

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    padding: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    margin: 6,
    backgroundColor: '#9e9ef8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Button = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.sectionContainer}>
        <Pressable
          style={styles.button}
          onPress={increment}
          testID="btn-increment">
          <Text>+</Text>
        </Pressable>
        <Text style={styles.sectionTitle} testID="txt-count">
          Total Count: {count}
        </Text>
        <Pressable
          style={styles.button}
          onPress={decrement}
          testID="btn-decrement">
          <Text>-</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Button;
