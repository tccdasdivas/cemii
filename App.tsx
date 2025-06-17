import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import  Route  from './src/routes';
import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <Route/>
      <StatusBar style='light'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
