import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DashboardScreen from "../Components/Dashboard/DashboardScreen";
import TenantScreen from "../Components/Tenant/TenantScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MemberScreen from "../Components/Members/MemberScreen";
const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    <>
      {/* <Stack.Navigator screenOptions={{headerShown:false}}>

    <Stack.Screen name='login' component={Login}></Stack.Screen>
    <Stack.Screen name='home' component={Home}></Stack.Screen>
    <Stack.Screen name='course-details' component={CourseDetails}></Stack.Screen>
    <Stack.Screen name='course-chapter' component={CourseChapter}></Stack.Screen>
    
   </Stack.Navigator> */}

      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="Tenant" component={TenantScreen} />
        <Drawer.Screen name="Members" component={MemberScreen} />
      </Drawer.Navigator>
    </>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
