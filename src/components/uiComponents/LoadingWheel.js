import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { Text, View } from 'react-native'

export function LoadingWheel() {
  return (
    <View>
        <ActivityIndicator
            animating={true}
            color="black"
            size="large"
        />
        <Text>
            Loading
        </Text>
    </View>
  )
}
