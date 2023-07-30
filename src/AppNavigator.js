import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';


import home from './Homepage'
import Signup from './Signup';
import Login from './Login';
import Homepage from './Homepage';
import Parent from './normal/Parent';
import Splash from './normal/Splash';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }}/>
        <Stack.Screen name='Parent' component={Parent} options={{ headerShown: false }}/>
        <Stack.Screen name="home" component={home} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
