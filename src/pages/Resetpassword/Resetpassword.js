import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';


export function Resetpassword() {
    const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '66%', backgroundColor: 'rgb(76, 119, 85)', borderBottomLeftRadius: 50, borderBottomRightRadius: 10 }}>
        {/* Green top portion */}
      </View>
      <StatusBar style="auto" />

      <View style={{ paddingTop: 40, paddingBottom: 0, alignItems: 'center' }}>
        <Image source={require('../../images/nplogo.png')} style={{ height: 80, width: 80, borderRadius: 10 }} />
        <Text style={{color: 'white', paddingTop: 5, fontSize: 20}}>Financr</Text>
      </View>

      {/* title and form */}

      {/* title */}
      <View style={{ flex: 1, alignItems: 'center', paddingBottom: 80, justifyContent: "center" }}>
        <Animated.Text
          entering={FadeInUp.duration(1000).springify()}
          style={{ color: 'white', fontWeight: 'bold', fontSize: 20, justifyContent: "center", textAlign: "center" }}>
          Enter your email address and you'll get an email to reset your password
        </Animated.Text>
      </View>

      {/* form */}
      <View style={{ flex: 2, alignItems: 'center', paddingHorizontal: 10 }}>
        <Animated.View
          entering={FadeInDown.duration(1000).springify()}
          style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: 15, borderRadius: 20, width: '100%', marginBottom: 15 }}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={'gray'}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={{ width: '33%', marginBottom: 15 }}>
          <TouchableOpacity style={{ backgroundColor: 'rgb(76, 119, 85)', padding: 12, borderRadius: 20 }}
          onPress={() => navigation.navigate('Homepage')}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', textAlign: 'center'}}
            >Reset Password</Text>
          </TouchableOpacity>
        </Animated.View>
        {/* 
        Need a page to go to after resetting
        */}

                <Animated.View 
                    entering={FadeInDown.delay(600).duration(1000).springify()} 
                    style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 30, paddingTop: 30}}>

                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                        <Text style={{color: '#199fff'}}>Sign Up</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(800).duration(1000).springify()} 
                    style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}>
                      
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text style={{color: '#199fff'}}>Back to Login </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
  )
}

