import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Button,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Shirt, Dumbbell, Bike, Coins } from "lucide-react-native";
import WatchList from "./WatchList";
import Polls from "./Polls";
// import { Button } from "react-native-paper";
const { width, height } = Dimensions.get("window");
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import NoticeBoard from "../NoticeBoard/NoticeBoard";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const transactions = [
  {
    id: "1",
    icon: "bank",
    color: "#FF6B6B",
    title: "My Complains",
    amount: "$365.89",
    date: "Today",
    route: "Tenant",
  },
  {
    id: "2",
    icon: "commenting-o",
    color: "#FFCC00",
    title: "Noc Requests",
    amount: "$165.99",
    date: "26 Jan, 2019",
    route: "Members",
  },

  {
    id: "3",
    icon: "user",
    color: "#2ECC71",
    title: "Change tenant Info Request",
    amount: "$65.09",
    date: "15 Jan, 2019",
    route: "Tenant",
  },
  {
    id: "4",
    icon: "building-o",
    color: "#2ECC71",
    title: "Change Flat Info Request",
    amount: "$65.09",
    date: "15 Jan, 2019",
    route: "Members",
  },
];
const menuItems = [
  { icon: Shirt, color: "#4169E1", label: "FGM" },
  { icon: Dumbbell, color: "#2ECC71", label: "AGM" },
  { icon: Bike, color: "#F39C12", label: "MCM" },
  { icon: Coins, color: "#E74C3C", label: "SGM " },
  { icon: Shirt, color: "#4169E1", label: "LGM" },

];
const TransactionItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
      <View style={styles.itemContainer}>
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Icon name={item.icon} size={24} color="#fff" />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );
};
const data = [
  { id: 1, title: "Notice Board", icon: "clipboard-list" },
  { id: 2, title: "Poll", icon: "poll" },
  { id: 3, title: "Placement Alerts", icon: "calendar-check" },
  { id: 4, title: "Miscellaneous Circulars", icon: "atom-variant" },
];
const notices = [
  { id: "1", title: "Exam schedule released!", date: "Feb 03, 2025" },
  {
    id: "2",
    title: "Holiday Notice: Office closed on Feb 10",
    date: "Feb 02, 2025",
  },
  {
    id: "3",
    title: "Workshop on AI & ML – Register Now!",
    date: "Jan 30, 2025",
  },
  { id: "4", title: "Placement Drive - Infosys Hiring", date: "Jan 28, 2025" },
  { id: "5", title: "Annual Sports Day - Join the fun!", date: "Jan 25, 2025" },
  { id: "6", title: "Exam schedule released!", date: "Feb 03, 2025" },
  {
    id: "7",
    title: "Holiday Notice: Office closed on Feb 10",
    date: "Feb 02, 2025",
  },
  {
    id: "8",
    title: "Workshop on AI & ML – Register Now!",
    date: "Jan 30, 2025",
  },
  { id: "9", title: "Placement Drive - Infosys Hiring", date: "Jan 28, 2025" },
  {
    id: "10",
    title: "Annual Sports Day - Join the fun!",
    date: "Jan 25, 2025",
  },
];
const DashboardScreen = ({ navigation }) => {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
          <FlatList
            // data={transactions}
            // keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <>
                <View style={styles2.screenContainer}>
                  <View style={styles2.header}>
                    <Text style={styles2.heading}>Dashboard</Text>
                    <Image
                      source={{ uri: "https://i.pravatar.cc/100" }}
                      style={styles2.profileImage}
                    />
                  </View>

                  <View style={styles2.container1}>
                    <Text style={styles2.month}>January</Text>
                    <Text style={styles2.amount}>$ 500</Text>

                    <View style={styles2.progressBar}>
                      <View style={styles2.progressFill} />
                    </View>

                    <View style={styles2.targetContainer}>
                      <Text style={styles2.targetText}>
                        Daily spend target: $16.67
                      </Text>
                      <View style={styles2.stats}>
                        <Icon name="bar-chart" size={16} color="#fff" />
                        <Text style={styles2.percentage}>70%</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.container1}>
                  <FlatList
                    data={transactions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <TransactionItem item={item} />}
                    scrollEnabled={false}
                  />
                </View>

                <View style={styles3.container3}>
                  <View style={styles3.header3}>
                    <Text style={styles3.title3}>WISHLIST</Text>
                    <TouchableOpacity>
                      <Text style={styles3.seeAll}>See All</Text>
                    </TouchableOpacity>
                  </View>

                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles3.menuContainer}>
                      {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles3.menuItem}>
                          <View
                            style={[
                              styles3.iconContainer,
                              { backgroundColor: item.color },
                            ]}
                          >
                            <item.icon color="white" size={24} />
                          </View>
                          <Text style={styles3.label}>{item.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>

                <View style={styles.container1}>
                  <View>
                    <Text style={styles.headernotice}>📢 Notice Board</Text>
                    <ScrollView
                      style={styles.scrollContainer}
                      nestedScrollEnabled={true}
                    >
                      {notices.map((item) => (
                        <View
                          key={item.id.toString()}
                          style={styles.noticeCard}
                        >
                          <Text style={styles.noticeTitle}>{item.title}</Text>
                          <Text style={styles.noticeDate}>{item.date}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </View>
                <View>
                  <Polls />
                </View>
                {/* <NoticeBoard /> */}
              </>
            }
            // ListFooterComponent={
            //   <View style={styles.container1}>
            //     <Text style={styles.headernotice}>📢 Notice Board</Text>
            //     <FlatList
            //       data={notices}
            //       keyExtractor={(item) => item.id}
            //       renderItem={({ item }) => <NoticeItem item={item} />}
            //     />
            //   </View>
            // }
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
  },
  box: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#8080ff",
    backgroundImage: "linear-gradient(45deg, #ff7e5f, #feb47b)",
    borderRadius: 10,
  },
  box2: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#8080ff",
    backgroundImage: "linear-gradient(45deg, #6a11cb, #2575fc)",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tenantBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "90%",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginTop: 10,
  },
  tenantIcon: {
    marginRight: 10,
  },
  tenantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  container1: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  amount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },

  card: {
    width: "40%",
    aspectRatio: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },

  // notice////////////////////////////////////////////
  containernotice: {
    flex: 1,
    backgroundColor: "#FEECEB", // Light pink background
    padding: 20,
    // height:200,
    // overflow:"scroll"
  },
  headernotice: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  scrollContainer: {
    height: 300, // Set a specific height for scrollable area
    // overflow: "hidden", // Hide overflow content outside the box
  },
  noticeCard: {
    backgroundColor: "#C4D9FF",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  noticeDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
});

const styles2 = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
    // paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  container1: {
    backgroundColor: "#2D6DF6",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    // marginHorizontal:20
  },
  month: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
  },
  amount: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  progressBar: {
    height: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#fff",
  },
  targetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  targetText: {
    color: "#fff",
    fontSize: 12,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
  },
  percentage: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 12,
  },
});

const styles3 = StyleSheet.create({
  container3: {
    padding: 20,
  },
  header3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title3: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  seeAll: {
    fontSize: 14,
    color: "#666",
  },
  menuContainer: {
    flexDirection: "row",
    gap: 12,
  },
  menuItem: {
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    width: 86,
    height: 65,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
});
