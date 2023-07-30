import React, { Component, useEffect } from 'react'
import { Text, View } from 'react-native'

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Parent')
    },2000)
  },[])
  return (
    <View>
      <Text>Splash </Text>
    </View>
  )
}

export default Splash
