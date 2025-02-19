import * as React from 'react';
import {StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeNavigation from './App/Navigation/HomeNavigation';

import { LogBox } from 'react-native';

// Suppress the specific warning
LogBox.ignoreLogs([
  'Warning: TNodeChildrenRenderer: Support for defaultProps will be removed',
]);

// To suppress all warnings (not recommended for production)
LogBox.ignoreAllLogs();


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
