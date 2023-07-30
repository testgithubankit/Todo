import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Main from './Main';
const Drawer=createDrawerNavigator();

const DrawerNavigator=()=> {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Main' component={Main} options={{headerShown:false}} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
