import React, { useState } from "react";
import { 
  Modal, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  ActivityIndicator 
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker"; 
import axios from "axios";
import Toast from "react-native-toast-message";

const SuggestionCreate = ({ fetchSuggestions }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Document Picker
  const pickFile = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      
      if (!result?.assets?.length) {
        console.log("No file selected");
        return;
      }
      
      setFile(result.assets[0]);  // Store only necessary data
    } catch (error) {
      console.error("Error picking file:", error);
      showToast("error", "⚠️ File Selection Failed", "Something went wrong while picking the file!");
    }
  };

  // Function to show Toast messages
  const showToast = (type, text1, text2) => {
    Toast.show({
      type,   // 'success', 'error', or 'info'
      text1,  // Main heading
      text2,  // Subtext
      visibilityTime: 4000,
      position: "top",
    });
  };

  // Function to Submit Data
  const handleSubmit = async () => {
    if (!text || !file) {
      showToast("error", "❌ Submission Failed", "Please enter a suggestion and select a file!");
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append("suggestion", text);
    formData.append("documents", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/octet-stream",
    });

    try {
      const response = await axios.post(
        "https://society.zacoinfotech.com/api/society_suggestions/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
          },
        }
      );

      if (response.status === 201) {
        showToast("success", "🎉 Success!", "Suggestion submitted successfully.");
        setModalVisible(false);
        setText("");
        setFile(null);
        fetchSuggestions();
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error.response?.data || error.message);
      showToast("error", "⚠️ Submission Failed", error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
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
              <Text style={styles.modalTitle}>Create Suggestion</Text>

              <TextInput 
                style={styles.input} 
                placeholder="Enter Your Suggestion" 
                value={text} 
                onChangeText={setText} 
              />

              <TouchableOpacity style={styles.fileButton} onPress={pickFile}>
                <Text style={styles.fileButtonText}>
                  {file ? `Selected: ${file.name}` : "Pick a File"}
                </Text>
              </TouchableOpacity>

              <View style={styles.buttonRow}>
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
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

     
      </View>
    </>
  );
};

export default SuggestionCreate;

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
    marginRight: 5,
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
