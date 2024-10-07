import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Atracciones() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Atracciones</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0067C6',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});