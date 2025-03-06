import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { DataTable, Button, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons"; // Or use any other icon library
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-toast-message";
import CreateMemberInfo from "./CreateMemberInfo";
import RenderHtml from "react-native-render-html";

const ChangeMemberScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  // console.log("file",              text,file  )

  const fetchVisitors = () => {
    axios
      .get("https://society.zacoinfotech.com/api/change_member_request/", {
        headers: {
          Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
        },
      })
      .then((response) => {
        setVisitors(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchVisitors(); // Call API when parent mounts
  }, []);

  const filteredData = visitors.filter((item) =>
    [
      item.owner_name,
      item.owner_contact,
      item.owner_email,
      item.title,
      item.complain_description,
      item.wing_flat_name,
    ].some((field) =>
      (field?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    )
  );

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);

    // Populate visitorData with existing values
    setVisitorData({
      full_name: item.full_name || "",
      contact_no: item.contact_no || "",
      email: item.email || "",
      visit_purpose: item.visit_purpose || "",
      additional_note: item.additional_note || "",
    });

    // Ensure documents exist and set file if available
    if (item?.documents?.length > 0) {
      setFile({
        uri: item.documents[0].visitors_doc_uri,
        name: item.documents[0].visitors_doc_filename,
        type: "image/jpeg", // Adjust type as needed
      });
    } else {
      setFile(null);
    }

    setEditModalVisible(true);
  };

  const handleDownload = (fileUrl) => {
    Linking.openURL(fileUrl);
  };

  const [visitorData, setVisitorData] = useState({
    full_name: "",
    contact_no: "",
    email: "",
    visit_purpose: "",
    additional_note: "",
  });
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
      const response = await axios.patch(
        `https://society.zacoinfotech.com/api/visitor_records/${selectedItem.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setEditModalVisible(false); // Modal band karna
        showToast("success", "🎉 Success!", "Visitor updated successfully.");
        setVisitorData({
          full_name: "",
          contact_no: "",
          email: "",
          visit_purpose: "",
          additional_note: "",
        });
        setFile(null);
        fetchVisitors(); // Data update karna
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
        <View style={styles.header1}>
          <Text style={styles.title}>Member Info</Text>
          <View style={[styles.iconContainer, { backgroundColor: "#4169E1" }]}>
            <CreateMemberInfo fetchVisitors={fetchVisitors} />
          </View>
        </View>

        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name, Contact, State, City"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

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
                Title
              </Text>
            </DataTable.Title>

            <DataTable.Title>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                Wing Flat
              </Text>
            </DataTable.Title>
          </DataTable.Header>

          {/* Table Rows */}
          {filteredData
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell style={styles.actionColumn}>
                  <View style={styles.iconContainer1}>
                    <IconButton
                      icon="eye"
                      size={20}
                      onPress={() => handleViewClick(item)}
                      style={styles.iconButton}
                    />
                    {/* <IconButton
                      icon="pencil"
                      size={20}
                      onPress={() => handleEditClick(item)}
                      style={styles.iconButton}
                    /> */}
                  </View>
                </DataTable.Cell>

                <DataTable.Cell>{item.title}</DataTable.Cell>
                <DataTable.Cell>{item.wing_flat_name}</DataTable.Cell>
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

        {/* Modal for Visitor Details */}
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
                        <Text style={styles.modalTitle}>Member Info</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                          <Icon name="times" size={24} color="#4169E1" />
                        </TouchableOpacity>
                      </View>
              {selectedItem && (
                <>
                  <Text style={styles.modalTitle}>Visitor Details</Text>

                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Owner Name:</Text>
                    <Text style={styles.value}>
                      {selectedItem?.owner_name || "N/A"}
                    </Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Owner Email:</Text>
                    <Text style={styles.value}>
                      {selectedItem?.owner_email || "N/A"}
                    </Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Owner Contact:</Text>
                    <Text style={styles.value}>
                      {selectedItem?.owner_contact || "N/A"}
                    </Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Wing Flat:</Text>
                    <Text style={styles.value}>
                      {selectedItem?.wing_flat_name || "N/A"}
                    </Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.value}>
                      {selectedItem?.status || "N/A"}
                    </Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Title:</Text>
                    <Text style={styles.value}>
                      {selectedItem?.title || "N/A"}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.label}>Description:</Text>
                  </View>

                  <View style={styles.infoContainer}>
                    {selectedItem ? (
                      selectedItem?.complain_description !== "N/A" &&
                      selectedItem?.complain_description ? (
                        <View>
                          <RenderHtml
                            contentWidth={300}
                            source={{
                              html: selectedItem?.complain_description,
                            }}
                            tagsStyles={{
                              p: { margin: 0, padding: 0, fontSize: 14 },
                            }}
                            defaultTextProps={{ selectable: true }}
                          />
                        </View>
                      ) : (
                        <Text style={styles.value}>N/A</Text>
                      )
                    ) : null}
                  </View>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
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
          <View style={styles.modalContainer}>
            <View style={styles.modalContentedit}>
              <Text style={styles.modalTitle}>Update Visitor</Text>

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
                  style={styles.closeButtonedit}
                  onPress={() => setEditModalVisible(false)}
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
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
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark transparent background
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
  // modalTitle: {
  //   fontSize: 22,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   color: "#333",
  //   marginBottom: 15,
  // },
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
  closeButton: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  ////////////////////edit//////////
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalContentedit: {
    backgroundColor: "white",
    padding: 20,
    width: 350,
    borderRadius: 10,
    alignItems: "center",
  },
  // modalTitle: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   marginBottom: 15,
  // },
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
  closeButtonedit: {
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

export default ChangeMemberScreen;
