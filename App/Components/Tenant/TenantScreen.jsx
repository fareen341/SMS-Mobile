import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DataTable, Button, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
const TenantScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 10;

  useEffect(() => {
    axios
      .get("https://society.zacoinfotech.com/api/tenant_creation/", {
        headers: {
          Authorization: `Token d28a0f245d51623cd20e56413cd7691e71f1b043`,
        },
      })
      .then((response) => setTenants(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter tenants based on search query
  const filteredData = tenants.filter(
    (item) =>
      item.tenant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tenant_contact.includes(searchQuery) ||
      item.tenant_state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tenant_city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle eye icon click (View Details)
  const handleViewClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Handle edit icon click (Open blank modal)
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditModalVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header1}>
          <Text style={styles.title}>Tenant</Text>
        </View>

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
                Contact
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
                    <IconButton
                      icon="lead-pencil"
                      size={20}
                      // onPress={() => handleEditClick(item)}
                      style={styles.iconButton}
                    />
                  </View>
                </DataTable.Cell>

                <DataTable.Cell>{item.tenant_name}</DataTable.Cell>
                <DataTable.Cell>{item.tenant_contact}</DataTable.Cell>
                {/* <DataTable.Cell>{item.tenant_state}</DataTable.Cell> */}
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
            <View style={styles.modalContainer}>
              <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Tenant Details</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Icon name="times" size={24} color="red" />
                    </TouchableOpacity>
                  </View>

                  {selectedItem && (
                    <>
                      <View style={styles.infoContainer}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>
                          {selectedItem?.tenant_name || "N/A"}
                        </Text>
                      </View>

                      <View style={styles.infoContainer}>
                        <Text style={styles.label}>PAN No:</Text>
                        <Text style={styles.value}>
                          {selectedItem?.tenant_pan_number || "N/A"}
                        </Text>
                      </View>

                      <View style={styles.infoContainer}>
                        <Text style={styles.label}>Contact No:</Text>
                        <Text style={styles.value}>
                          {selectedItem?.tenant_contact || "N/A"}
                        </Text>
                      </View>

                      <View style={styles.infoContainer}>
                        <Text style={styles.label}>Aadhar No:</Text>
                        <Text style={styles.value}>
                          {selectedItem?.tenant_aadhar_number || "N/A"}
                        </Text>
                      </View>

                      <View style={styles.infoContainer}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>
                          {selectedItem?.tenant_email || "N/A"}
                        </Text>
                      </View>

                      <View style={styles.infoContainer}>
                        <Text style={styles.label}>State:</Text>
                        <Text style={styles.value}>
                          {selectedItem?.tenant_state || "N/A"}
                        </Text>
                      </View>

                      <View style={styles.infoContainer}>
                        <Text style={styles.label}>City:</Text>
                        <Text style={styles.value}>
                          {selectedItem?.tenant_city || "N/A"}
                        </Text>
                      </View>

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
              </ScrollView>
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
                <Text style={styles.modalTitle}>Visitor</Text>
                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                  <Icon name="times" size={24} color="#cc1919" />
                </TouchableOpacity>
              </View>
              {/* <Text style={styles.modalTitle}>Update Visitor</Text> */}

              <View style={styles.container2}>
                <View>
                  <View style={styles.labelContainer2}>
                    <Text style={styles.label2}>Enter Your Full Name:</Text>
                  </View>
                  <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="#808080"
                    value={tenants.full_name}
                    onChangeText={(value) => handleChange("full_name", value)}
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
                    value={tenants.contact_no}
                    onChangeText={(value) => handleChange("contact_no", value)}
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
                    value={tenants.email}
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
                    value={tenants.visit_purpose}
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
                    value={tenants.additional_note}
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

              {/* <TouchableOpacity style={styles.fileButton} >
                <Text style={styles.fileButtonText}>
                  {file ? `Selected: ${file.name}` : "Pick a Photo"}
                </Text>
              </TouchableOpacity> */}

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.closeButtonedit}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  // onPress={handleSubmit}
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%", // Adjust height based on mobile screen
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // Shadow for Android
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalContent: {
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
    width: "100%",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

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
  nameColumn: {
    width: 60,
  },
  titleText: {
    color: "#ffffff", // Text color for titles
    fontWeight: "bold",
  },
});

export default TenantScreen;
