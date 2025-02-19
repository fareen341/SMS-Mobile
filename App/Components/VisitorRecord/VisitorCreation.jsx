import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import Toast from "react-native-toast-message";

const VisitorCreation = ({ fetchVisitors }) => {
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
        fetchVisitors();
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
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="plus-circle" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Create Visitor</Text>

              <TextInput
                placeholder="Full Name"
                value={visitorData.full_name}
                style={styles.input}
                onChangeText={(value) => handleChange("full_name", value)}
              />

              <TextInput
                placeholder="Contact No"
                value={visitorData.contact_no}
                keyboardType="phone-pad"
                style={styles.input}
                onChangeText={(value) => handleChange("contact_no", value)}
              />

              <TextInput
                placeholder="Email"
                value={visitorData.email}
                keyboardType="email-address"
                style={styles.input}
                onChangeText={(value) => handleChange("email", value)}
              />

              <TextInput
                placeholder="Visit Purpose"
                value={visitorData.visit_purpose}
                style={styles.input}
                onChangeText={(value) => handleChange("visit_purpose", value)}
              />

              <TextInput
                placeholder="Additional Note"
                value={visitorData.additional_note}
                style={styles.input}
                onChangeText={(value) => handleChange("additional_note", value)}
              />

              <TouchableOpacity style={styles.fileButton} onPress={pickFile}>
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
    </>
  );
};

export default VisitorCreation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: 350,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
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
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
