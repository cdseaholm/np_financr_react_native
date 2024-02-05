import React from 'react'
import { View, Text } from 'react-native'
import { StatusBar } from 'react-native'

export function Loadingpage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Loading!</Text>
      <StatusBar style="auto"/>
    </View>
  )
}



