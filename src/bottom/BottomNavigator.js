import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
const Bottom=createBottomTabNavigator();

const BottomNavigator=()=> {
    return (
    <Bottom.Navigator>
      <Bottom.Screen name='Screen1' component={Screen1} options={{headerShown:false}}/>
      <Bottom.Screen name='Screen2' component={Screen2} options={{headerShown:false}}/>
      <Bottom.Screen name='Screen3' component={Screen3} options={{headerShown:false}}/>
    </Bottom.Navigator> 
    )
}

export default BottomNavigator;
