import { StyleSheet, Text, View } from "react-native";
import { React, useState, useEffect} from "react";
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
import ChangeMemberScreen from "../Components/ChangeMember/ChangeMemberScreen";
import ChangeFlatInfoScreen from "../Components/ChangeFlatInfo/ChangeFlatInfoScreen";
import VisitorRecordScreen from "../Components/VisitorRecord/VisitorRecordScreen";
import AmenityScreen from "../Components/Amenity/AmenityScreen";
import ComplainScreen from "../Components/Complain/ComplainScreen";
import NocScreen from "../Components/Noc/NocScreen";
import LogoutScreen from "../Components/Logout/LogoutScreen";
import Member from "../Components/Members/Member";

const Drawer = createDrawerNavigator();
const HomeNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token); // Set to true if token exists
    };

    checkAuth();
  }, []);

  // if (!isAuthenticated) {
  //   return <LoginScreen />;
  // }

  return (
    <>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        {/* <Stack.Screen name="Home" component={DashboardScreen} /> */}
        <Drawer.Screen name="Tenant" component={TenantScreen} />
        <Drawer.Screen name="Members" component={Member} />
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
        <Drawer.Screen name="Logout" component={LogoutScreen} />
        
      </Drawer.Navigator>
    </>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
