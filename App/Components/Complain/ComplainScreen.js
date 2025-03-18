import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { DataTable, Button, IconButton, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons"; // Or use any other icon library
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-toast-message";
import ComplainCreation from "./ComplainCreation";
// import VisitorCreation from "./VisitorCreation";

const ComplainScreen = () => {
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
  // console.log("file",             visitors )

  const fetchVisitors = () => {
    axios
      .get("https://society.zacoinfotech.com/api/complain/", {
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
      item.wing_flat_name,
      item.owner_name,
      item.owner_email,
      item.owner_contact,
      item.title,
      item.complain_description,
      item.status,
      item.name,
    ].some((field) =>
      (field?.toString().toLowerCase() || "").includes(
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
// console.log("item",item)
    // Populate visitorData with existing values
    setVisitorData({
      title: item.title || "",
      complain_description: item.complain_description || "",
     
    });


    setEditModalVisible(true);
  };

  const handleDownload = (fileUrl) => {
    Linking.openURL(fileUrl);
  };

  const [visitorData, setVisitorData] = useState({
    title: "",
    complain_description: "",
  });
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
    if (!visitorData.title || !visitorData.complain_description) {
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
      const response = await axios.patch(
        `https://society.zacoinfotech.com/api/complain/${selectedItem.id}/`,
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
        showToast("success", "🎉 Success!", "Complain updated successfully.");
        setVisitorData({
          title: "",
          complain_description: "",
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
        {/* <View style={styles.header1}>
          <Text style={styles.title}>Complain</Text>
          <View style={[styles.iconContainer, { backgroundColor: "#4169E1" }]}>
            <VisitorCreation fetchVisitors={fetchVisitors} />
          </View>
        </View> */}
        <ComplainCreation fetchVisitors={fetchVisitors} />

        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name, Contact, State, City"
          value={searchQuery}
          placeholderTextColor="#808080"
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
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Name</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                Title
              </Text>
            </DataTable.Title>
            {/* <DataTable.Title>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                Contact
              </Text>
            </DataTable.Title> */}
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
                    <IconButton
                      icon="lead-pencil"
                      size={20}
                      onPress={() => handleEditClick(item)}
                      style={styles.iconButton}
                    />
                  </View>
                </DataTable.Cell>

                <DataTable.Cell>{item.owner_name}</DataTable.Cell>
                <DataTable.Cell>{item.title}</DataTable.Cell>
                {/* <DataTable.Cell>{item.complain_description}</DataTable.Cell> */}
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
                <Text style={styles.modalTitle}>Complain</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="times" size={24} color="red" />
                </TouchableOpacity>
              </View>
              {selectedItem && (
                <>
                  <Text style={styles.modalTitle}>Complain Details</Text>

                  <ScrollView style={{ maxHeight: 400 }}>
                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Wing & Flat:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.wing_flat_name || "N/A"}
                      </Text>
                    </View>

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
                      <Text style={styles.label}>Title:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.title || "N/A"}
                      </Text>
                    </View>

                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Complain Description:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.complain_description || "N/A"}
                      </Text>
                    </View>

                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Status:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.status || "N/A"}
                      </Text>
                    </View>
                  </ScrollView>

                  {/* Close Button */}
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
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Complain</Text>
                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                  <Icon name="times" size={24} color="#cc1919" />
                </TouchableOpacity>
              </View>
              {/* <Text style={styles.modalTitle}>Update Visitor</Text> */}

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
                    onChangeText={(value) => handleChange("title", value)}
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

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
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
    backgroundColor: "rgba(243, 238, 238, 0.47)",
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
    width: 45,
    height: 45,
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

export default ComplainScreen;
