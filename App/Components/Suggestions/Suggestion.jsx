import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Linking,
  TouchableOpacity,
} from "react-native";

import { DataTable, Button, IconButton, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons"; // Or use any other icon library
import * as DocumentPicker from "expo-document-picker";
import SuggestionCreate from "./SuggestionCreate";
import SuggestionCard from "./SuggestionCard";
import Toast from "react-native-toast-message";

const Suggestion = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestion, setSuggestion] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      visibilityTime: 4000,
      position: "top",
    });
  };
  const pickFile = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});

      if (!result?.assets?.length) {
        console.log("No file selected");
        return;
      }

      setFile(result.assets[0]); // Store only necessary data
    } catch (error) {
      console.error("Error picking file:", error);
      showToast(
        "error",
        "⚠️ File Selection Failed",
        "Something went wrong while picking the file!"
      );
    }
  };
  const fetchSuggestions = () => {
    axios
      .get("https://society.zacoinfotech.com/api/society_suggestions/", {
        headers: {
          Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
        },
      })
      .then((response) => {
        setSuggestion(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchSuggestions(); // Call API when parent mounts
  }, []);

  const filteredData = suggestion.filter(
    (item) =>
      (item.suggestion?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      item.documents.some((doc) =>
        (doc.suggestion_doc_filename?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        )
      )
  );

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setText(item?.suggestion || ""); // Ensure text is not undefined

    // Ensure documents exist and have at least one entry
    if (item?.documents?.length > 0) {
      setFileName(item.documents[0].suggestion_doc_filename);
    } else {
      setFile(null);
    }

    setEditModalVisible(true);
  };

  const handleDownload = (fileUrl) => {
    Linking.openURL(fileUrl);
  };
  // **Submit Edited Suggestion**
  const handleSubmit = async () => {
    if (!selectedItem) return;

    const formData = new FormData();
    formData.append("suggestion", text);
    formData.append("user_id", selectedItem.user_id);

    if (file && file.uri) {
      formData.append("document", {
        uri: file.uri,
        type: "application/octet-stream",
        name: file.name,
      });
    }

    try {
      const response = await fetch(
        `https://society.zacoinfotech.com/api/society_suggestions/${selectedItem.id}/`,
        {
          method: "PUT", // or "PATCH"
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
          },
          body: formData,
        }
      );

      if (response.status === 201 || response.status === 200) {
        showToast(
          "success",
          "🎉 Success!",
          "Suggestion submitted successfully."
        );
        setEditModalVisible(false);
        setText("");
        setFile(null);
        fetchSuggestions();
      }
    } catch (error) {
      console.error(
        "Error submitting suggestion:",
        error.response?.data || error.message
      );
      showToast(
        "error",
        "⚠️ Submission Failed",
        error.response?.data?.message || "Something went wrong!"
      );
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header1}>
          <Text style={styles.title}>Suggestion</Text>
          <View style={[styles.iconContainer, { backgroundColor: "#4169E1" }]}>
            <SuggestionCreate fetchSuggestions={fetchSuggestions} />
          </View>
        </View>

        {/* Search Input */}
        {/* <TextInput
          style={styles.searchInput}
          placeholder="Search by Name, Contact, State, City"
          value={searchQuery}
          onChangeText={setSearchQuery}
        /> */}

        {/* DataTable */}
        <DataTable>
          {/* Table Header */}
          <DataTable.Header style={styles.header}>
            <DataTable.Title style={styles.actionColumn}>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                Actions
              </Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                Suggestion
              </Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                Document Name
              </Text>
            </DataTable.Title>
          </DataTable.Header>

          {/* Table Rows */}
          {filteredData
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell style={styles.actionColumn}>
                  {/* <SuggestionCard item={item} /> */}
                  <View style={styles.iconContainer1}>
                    <IconButton
                      icon="eye"
                      size={20}
                      onPress={() => handleViewClick(item)}
                      style={styles.iconButton}
                    />
                    <IconButton
                      icon="lead-pencil"
                      size={20}
                      onPress={() => handleEditClick(item)}
                      style={styles.iconButton}
                    />
                  </View>
                </DataTable.Cell>
                <DataTable.Cell>{item.suggestion}</DataTable.Cell>
                <DataTable.Cell
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  {item.documents.map((doc) => (
                    <TouchableOpacity
                      key={doc.id}
                      style={{ flexDirection: "row", justifyContent: "center" }}
                      onPress={() => handleDownload(doc.document)}
                    >
                      <FontAwesome
                        name="download"
                        size={18}
                        color="#4169E1"
                        style={{ marginRight: 5 }}
                      />
                    </TouchableOpacity>
                  ))}
                </DataTable.Cell>
              </DataTable.Row>
            ))}

          {/* Pagination Controls */}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(filteredData.length / rowsPerPage)}
            onPageChange={(newPage) => setPage(newPage)}
            label={`${page * rowsPerPage + 1}-${Math.min(
              (page + 1) * rowsPerPage,
              filteredData.length
            )} of ${filteredData.length}`}
          />
        </DataTable>

        {/* Modal for Suggestion Details */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          {/* Dark Overlay */}
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Suggestion Details</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="times" size={24} color="#4169E1" />
                </TouchableOpacity>
              </View>
              {selectedItem && (
                <>
                  <Text style={styles.modalTitle}>Tenant Details</Text>

                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{selectedItem.suggestion}</Text>
                  </View>

                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>PAN:</Text>

                    <TouchableOpacity
                      style={{ flexDirection: "row", justifyContent: "center" }}
                      onPress={() =>
                        handleDownload(selectedItem?.documents[0]?.document)
                      }
                    >
                      <FontAwesome
                        name="file"
                        size={18}
                        color="#4169E1"
                        style={{ marginRight: 5 }}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Close Button */}
                  {/* 
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                   */}

                  <TouchableOpacity
                    style={styles.closeButtonView}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>

        {/* ////////Edit Modal/// */}
        <Modal
          visible={editModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setEditModalVisible(false)}
        >
          {/* <View style={styles.modalContainer}>
            <View style={styles.modalContentedit}>
              <Text style={styles.modalTitle}>Edit Suggestion</Text>

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
              <Text>Selcted File:- {fileName}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.closeButtonedit}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View> */}

          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Suggestion</Text>
                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                  <Icon name="times" size={24} color="#4169E1" />
                </TouchableOpacity>
              </View>

              <View style={styles.container2}>
                <View style={styles.labelContainer2}>
                  <Text style={styles.label2}>Enter Your Suggestion:</Text>
                </View>
                <TextInput
                  placeholder="Enter Your Suggestion"
                  placeholderTextColor="#808080"
                  value={text}
                  onChangeText={setText}
                  mode="outlined"
                  style={styles.input2}
                  theme={{
                    colors: {
                      primary: "#4169E1",
                      outline: "#808080",
                    },
                  }}
                />
                <View style={{ marginTop: 10 }}>
                  <View style={styles.labelContainer2}>
                    <Text style={styles.label2}>Select File:</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.fileButton}
                    onPress={pickFile}
                  >
                    <Text style={styles.fileButtonText}>
                      {file ? `Selected: ${file.name}` : "Pick a File"}
                    </Text>
                  </TouchableOpacity>
                  <Text>Selcted File:- {fileName}</Text>
                </View>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Text style={styles.buttonText}>Submit</Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            zIndex: 900,
          }}
        >
          <Toast />
        </View>
      </View>
    </>
  );
};

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
    marginBottom: 5,
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
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    width: 350,
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    // width: "100%",
    // position: "relative",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
  },
  header: {
    backgroundColor: "#4169E1",
    color: "#ffffff",
  },
  header1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  iconContainer1: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginHorizontal: -4,
    padding: 0,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  actionColumn: {
    width: 60,
  },
  titleText: {
    color: "#ffffff", // Text color for titles
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // Shadow for Android
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  closeButtonView: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  ////////////////////edit//////////

  ////////////////////////////////////////////////////////////////
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
    marginBottom: 5,
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


  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
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
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#4169E1",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
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

export default Suggestion;
