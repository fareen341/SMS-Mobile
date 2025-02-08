import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomTab from '../Navigation/BottomTab'
import HomeNavigation from '../Navigation/HomeNavigation'

const Home = () => {
  return (
    <View>
      {/* <Text>Home</Text> */}
      {/* <BottomTab /> */}
      <HomeNavigation />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})