import axios from "axios";
import React, { useEffect, useState } from "react";
import { Linking, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, Modal, TextInput } from "react-native";
import { DataTable, Button, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
const OfficeBearerScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [officeBearers, setOfficeBearers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://society.zacoinfotech.com/api/office_bearer/", {
        headers: {
          Authorization: `Token d28a0f245d51623cd20e56413cd7691e71f1b043`,
        },
      })
      .then((response) => setOfficeBearers(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = officeBearers.filter(
    (item) =>
      (typeof item.name === "string" &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (typeof item.designation === "string" &&
        item.designation.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    // <View style={styles.container}>
    //   {/* Search Input */}
    //   <TextInput
    //     style={styles.searchInput}
    //     placeholder="Search by Name, Designation"
    //     value={searchQuery}
    //     onChangeText={setSearchQuery}
    //   />

    //   {/* DataTable */}
    //   <DataTable>
    //     <DataTable.Header style={styles.header}>
    //       <DataTable.Title style={styles.actionColumn}>Actions</DataTable.Title>
    //       <DataTable.Title>Name</DataTable.Title>
    //       <DataTable.Title>Designation</DataTable.Title>
    //       <DataTable.Title>From Date</DataTable.Title>
    //       <DataTable.Title>To Date</DataTable.Title>
    //     </DataTable.Header>

    //     {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
    //       <DataTable.Row key={item.id}>
    //         <DataTable.Cell style={styles.actionColumn}>
    //           <IconButton icon="eye" size={20} onPress={() => handleViewClick(item)} style={styles.iconButton} />
    //         </DataTable.Cell>
    //         <DataTable.Cell>{item.name}</DataTable.Cell>
    //         <DataTable.Cell>{item.designation}</DataTable.Cell>
    //         <DataTable.Cell>{item.from_date}</DataTable.Cell>
    //         <DataTable.Cell>{item.to_date}</DataTable.Cell>
    //       </DataTable.Row>
    //     ))}

    //     {/* Pagination Controls */}
    //     <DataTable.Pagination
    //       page={page}
    //       numberOfPages={Math.ceil(filteredData.length / rowsPerPage)}
    //       onPageChange={(newPage) => setPage(newPage)}
    //       label={`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, filteredData.length)} of ${filteredData.length}`}
    //     />
    //   </DataTable>

    //   {/* View Modal */}
    //   <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
    //     <View style={styles.modalOverlay}>
    //       <View style={styles.modalContent}>
    //         <ScrollView>
    //           {selectedItem && (
    //             <>
    //               <Text style={styles.modalText}>Name: {selectedItem.name}</Text>
    //               <Text style={styles.modalText}>Designation: {selectedItem.designation}</Text>
    //               <Text style={styles.modalText}>From Date: {selectedItem.from_date}</Text>
    //               <Text style={styles.modalText}>To Date: {selectedItem.to_date}</Text>
    //             </>
    //           )}
    //         </ScrollView>
    //         <Button mode="contained" onPress={() => setModalVisible(false)}>Close</Button>
    //       </View>
    //     </View>
    //   </Modal>
    // </View>
    <View style={styles.container}>
      <View style={styles.header1}>
        <Text style={styles.title}>Office Bearer</Text>
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
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
              Flat Name
            </Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
              Member Name
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
                          icon="lead-pencil"
                          size={20}
                          onPress={() => handleEditClick(item)}
                          style={styles.iconButton}
                        /> */}
                </View>
              </DataTable.Cell>

              <DataTable.Cell>{item.flat_name_formatted}</DataTable.Cell>
              <DataTable.Cell>{item.member_name_dispay}</DataTable.Cell>
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
                  <Text style={styles.modalTitle}>Office Bearer Details</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Icon name="times" size={24} color="red" />
                  </TouchableOpacity>
                </View>

                {selectedItem && (
                  <>
                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>From Date:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.from_date || "N/A"}
                      </Text>
                    </View>

                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>To Date:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.to_date || "N/A"}
                      </Text>
                    </View>

                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Flat Name:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.flat_name_formatted || "N/A"}
                      </Text>
                    </View>

                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Designation:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.designation_display || "N/A"}
                      </Text>
                    </View>

                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Member Name:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.member_name_dispay || "N/A"}
                      </Text>
                    </View>

                    {/* <View style={styles.infoContainer}>
      <Text style={styles.label}>Flat ID:</Text>
      <Text style={styles.value}>
        {selectedItem?.flat_name || "N/A"}
      </Text>
    </View> */}

                    {/* <View style={styles.infoContainer}>
      <Text style={styles.label}>Member ID:</Text>
      <Text style={styles.value}>
        {selectedItem?.name || "N/A"}
      </Text>
    </View> */}

                    {/* <View style={styles.infoContainer}>
      <Text style={styles.label}>Is Deleted:</Text>
      <Text style={styles.value}>
        {selectedItem?.is_deleted ? "Yes" : "No"}
      </Text>
    </View> */}

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
    width: 20,
  },
  nameColumn: {
    width: 60,
  },
  titleText: {
    color: "#ffffff", // Text color for titles
    fontWeight: "bold",
  },
});
export default OfficeBearerScreen;
