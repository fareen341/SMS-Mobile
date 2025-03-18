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
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const HomeLoan = () => {
  const navigation = useNavigation();

  const sampleData = [
    {
      id: 1,
      bank_loan_date: "27-01-2025",
      flat_name_formatted: "C - WING-001",
      bank_noc_file_formatted: null,
      bank_loan_name: "Kotak Bank",
      bank_loan_object: "Personal",
      bank_loan_value: "10000000",
      bank_loan_acc_no: "12345678",
      bank_loan_installment: "1000",
      bank_loan_status: "active",
      bank_loan_remark: "Nothinggg",
    },
  ];
  const member = sampleData[0];

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <LinearGradient colors={["#4169E1", "#27408B"]} style={styles.header}>
          <Text style={styles.headerText}>🏠 Home Loan Details</Text>
        </LinearGradient>

        <Card.Content style={{ padding: 10 }}>
          <View style={styles.row}>
            <FontAwesome5 name="calendar" size={18} color="#4169E1" />
            <Text style={styles.text}>Loan Date: {member.bank_loan_date}</Text>
          </View>

          <View style={styles.row}>
            <FontAwesome5 name="university" size={18} color="#2980b9" />
            <Text style={styles.text}>Bank: {member.bank_loan_name}</Text>
          </View>

          <View style={styles.row}>
            <FontAwesome5 name="info-circle" size={18} color="#f39c12" />
            <Text style={styles.text}>
              Loan Type: {member.bank_loan_object}
            </Text>
          </View>

          <View style={styles.row}>
            <FontAwesome5 name="money-bill-wave" size={18} color="#27ae60" />
            <Text style={styles.amount}>
              Loan Amount: ₹{member.bank_loan_value}
            </Text>
          </View>

          <View style={styles.row}>
            <FontAwesome5 name="credit-card" size={18} color="#8e44ad" />
            <Text style={styles.text}>
              Account No: {member.bank_loan_acc_no}
            </Text>
          </View>

          <View style={styles.row}>
            <FontAwesome5 name="calendar-check" size={18} color="#d35400" />
            <Text style={styles.text}>
              Installment: ₹{member.bank_loan_installment} per month
            </Text>
          </View>

          <View style={styles.row}>
            <FontAwesome5 name="chart-line" size={18} color="#2c3e50" />
            <Text style={styles.text}>Status: {member.bank_loan_status}</Text>
          </View>

          {member.bank_loan_remark && (
            <View style={styles.row}>
              <FontAwesome5 name="sticky-note" size={18} color="#e74c3c" />
              <Text style={styles.text}>Remark: {member.bank_loan_remark}</Text>
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

export default HomeLoan;

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
    // padding: 15,

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
