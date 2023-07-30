import React, { Component } from 'react'
import { Text, View } from 'react-native'
import DrawerNavigator from '../Drawer/DraweNavigator';

const Parent=()=> {
    return (
      <View style={{flex:1}}>
       <DrawerNavigator/>
      </View>
      
    )
}

export default Parent;
