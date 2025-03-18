import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, Avatar, List } from "react-native-paper";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
const MemberData = ({ memberID }) => {
    const navigation = useNavigation();
  // const [sampleData, setSampleData] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!memberID) return;

  //     try {
  //       const response = await axios.get(
  //         `https://society.zacoinfotech.com/api/members/${memberID}/`,
  //         {
  //           headers: {
  //             Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
  //           },
  //         }
  //       );

  //       setSampleData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [memberID]);

  const sampleData = [
    {
      id: 2,
      flat_name_formatted: "A - WING-001",
      member_name: "Fareen",
      member_position_formatted: "Nominal Member",
      ownership_percent: 10,
      member_dob: "01-01-2025",
      member_pan_no: "1234567890",
      member_aadhar_no: "123456789067",
      member_address: "mumbai",
      member_state: "Madhya Pradesh",
      member_pin_code: "234567",
      member_email: "fareen@gmail.com",
      member_contact: "3456789",
      member_emergency_contact: null,
      member_occupation: "Somce occ",
      member_is_primary: true,
      date_of_admission: "07-01-2025",
      age_at_date_of_admission: 0,
      sales_agreement_filename: "Login_Page_Design.jpeg",
      other_attachment_filename: null,
      date_of_entrance_fees: "31-01-2025",
      date_of_cessation: null,
      reason_for_cessation: null,
      wing_flat: 1,
      other_attachment: null,
      member_position: "nominal_member",
      sales_agreement:
        "https://society.zacoinfotech.com/media/files/Login_Page_Design.jpeg",
      member_is_primary_formatted: "Primary",
      nominees: [],
      same_flat_member_identification: "A - WING-001MEM3",
    },
    {
      id: 3,
      flat_name_formatted: "A - WING-001",
      member_name: "Fareen123",
      member_position_formatted: "Nominal Member",
      ownership_percent: 10,
      member_dob: "01-01-2025",
      member_pan_no: "1234567890",
      member_aadhar_no: "123456789067",
      member_address: "mumbai",
      member_state: "Madhya Pradesh",
      member_pin_code: "234567",
      member_email: "fareen@gmail.com",
      member_contact: "3456789",
      member_emergency_contact: null,
      member_occupation: "Somce occ",
      member_is_primary: true,
      date_of_admission: "07-01-2025",
      age_at_date_of_admission: 0,
      sales_agreement_filename: "Login_Page_Design.jpeg",
      other_attachment_filename: null,
      date_of_entrance_fees: "31-01-2025",
      date_of_cessation: null,
      reason_for_cessation: null,
      wing_flat: 1,
      other_attachment: null,
      member_position: "nominal_member",
      sales_agreement:
        "https://society.zacoinfotech.com/media/files/Login_Page_Design.jpeg",
      member_is_primary_formatted: "Primary",
      nominees: [],
      same_flat_member_identification: "A - WING-001MEM3",
    },
  ];

  const member = sampleData;
  // console.log("member123", member);
  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {sampleData.map((member, index) => (
            <Card key={index} mode="elevated" style={styles.card}>
              <List.Accordion
                title={member.member_name}
                description={member.member_position_formatted}
                titleStyle={styles.title}
                descriptionStyle={styles.description}
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="account-circle"
                    size={50}
                    style={styles.avatar}
                    color="white"
                  />
                )}
                expanded={expandedId === member.id}
                onPress={() =>
                  setExpandedId(expandedId === member.id ? null : member.id)
                }
                style={styles.accordion}
              >
                {/* Flat & Ownership Details */}
                <Card style={styles.detailCard}>
                  <Card.Content>
                    <Text style={styles.heading}>Flat Details</Text>
                    <Text style={styles.info}>
                      <FontAwesome5 name="building" size={18} color="#2980b9" />{" "}
                      {member.flat_name_formatted}
                    </Text>
                    <Text style={styles.info}>
                      <FontAwesome5
                        name="percentage"
                        size={18}
                        color="#f39c12"
                      />{" "}
                      Ownership: {member.ownership_percent}%
                    </Text>
                    <Text style={styles.info}>
                      <FontAwesome5
                        name="calendar-alt"
                        size={18}
                        color="#4169E1"
                      />{" "}
                      Date of Admission: {member.date_of_admission}
                    </Text>
                  </Card.Content>
                </Card>

                {/* Contact Details */}
                <Card style={styles.detailCard}>
                  <Card.Content>
                    <Text style={styles.heading}>Contact Information</Text>
                    <Text style={styles.info}>
                      <FontAwesome5 name="envelope" size={18} color="#e74c3c" />{" "}
                      {member.member_email}
                    </Text>
                    <Text style={styles.info}>
                      <FontAwesome5
                        name="phone-alt"
                        size={18}
                        color="#27ae60"
                      />{" "}
                      {member.member_contact}
                    </Text>
                  </Card.Content>
                </Card>

                {/* Personal Details */}
                <Card style={styles.detailCard}>
                  <Card.Content>
                    <Text style={styles.heading}>Personal Details</Text>
                    <Text style={styles.info}>
                      <MaterialIcons name="cake" size={18} color="#e74c3c" />{" "}
                      {member.member_dob}
                    </Text>
                    <Text style={styles.info}>
                      <FontAwesome5
                        name="briefcase"
                        size={18}
                        color="#27ae60"
                      />{" "}
                      Occupation: {member.member_occupation}
                    </Text>
                  </Card.Content>
                </Card>

                {/* Documents */}
                {member.sales_agreement && (
                  <Card style={styles.detailCard}>
                    <Card.Content>
                      <Text style={styles.heading}>Documents</Text>
                      <View style={styles.imageContainer}>
                        <Image
                          source={{ uri: member.sales_agreement }}
                          style={styles.image}
                          resizeMode="cover"
                        />
                      </View>
                      <Text style={styles.filename}>
                        {member.sales_agreement_filename}
                      </Text>
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
    </>
  );
};
export default MemberData;

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
