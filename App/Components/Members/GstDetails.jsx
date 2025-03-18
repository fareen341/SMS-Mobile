import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const GstDetails = () => {
    const navigation = useNavigation();
  const gstData = {
    id: 2,
    flat_name_formatted: "C - WING-001",
    gst_number: "12345678",
    gst_state: "Maharashtra",
    gst_billing_name: "Huda Momin",
    gst_billing_address: "asdfgjtre",
    gst_contact_no: "123456789",
    date_of_cessation: null,
    unique_member_shares: 2,
    wing_flat: 3,
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <LinearGradient colors={["#4169E1", "#27408B"]} style={styles.header}>
          <Text style={styles.headerText}>🧾 GST Details</Text>
        </LinearGradient>

        <Card.Content style={{ padding: 10 }}>
          <View style={styles.row}>
            <FontAwesome5 name="building" size={18} color="#2E8B57" />
            <Text style={styles.text}>
              Flat Name: {gstData.flat_name_formatted}
            </Text>
          </View>

          <View style={styles.row}>
            <FontAwesome5 name="file-invoice" size={18} color="#8e44ad" />
            <Text style={styles.text}>GST Number: {gstData.gst_number}</Text>
          </View>

          <View style={styles.row}>
            <FontAwesome5 name="map-marker-alt" size={18} color="#e74c3c" />
            <Text style={styles.text}>State: {gstData.gst_state}</Text>
          </View>

          <View style={styles.row}>
            <FontAwesome5 name="user" size={18} color="#2980b9" />
            <Text style={styles.text}>
              Billing Name: {gstData.gst_billing_name}
            </Text>
          </View>

          <View style={styles.row}>
            <FontAwesome5 name="address-card" size={18} color="#f39c12" />
            <Text style={styles.text}>
              Billing Address: {gstData.gst_billing_address}
            </Text>
          </View>

          <View style={styles.row}>
            <FontAwesome5 name="phone-alt" size={18} color="#27ae60" />
            <Text style={styles.text}>
              Contact No: {gstData.gst_contact_no}
            </Text>
          </View>

          {gstData.date_of_cessation && (
            <View style={styles.row}>
              <FontAwesome5 name="calendar-times" size={18} color="#d35400" />
              <Text style={styles.text}>
                Date of Cessation: {gstData.date_of_cessation}
              </Text>
            </View>
          )}
        </Card.Content>
        {/* Request Change Button */}
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
      </Card>
    </ScrollView>
  );
};

export default GstDetails;

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
