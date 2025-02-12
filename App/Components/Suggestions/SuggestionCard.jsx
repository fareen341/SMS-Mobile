import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { DataTable, Button, IconButton } from "react-native-paper";
const SuggestionCard = ({ item }) => {
  console.log("item",item)
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEyeClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  const [modalVisible, setModalVisible] = useState(false);
  //  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  // console.log("file",file)
  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type !== "cancel") {
      setFile(result);
    }
  };
  const handleViewClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Handle edit icon click (Open blank modal)
  const handleEditClick = (item) => {
    // setSelectedItem(item);
    // setEditModalVisible(true);
    setSelectedItem(item);
    setEditModalVisible(true);
  };
  return (
    <>
      {/* <View style={styles.actionContainer}>
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

      </View> */}
      <View style={styles.iconContainer1}>
        <IconButton
          icon="eye"
          size={20}
          onPress={() => handleViewClick(item)}
          style={styles.iconButton}
        />
        <IconButton
          icon="pencil"
          size={20}
          onPress={() => handleEditClick(item)}
          style={styles.iconButton}
        />
      </View>
      {/* ////////Edit Modal/// */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
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
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* View Details Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>Tenant Details</Text>
                <Text style={styles.modalText}>
                  Name: {selectedItem.tenant_name}
                </Text>
                <Text style={styles.modalText}>
                  PAN: {selectedItem.tenant_pan_number}
                </Text>
                <Text style={styles.modalText}>
                  Contact: {selectedItem.tenant_contact}
                </Text>
                <Text style={styles.modalText}>
                  Aadhar: {selectedItem.tenant_aadhar_number}
                </Text>
                <Text style={styles.modalText}>
                  State: {selectedItem.tenant_state}
                </Text>
                <Text style={styles.modalText}>
                  City: {selectedItem.tenant_city}
                </Text>
              </>
            )}
            <Button mode="contained" onPress={() => setModalVisible(false)}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
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
  iconContainer1: {
    flexDirection: "row", // Ensures icons stay side by side
    alignItems: "center",
  },
  iconButton: {
    marginHorizontal: -4, // Negative margin to remove all space
    padding: 0, // Ensures no extra padding
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
