import * as React from "react";
import { StyleSheet, LogBox } from "react-native";
import { Provider as PaperProvider } from "react-native-paper"; 
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeNavigation from "./App/Navigation/HomeNavigation";

// Suppress specific warning
LogBox.ignoreLogs([
  "Warning: TNodeChildrenRenderer: Support for defaultProps will be removed",
]);

LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider> 
      <NavigationContainer>
        <HomeNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
