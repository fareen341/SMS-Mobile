import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import MemberScreen from "./MemberScreen";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import MemberData from "./MemberData";
import HomeLoan from "./HomeLoan";
import Shares from "./Shares";
import GstDetails from "./GstDetails";
import VehicleDetails from "./VehicleDetails";

// Screen Components

const FlatScreen = ({ memberID }) => <MemberScreen memberID={memberID} />;
const MembersScreen = ({ memberID }) => <MemberData memberID={memberID} />;
const SharesScreen = () => <Shares  />;
const HomeLoansScreen = () => <HomeLoan  />;
const GstScreen = () => <GstDetails />;
const VehicleScreen = () => <VehicleDetails />;

const Screen = ({ text }) => (
  <View style={styles.screen}>
    <Text style={styles.screenText}>{text}</Text>
  </View>
);
// FontAwesome icon mapping
const icons = {
  flat: "users",
  member: "user",
  shares: "line-chart",
  home_loans: "building",
  gst: "money",
  vehicle: "car",
};

const Member = () => {
  const [memberID, setMemberID] = useState(null);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "flat", title: "FLAT" },
    { key: "member", title: "MEMBER" },
    { key: "shares", title: "SHARES" },
    { key: "home_loans", title: "HOME LOANS" },
    { key: "gst", title: "GST" },
    { key: "vehicle", title: "VEHICLE" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://society.zacoinfotech.com/get_user_id/",
          {
            method: "GET",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setMemberID(result?.user_id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

 
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "flat":
        return <FlatScreen memberID={memberID} />;
      case "member":
        return <MembersScreen memberID={memberID} />;
      case "shares":
        return <SharesScreen />;
      case "home_loans":
        return <HomeLoansScreen />;
      case "gst":
        return <GstScreen />;
      case "vehicle":
        return <VehicleScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Gradient Header */}

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            scrollEnabled={true}
            style={styles.tabBar}
            renderLabel={({ route, focused }) => (
              <View style={styles.tabItem}>
                <FontAwesome
                  name={icons[route.key]} // Correct mapping
                  size={20}
                  color={focused ? "#fff" : "#ccc"}
                />

                <Text style={[styles.label, focused && styles.activeLabel]}>
                  {route.title}
                </Text>
              </View>
            )}
            indicatorStyle={styles.indicator}
          />
        )}
      />
    </View>
  );
};

export default Member;

const styles = StyleSheet.create({
  header: {
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  tabBar: {
    backgroundColor: "#4169E1",
    elevation: 4,
    shadowOpacity: 0.2,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ccc",
    marginLeft: 5,
  },
  activeLabel: {
    color: "#fff",
  },
  indicator: {
    backgroundColor: "white",
    height: 4,
    borderRadius: 5,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
  },
  screenText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
