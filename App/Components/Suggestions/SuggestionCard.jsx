import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
const SuggestionCard = ({ item }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEyeClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
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
    <>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() => handleEyeClick(item)}
          style={styles.iconButton}
        >
          <Icon name="eye" size={20} color="#4169E1" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.iconButton}
        >
          <Icon name="edit" size={20} color="#4169E1" />
        </TouchableOpacity>

        {/* ////////Edit Modal/// */}
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
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default SuggestionCard;

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3, // Adjust width for proper alignment
    justifyContent: "flex-start",
  },
  iconButton: {
    paddingHorizontal: 10,
    color: "C4D9FF",
  },
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
    marginBlock: 10,
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
    marginRight: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
