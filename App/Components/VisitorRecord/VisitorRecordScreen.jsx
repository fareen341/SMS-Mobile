// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Modal, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { DataTable, Button, IconButton } from 'react-native-paper';

// const VisitorRecordScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [addModalVisible, setAddModalVisible] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [visitorList, setVisitorList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(0);
//   const rowsPerPage = 5;

//   useEffect(() => {
//     fetchVisitorData();
//   }, []);

//   const fetchVisitorData = async () => {
//     try {
//       const response = await axios.get('https://society.zacoinfotech.com/api/visitor_records/', {
//         headers: { 'Authorization': `Token d28a0f245d51623cd20e56413cd7691e71f1b043` },
//       });
//       setVisitorList(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // Reset pagination when search query changes
//   useEffect(() => {
//     setPage(0);
//   }, [searchQuery]);

//   // Filter data based on search input
//   const filteredData = visitorList.filter((item) =>
//     item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.contact_no.includes(searchQuery) ||
//     item.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Open view details modal
//   const handleViewClick = (item) => {
//     setSelectedItem(item);
//     setModalVisible(true);
//   };

//   // Open edit modal with selected item data
//   const handleEditClick = (item) => {
//     setSelectedItem(item);
//     setEditModalVisible(true);
//   };

//   // Open add visitor modal
//   const handleAddVisitor = () => {
//     setAddModalVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Visitors Text & Add Visitor Button */}
//       <View style={styles.headerRow}>
//         <Text style={styles.visitorText}>Visitors</Text>
//         <Button mode="contained" onPress={handleAddVisitor}>Add Visitor</Button>
//       </View>

//       {/* Search Input */}
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search by Name, Contact, Email"
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />

//       {/* DataTable */}
//       <DataTable>
//         {/* Table Header */}
//         <DataTable.Header style={styles.header}>
//           <DataTable.Title style={styles.actionColumn}>Actions</DataTable.Title>
//           <DataTable.Title>Visitor ID</DataTable.Title>
//           <DataTable.Title>Name</DataTable.Title>
//           <DataTable.Title>Contact</DataTable.Title>
//           <DataTable.Title>Status</DataTable.Title>
//         </DataTable.Header>

//         {/* Table Rows */}
//         {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
//           <DataTable.Row key={item.visitor_id}>
//             <DataTable.Cell style={styles.actionColumn}>
//               <View style={styles.iconContainer}>
//                 <IconButton icon="eye" size={20} onPress={() => handleViewClick(item)} />
//                 <IconButton icon="pencil" size={20} onPress={() => handleEditClick(item)} />
//               </View>
//             </DataTable.Cell>
//             <DataTable.Cell>{item.visitor_id}</DataTable.Cell>
//             <DataTable.Cell>{item.full_name}</DataTable.Cell>
//             <DataTable.Cell>{item.contact_no}</DataTable.Cell>
//             <DataTable.Cell>{item.status}</DataTable.Cell>
//           </DataTable.Row>
//         ))}

//         {/* Pagination Controls */}
//         <DataTable.Pagination
//           page={page}
//           numberOfPages={Math.ceil(filteredData.length / rowsPerPage)}
//           onPageChange={(newPage) => setPage(newPage)}
//           label={`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, filteredData.length)} of ${filteredData.length}`}
//         />
//       </DataTable>

