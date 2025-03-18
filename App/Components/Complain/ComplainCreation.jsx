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

const ComplainCreation = ({ fetchVisitors }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [visitorData, setVisitorData] = useState({
    title: "",
    complain_description: "",

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
      !visitorData.title ||
      !visitorData.complain_description 
   
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


    try {
      // console.log("Submitting FormData:", formData);

      const response = await axios.post(
        "https://society.zacoinfotech.com/api/complain/",
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
        showToast("success", "🎉 Success!", "Complain created successfully.");
        setModalVisible(false);
        setVisitorData({
          title: "",
          complain_description: "",
         
        });
        setFile(null);
        fetchVisitors();
      }
    } catch (error) {
      console.error(
        "Error submitting Complain:",
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
        <Text style={styles.title}> Complain</Text>
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
                    <Text style={styles.modalTitle}>Add Complain</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Icon name="times" size={24} color="#4169E1" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.container2}>
                    <View>
                      <View style={styles.labelContainer2}>
                        <Text style={styles.label2}>
                          Nature of Complain in Short:
                        </Text>
                      </View>
                      <TextInput
                        placeholder="Nature of Complain in Short"
                        placeholderTextColor="#808080"
                        value={visitorData.title}
                        onChangeText={(value) =>
                          handleChange("title", value)
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
                        <Text style={styles.label2}>
                          Write Your Complaint in Details:
                        </Text>
                      </View>
                      <TextInput
                        placeholder="Write Your Complaint in Details"
                        placeholderTextColor="#808080"
                        value={visitorData.complain_description}
                        onChangeText={(value) =>
                          handleChange("complain_description", value)
                        }
                        mode="outlined"
                        style={[
                          styles.input2,
                          { height: 120, textAlignVertical: "top" },
                        ]}
                        multiline={true}
                        numberOfLines={4}
                        theme={{
                          colors: {
                            primary: "#4169E1",
                            outline: "#808080",
                          },
                        }}
                      />
                    </View>
                  </View>

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

export default ComplainCreation;

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
