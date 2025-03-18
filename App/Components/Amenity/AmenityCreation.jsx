import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import Toast from "react-native-toast-message";
import { TextInput } from "react-native-paper";

const AmenityCreation = ({ fetchVisitors }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [visitorData, setVisitorData] = useState({
    full_name: "",
    contact_no: "",
    email: "",
    visit_purpose: "",
    additional_note: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (key, value) => {
    setVisitorData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Document Picker for Visitor Photo
  const pickFile = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if (!result?.assets?.length) {
        console.log("No file selected");
        return;
      }
      setFile(result.assets[0]);
    } catch (error) {
      console.error("Error picking file:", error);
      showToast("error", "⚠️ File Selection Failed", "Something went wrong!");
    }
  };

  // Function to show Toast messages
  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      visibilityTime: 4000,
      position: "top",
    });
  };

  // Function to Submit Data
  const handleSubmit = async () => {
    if (
      !visitorData.full_name ||
      !visitorData.contact_no ||
      !visitorData.email ||
      !visitorData.visit_purpose
    ) {
      showToast(
        "error",
        "❌ Submission Failed",
        "Please fill all required fields!"
      );
      return;
    }

    setLoading(true);

    const formData = new FormData();
    for (const key in visitorData) {
      formData.append(key, visitorData[key]);
    }

    if (file) {
      formData.append("visitor_photo", {
        uri: file.uri,
        name: file.name || "visitor_photo.jpg", // Ensure a proper file name
        type: file.mimeType || "image/jpeg", // Default to image/jpeg
      });
    }

    try {
      // console.log("Submitting FormData:", formData);

      const response = await axios.post(
        "https://society.zacoinfotech.com/api/visitor_records/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
          },
          transformRequest: (data) => data, // Ensures FormData is sent correctly
        }
      );

      if (response.status === 201) {
        showToast("success", "🎉 Success!", "Visitor created successfully.");
        setModalVisible(false);
        setVisitorData({
          full_name: "",
          contact_no: "",
          email: "",
          visit_purpose: "",
          additional_note: "",
        });
        setFile(null);
        // fetchVisitors();
      }
    } catch (error) {
      console.error(
        "Error submitting visitor:",
        error.response?.data || error.message
      );
      showToast("error", "⚠️ Submission Failed", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.header1}>
        <Text style={styles.title}>Amenity</Text>
        <TouchableOpacity
          style={[styles.iconContainer, { backgroundColor: "#4169E1" }]}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.container}>
            <View style={styles.button}>
              <Icon name="plus-circle" size={24} color="#fff" />
            </View>

            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Visitor</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Icon name="times" size={24} color="#4169E1" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.container2}>
                    <View>
                      <View style={styles.labelContainer2}>
                        <Text style={styles.label2}>Enter Your Full Name:</Text>
                      </View>
                      <TextInput
                        placeholder="Full Name"
                        placeholderTextColor="#808080"
                        value={visitorData.full_name}
                        onChangeText={(value) =>
                          handleChange("full_name", value)
                        }
                        mode="outlined"
                        style={styles.input2}
                        theme={{
                          colors: {
                            primary: "#4169E1",
                            outline: "#808080",
                          },
                        }}
                      />
                    </View>
                    <View>
                      <View style={styles.labelContainer2}>
                        <Text style={styles.label2}>Contact No:</Text>
                      </View>
                      <TextInput
                        placeholder="Contact No"
                        placeholderTextColor="#808080"
                        value={visitorData.contact_no}
                        onChangeText={(value) =>
                          handleChange("contact_no", value)
                        }
                        mode="outlined"
                        style={styles.input2}
                        theme={{
                          colors: {
                            primary: "#4169E1",
                            outline: "#808080",
                          },
                        }}
                      />
                    </View>
                    <View>
                      <View style={styles.labelContainer2}>
                        <Text style={styles.label2}>Enter Your Email:</Text>
                      </View>
                      <TextInput
                        placeholderTextColor="#808080"
                        keyboardType="email-address"
                        placeholder="Email"
                        value={visitorData.email}
                        onChangeText={(value) => handleChange("email", value)}
                        mode="outlined"
                        style={styles.input2}
                        theme={{
                          colors: {
                            primary: "#4169E1",
                            outline: "#808080",
                          },
                        }}
                      />
                    </View>
                    <View>
                      <View style={styles.labelContainer2}>
                        <Text style={styles.label2}>Visit Purpose:</Text>
                      </View>
                      <TextInput
                        placeholderTextColor="#808080"
                        placeholder="Visit Purpose"
                        value={visitorData.visit_purpose}
                        onChangeText={(value) =>
                          handleChange("visit_purpose", value)
                        }
                        mode="outlined"
                        style={styles.input2}
                        theme={{
                          colors: {
                            primary: "#4169E1",
                            outline: "#808080",
                          },
                        }}
                      />
                    </View>
                    <View>
                      <View style={styles.labelContainer2}>
                        <Text style={styles.label2}>Additional Note:</Text>
                      </View>
                      <TextInput
                        placeholderTextColor="#808080"
                        placeholder="Additional Note"
                        value={visitorData.additional_note}
                        onChangeText={(value) =>
                          handleChange("additional_note", value)
                        }
                        mode="outlined"
                        style={styles.input2}
                        theme={{
                          colors: {
                            primary: "#4169E1",
                            outline: "#808080",
                          },
                        }}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.fileButton}
                    onPress={pickFile}
                  >
                    <Text style={styles.fileButtonText}>
                      {file ? `Selected: ${file.name}` : "Pick a Photo"}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text style={styles.buttonText}>Submit</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AmenityCreation;

const styles = StyleSheet.create({
  container2: {
    // padding: 15,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    marginBottom: 15,
  },
  labelContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginBlock: 5,
  },
  label2: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
    color: "rgba(7, 7, 7, 0.47)",
  },
  input2: {
    backgroundColor: "rgba(243, 238, 238, 0.47)",
    width: "100%",
    height: 50,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    // width: "100%",
    // position: "relative",
  },
  header1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: 350,
    borderRadius: 10,
    alignItems: "center",
  },

  fileButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  fileButtonText: {
    color: "white",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
