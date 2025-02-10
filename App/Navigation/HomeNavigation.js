import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DashboardScreen from "../Components/Dashboard/DashboardScreen";
import TenantScreen from "../Components/Tenant/TenantScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MemberScreen from "../Components/Members/MemberScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NoticeBoard from "../Components/NoticeBoard/NoticeBoard";
import Suggestion from "../Components/Suggestions/Suggestion";
const Stack = createStackNavigator();
import LoginScreen from "../Components/Login/LoginScreen";
import HouseHelpScreen from "../Components/HouseHelp/HouseHelpScreen";
import MeetingsScreen from "../Components/Meetings/MeetingsScreen";
import OfficeBearerScreen from "../Components/OfficeBearer/OfficeBearerScreen";
import NocScreen from "../Components/Noc/NocScreen";
import ChangeMemberScreen from "../Components/ChangeMember/ChangeMemberScreen";
import ChangeFlatInfoScreen from "../Components/ChangeFlatInfo/ChangeFlatInfoScreen";
import VisitorRecordScreen from "../Components/VisitorRecord/VisitorRecordScreen";
import AmenityScreen from "../Components/Amenity/AmenityScreen";
import ComplainScreen from "../Components/Complain/ComplainScreen";

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
      {/* <NavigationContainer> */}
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={DashboardScreen} />
        <Stack.Screen name="Next" component={MemberScreen} />
      </Stack.Navigator> */}
      {/* </NavigationContainer> */}

      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        {/* <Stack.Screen name="Home" component={DashboardScreen} /> */}
        <Drawer.Screen name="Tenant" component={TenantScreen} />
        <Drawer.Screen name="Members" component={MemberScreen} />
        {/* <Drawer.Screen name="Notice" component={NoticeBoard} /> */}
        <Stack.Screen name="Suggestion" component={Suggestion} />
        <Drawer.Screen name="Login" component={LoginScreen} />

        <Drawer.Screen name="House Help" component={HouseHelpScreen} />
        <Drawer.Screen name="Meetings" component={MeetingsScreen} />
        <Drawer.Screen name="Office Bearer" component={OfficeBearerScreen} />
        <Drawer.Screen name="Noc" component={NocScreen} />
        <Drawer.Screen name="Complain" component={ComplainScreen} />
        <Drawer.Screen name="Change in Member Info" component={ChangeMemberScreen} />
        <Drawer.Screen name="Change in Flat Info" component={ChangeFlatInfoScreen} />
        <Drawer.Screen name="Visitor" component={VisitorRecordScreen} />
        <Drawer.Screen name="Amenity" component={AmenityScreen} />

      </Drawer.Navigator>
    </>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
