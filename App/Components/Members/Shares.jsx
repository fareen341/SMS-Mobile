import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const Shares = () => {
  const navigation = useNavigation();
  const sampleData = [
    {
      id: 1,
      shares_date: "27-01-2025",
      shares_transfer_date: "26-01-2025",
      total_amount_date: "27-01-2025",
      flat_name_formatted: "C - WING-001",
      folio_number: "12345",
      application_number: "23456",
      shares_certificate: "234567",
      allotment_number: "123",
      shares_from: "123",
      shares_to: "135",
      total_amount_received: 10000,
      transfer_from_folio_no: "123",
      transfer_to_folio_no: "134",
      date_of_cessation: null,
      unique_member_shares: 2,
      wing_flat: 3,
    },
  ];
  const data = sampleData[0];
  return (
    

   <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <LinearGradient colors={["#4169E1", "#27408B"]} style={styles.header}>
          <Text style={styles.headerText}>📈 Shares Details</Text>
        </LinearGradient>

        <Card.Content style={{ padding: 10 }}>

        <View
             style={{
               flexDirection: "row",
               alignItems: "center",
               marginBottom: 5,
             }}
           >
            <FontAwesome5 name="home" size={18} color="#2980b9" />
            <Text style={{ fontSize: 16, color: "#333", marginLeft: 10 }}>
               Flat: {data.flat_name_formatted}
             </Text>
           </View>
       <View
        style={{
               flexDirection: "row",
               alignItems: "center",
               marginBottom: 5,
             }}
           >
             <FontAwesome5 name="file-alt" size={18} color="#e67e22" />
             <Text style={{ fontSize: 16, color: "#333", marginLeft: 10 }}>
               Folio Number: {data.folio_number}
             </Text>
           </View>

           {/* Application & Certificate Details */}
           <View
             style={{
               flexDirection: "row",
               alignItems: "center",
              marginBottom: 5,
             }}
           >
             <FontAwesome5 name="clipboard" size={18} color="#16a085" />
             <Text style={{ fontSize: 16, color: "#333", marginLeft: 10 }}>
               Application No: {data.application_number}
             </Text>
           </View>
           <View
             style={{
               flexDirection: "row",
               alignItems: "center",
               marginBottom: 5,
             }}
          >
             <FontAwesome5 name="certificate" size={18} color="#d35400" />
             <Text style={{ fontSize: 16, color: "#333", marginLeft: 10 }}>
              Certificate No: {data.shares_certificate}
             </Text>
           </View>
           {/* Allotment & Share Range */}
           <View
             style={{
               flexDirection: "row",
               alignItems: "center",
               marginBottom: 5,
             }}
           >
             <FontAwesome5 name="list-ol" size={18} color="#8e44ad" />
            <Text style={{ fontSize: 16, color: "#333", marginLeft: 10 }}>
              Allotment No: {data.allotment_number}
             </Text>
           </View>

           <View
             style={{
               flexDirection: "row",
               alignItems: "center",
               marginBottom: 5,
             }}
           >
             <FontAwesome5 name="exchange-alt" size={18} color="#c0392b" />
             <Text style={{ fontSize: 16, color: "#333", marginLeft: 10 }}>
               Shares From: {data.shares_from} ➝ To: {data.shares_to}
             </Text>
           </View>

           {/* Financial Details */}
           <View
             style={{
               flexDirection: "row",
               alignItems: "center",
               marginBottom: 5,
             }}
           >
             <FontAwesome5 name="money-bill-wave" size={18} color="#27ae60" />
             <Text
               style={{
                 fontSize: 16,
                 fontWeight: "bold",
                 color: "#27ae60",
                 marginLeft: 10,
               }}
             >
               Total Amount Received: ₹{data.total_amount_received}
             </Text>
           </View>
           {/* Transfer Details */}
           <View
             style={{
               flexDirection: "row",
               alignItems: "center",
               marginBottom: 5,
             }}
           >
             <FontAwesome5 name="exchange-alt" size={18} color="#d35400" />
             <Text style={{ fontSize: 16, color: "#333", marginLeft: 10 }}>
               Transfer From Folio No: {data.transfer_from_folio_no} ➝ To:{" "}
               {data.transfer_to_folio_no}
             </Text>
           </View>

           {/* Date Information */}
           <View
             style={{
               flexDirection: "row",
               alignItems: "center",
               marginBottom: 5,
             }}
           >
             <FontAwesome5 name="calendar-alt" size={18} color="#2c3e50" />
             <Text style={{ fontSize: 16, color: "#333", marginLeft: 10 }}>
               Shares Date: {data.shares_date}
            </Text>
           </View>

           <View
             style={{
               flexDirection: "row",
               alignItems: "center",
               marginBottom: 5,
             }}
           >
             <FontAwesome5 name="calendar-alt" size={18} color="#2c3e50" />
             <Text style={{ fontSize: 16, color: "#333", marginLeft: 10 }}>
               Transfer Date: {data.shares_transfer_date}
             </Text>
           </View>

           <View
             style={{
               flexDirection: "row",
               alignItems: "center",
               marginBottom: 5,
             }}
           >
             <FontAwesome5 name="calendar-alt" size={18} color="#2c3e50" />
             <Text style={{ fontSize: 16, color: "#333", marginLeft: 10 }}>
               Total Amount Date: {data.total_amount_date}
             </Text>
           </View>
           {data.date_of_cessation && (
            <View
               style={{
                 flexDirection: "row",
                 alignItems: "center",
                 marginBottom: 5,
               }}
             >
               <FontAwesome5 name="calendar-times" size={18} color="#e74c3c" />
               <Text style={{ fontSize: 16, color: "#333", marginLeft: 10 }}>
                 Date of Cessation: {data.date_of_cessation}
               </Text>
             </View>
           )}

           {/* Additional Info */}
           <View
             style={{
               flexDirection: "row",
               alignItems: "center",
               marginBottom: 5,
             }}
           >
             <FontAwesome5 name="users" size={18} color="#1abc9c" />
            <Text style={{ fontSize: 16, color: "#333", marginLeft: 10 }}>
               Unique Member Shares: {data.unique_member_shares}
             </Text>
           </View>

           <View
             style={{
               flexDirection: "row",
               alignItems: "center",
               marginBottom: 5,
             }}
           >
            <FontAwesome5 name="building" size={18} color="#f39c12" />
             <Text style={{ fontSize: 16, color: "#333", marginLeft: 10 }}>
               Wing Flat: {data.wing_flat}
             </Text>
           </View>
         </Card.Content> 
         {/* Request Change Button */}
                <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => navigation.navigate("Change in Member Info")}
                >
                  <LinearGradient colors={["#FF512F", "#DD2476"]} style={styles.buttonGradient}>
                    <FontAwesome5 name="edit" size={18} color="#fff" />
                    <Text style={styles.buttonText}>Request Change</Text>
                  </LinearGradient>
                </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

export default Shares;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#eef2f3",
  },
  card: {
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#f4f6f9",
    elevation: 5,
    paddingBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    padding: 12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
    marginLeft: 10,
  },
  button: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 25,
    overflow: "hidden",
    alignSelf: "center",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
});
