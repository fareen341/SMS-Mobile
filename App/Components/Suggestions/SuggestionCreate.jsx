import React, { useState } from "react";
import { 
  Button, 
  Modal, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker"; 

const SuggestionCreate = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
// console.log("file",file)
  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type !== "cancel") {
      setFile(result);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Icon name={"plus-circle"} size={24} color="#fff" />
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
                {file ? `Selected: ${file?.assets[0]?.name}` : "Pick a File"}
              </Text>
            </TouchableOpacity>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.submitButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View>
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
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
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
    marginBlock:10
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
