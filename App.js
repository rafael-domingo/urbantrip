import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import GlobalStyles from './util/GlobalStyles';

import Welcome from './screens/Welcome/Welcome';


export default function App() {
  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
      <Welcome/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(24, 28, 47)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
