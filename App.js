import * as React from 'react';
import {StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeNavigation from './App/Navigation/HomeNavigation';





// Drawer Navigator
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
     
      <HomeNavigation />
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({


});
