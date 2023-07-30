import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import AppNavigator from './src/AppNavigator';


function App() {
  return(
    <AppNavigator/>
  );

}

export default App;