//       {/* View Details Modal */}
//       <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {selectedItem && (
//               <>
//                 <Text style={styles.modalTitle}>Visitor Details</Text>
//                 <Text style={styles.modalText}>Visitor ID: {selectedItem.visitor_id}</Text>
//                 <Text style={styles.modalText}>Full Name: {selectedItem.full_name}</Text>
//                 <Text style={styles.modalText}>Contact: {selectedItem.contact_no}</Text>
//                 <Text style={styles.modalText}>Email: {selectedItem.email}</Text>
//                 <Text style={styles.modalText}>Visit Date: {selectedItem.visitor_date}</Text>
//                 <Text style={styles.modalText}>Purpose: {selectedItem.visit_purpose}</Text>
//                 <Text style={styles.modalText}>Additional Note: {selectedItem.additional_note}</Text>
//                 <Text style={styles.modalText}>Status: {selectedItem.status}</Text>
//                 {selectedItem.visitor_photo && (
//                   <Image source={{ uri: selectedItem.visitor_photo }} style={styles.visitorImage} />
//                 )}
//               </>
//             )}
//             <Button mode="contained" onPress={() => setModalVisible(false)}>Close</Button>
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Modal */}
//       <Modal visible={editModalVisible} transparent animationType="slide" onRequestClose={() => setEditModalVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Edit Visitor</Text>
//             {selectedItem && (
//               <>
//                 <TextInput style={styles.input} placeholder="Full Name" value={selectedItem.full_name} />
//                 <TextInput style={styles.input} placeholder="Contact" value={selectedItem.contact_no} keyboardType="numeric" />
//                 <TextInput style={styles.input} placeholder="Email" value={selectedItem.email} />
//                 <TextInput style={styles.input} placeholder="Visit Date" value={selectedItem.visitor_date} />
//                 <TextInput style={styles.input} placeholder="Purpose" value={selectedItem.visit_purpose} />
//                 <TextInput style={styles.input} placeholder="Additional Note" value={selectedItem.additional_note} multiline />
//                 <TextInput style={styles.input} placeholder="Status" value={selectedItem.status} />
//               </>
//             )}
//             <Button mode="contained">Save</Button>
//             <Button mode="outlined" onPress={() => setEditModalVisible(false)}>Close</Button>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
//   visitorText: { fontSize: 18, fontWeight: 'bold' },
//   searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
//   iconContainer: { flexDirection: 'row', alignItems: 'center', gap: 2 },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
//   modalContent: { width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10 },
//   modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
//   modalText: { fontSize: 16, marginVertical: 4, textAlign: 'center' },
//   visitorImage: { width: 100, height: 100, marginVertical: 10, alignSelf: 'center' },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
// });

// export default VisitorRecordScreen;

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
} from "react-native";

import { DataTable, Button, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons"; // Or use any other icon library
import * as DocumentPicker from "expo-document-picker";
// import SuggestionCreate from "./SuggestionCreate";
import Toast from "react-native-toast-message";
import VisitorCreation from "./VisitorCreation";

const VisitorRecordScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestion, setSuggestion] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  // console.log("file",              text,file  )
  const showToast = (type, text1, text2) => {
    Toast.show({
      type, // 'success', 'error', or 'info'
      text1, // Main heading
      text2, // Subtext
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
      .get("https://society.zacoinfotech.com/api/visitor_records/", {
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
          <Text style={styles.title}>WORKROOM</Text>
          <View style={[styles.iconContainer, { backgroundColor: "#4169E1" }]}>
            {/* <SuggestionCreate fetchSuggestions={fetchSuggestions} /> */}
            <VisitorCreation />
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
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Name</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                Email
              </Text>
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
                      icon="pencil"
                      size={20}
                      onPress={() => handleEditClick(item)}
                      style={styles.iconButton}
                    />
                  </View>
                </DataTable.Cell>

                <DataTable.Cell>{item.full_name}</DataTable.Cell>
                <DataTable.Cell>{item.email}</DataTable.Cell>
                <DataTable.Cell>{item.contact_no}</DataTable.Cell>
              </DataTable.Row>
            ))}
          {/* {filteredData.map((item) => (
        <DataTable.Row key={item.id}>
          <DataTable.Cell>
            <View style={{ flexDirection: "row" }}>
              <IconButton icon="eye" size={20} onPress={() => handleViewClick(item)} />
              <IconButton icon="pencil" size={20} onPress={() => handleEditClick(item)} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell>{item.visitor_id}</DataTable.Cell>
          <DataTable.Cell>{item.full_name}</DataTable.Cell>
          <DataTable.Cell>{item.contact_no}</DataTable.Cell>
          <DataTable.Cell>{item.email}</DataTable.Cell>
          <DataTable.Cell>{item.visit_purpose}</DataTable.Cell>
          <DataTable.Cell>{item.status}</DataTable.Cell>
        </DataTable.Row>
      ))} */}
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
        <TextInput
      label="Email"
      value={text}
      onChangeText={text => setText(text)}
    />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 15,
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
    backgroundColor: "#007BFF",
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

export default VisitorRecordScreen;
