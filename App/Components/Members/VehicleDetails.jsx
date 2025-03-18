import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card, List, Avatar } from "react-native-paper";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
const VehicleDetails = () => {
  const navigation = useNavigation();
  const [expandedId, setExpandedId] = useState(null);

  const vehicleData = [
    {
      id: 1,
      flat_name_formatted: "C - WING-001",
      rc_copy_formatted: "other-document_Z2dMmg2.pdf",
      parking_lot: "Lot D",
      vehicle_type: "SUV",
      vehicle_number: "MH 02 CF 3786",
      vehicle_brand: "Mahindra Thar",
      rc_copy:
        "https://society.zacoinfotech.com/media/files/other-document_Z2dMmg2.pdf",
      sticker_number: "12345",
      select_charge: "no",
      chargable: "",
      date_of_cessation: null,
      unique_member_shares: 2,
      wing_flat: 3,
    },
    {
      id: 2,
      flat_name_formatted: "C - WING-001",
      rc_copy_formatted: "sanathan_o2j8HzT.png",
      parking_lot: "C Lot",
      vehicle_type: "Bike",
      vehicle_number: "mh 02 cd 1234",
      vehicle_brand: "yamaha R15",
      rc_copy:
        "https://society.zacoinfotech.com/media/files/sanathan_o2j8HzT.png",
      sticker_number: "5456",
      select_charge: "yes",
      chargable: "100",
      date_of_cessation: null,
      unique_member_shares: 2,
      wing_flat: 3,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {vehicleData.map((vehicle, index) => (
          <Card key={index} mode="elevated" style={styles.card}>
            <List.Accordion
              title={vehicle.vehicle_number}
              description={vehicle.vehicle_brand}
              titleStyle={styles.title}
              descriptionStyle={styles.description}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="car"
                  size={50}
                  style={styles.avatar}
                  color="white"
                />
              )}
              expanded={expandedId === vehicle.id}
              onPress={() =>
                setExpandedId(expandedId === vehicle.id ? null : vehicle.id)
              }
              style={styles.accordion}
            >
              {/* Vehicle Details */}
              <Card style={styles.detailCard}>
                <Card.Content>
                  <Text style={styles.heading}>Vehicle Information</Text>
                  <Text style={styles.info}>
                    <FontAwesome5 name="car" size={18} color="#2980b9" />{" "}
                    {vehicle.vehicle_brand} ({vehicle.vehicle_type})
                  </Text>
                  <Text style={styles.info}>
                    <FontAwesome5
                      name="map-marker-alt"
                      size={18}
                      color="#f39c12"
                    />{" "}
                    Parking Lot: {vehicle.parking_lot}
                  </Text>
                  <Text style={styles.info}>
                    <FontAwesome5 name="id-card" size={18} color="#4169E1" />{" "}
                    Sticker Number: {vehicle.sticker_number}
                  </Text>
                </Card.Content>
              </Card>

              {/* RC Copy */}
              {vehicle.rc_copy && (
                <Card style={styles.detailCard}>
                  <Card.Content>
                    <Text style={styles.heading}>RC Copy</Text>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(vehicle.rc_copy)}
                    >
                      <Text style={styles.link}>
                        {vehicle.rc_copy_formatted}
                      </Text>
                    </TouchableOpacity>
                  </Card.Content>
                </Card>
              )}
            </List.Accordion>
          </Card>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Change in Member Info")}
        >
          <LinearGradient
            colors={["#FF512F", "#DD2476"]}
            style={styles.buttonGradient}
          >
            <FontAwesome5 name="edit" size={18} color="#fff" />
            <Text style={styles.buttonText}>Request Change</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VehicleDetails;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 20, // Extra space for smooth scrolling
  },
  container: {
    padding: 15,
    backgroundColor: "#F4F4F4", // Light background for contrast
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5, // Shadow effect for better UI
    backgroundColor: "#FFFFFF",
    marginBottom: 5,
  },
  accordion: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  avatar: {
    backgroundColor: "#4169E1",
  },
  detailCard: {
    // marginBottom: 15,
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 4,
    padding: 1,
    paddingLeft: 0,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginTop: 3,
  },
  imageContainer: {
    marginTop: 10,
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: 180,
  },
  filename: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 5,
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
