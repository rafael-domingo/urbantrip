import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import GlobalStyles from './util/GlobalStyles';

import Welcome from './screens/Welcome/Welcome';
import Home from './screens/Home/Home';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
      
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Welcome'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Group>
            <Stack.Screen 
              name='Welcome' 
              component={Welcome}           
            />
            <Stack.Screen 
              name='Home' 
              component={Home}
              options={{
                animation: 'fade',
                gestureEnabled: false
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>     
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
