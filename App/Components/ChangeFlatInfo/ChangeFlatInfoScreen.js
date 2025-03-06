// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Modal, TextInput, ScrollView, TouchableOpacity } from 'react-native';
// import { DataTable, Button, IconButton } from 'react-native-paper';

// const ChangeFlatInfoScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [messageModalVisible, setMessageModalVisible] = useState(false);
//   const [addComplainModalVisible, setAddComplainModalVisible] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [complains, setComplains] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(0);
//   const [messageText, setMessageText] = useState('');
//   const [newComplainTitle, setNewComplainTitle] = useState('');
//   const [newComplainMessage, setNewComplainMessage] = useState('');
//   const rowsPerPage = 5;

//   useEffect(() => {
//     axios.get('https://society.zacoinfotech.com/api/complain', {
//       headers: {
//         'Authorization': `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
//       }
//     })
//       .then((response) => setComplains(response.data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   const filteredData = complains.filter((item) =>
//     (typeof item.name === 'string' && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (typeof item.title === 'string' && item.title.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const handleViewClick = (item) => {
//     setSelectedItem(item);
//     setModalVisible(true);
//   };

//   const handleEditClick = (item) => {
//     setSelectedItem(item);
//     setEditModalVisible(true);
//   };

//   const handleAddMessageClick = (item) => {
//     setSelectedItem(item);
//     setMessageModalVisible(true);
//   };

//   const handleAddComplain = () => {
//     setAddComplainModalVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Suggestions Text & Add Complain Button */}
//       <View style={styles.headerRow}>
//         <Text style={styles.suggestionsText}>Change Flat Info</Text>
//         <Button mode="contained" onPress={handleAddComplain}>Request</Button>
//       </View>

//       {/* Search Input */}
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search by Name, Title"
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />

//       {/* Data Table */}
//       <DataTable>
//         <DataTable.Header style={styles.header}>
//           <DataTable.Title style={styles.actionColumn}>Actions</DataTable.Title>
//           <DataTable.Title>Name</DataTable.Title>
//           <DataTable.Title>Title</DataTable.Title>
//           <DataTable.Title>Status</DataTable.Title>
//         </DataTable.Header>

//         {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
//           <DataTable.Row key={item.id}>
//             <DataTable.Cell style={styles.actionColumn}>
//               <View style={styles.iconContainer}>
//                 <IconButton icon="eye" size={20} onPress={() => handleViewClick(item)} style={styles.iconButton} />
//                 <IconButton icon="pencil" size={20} onPress={() => handleEditClick(item)} style={styles.iconButton} />
//                 <IconButton icon="plus" size={20} onPress={() => handleAddMessageClick(item)} style={styles.iconButton} />
//               </View>
//             </DataTable.Cell>
//             <DataTable.Cell>{item.name}</DataTable.Cell>
//             <DataTable.Cell>{item.title}</DataTable.Cell>
//             <DataTable.Cell>{item.status}</DataTable.Cell>
//           </DataTable.Row>
//         ))}

//         <DataTable.Pagination
//           page={page}
//           numberOfPages={Math.ceil(filteredData.length / rowsPerPage)}
//           onPageChange={(newPage) => setPage(newPage)}
//           label={`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, filteredData.length)} of ${filteredData.length}`}
//         />
//       </DataTable>

//       {/* View Modal */}
//       <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {selectedItem && (
//               <>
//                 <Text>Name: {selectedItem.name}</Text>
//                 <Text>Title: {selectedItem.title}</Text>
//                 <Text>Description: {selectedItem.complain_description}</Text>
//                 <Text>Status: {selectedItem.status}</Text>
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
//             <TextInput style={styles.textArea} placeholder="Name" value={selectedItem?.name} />
//             <TextInput style={styles.textArea} placeholder="Title" value={selectedItem?.title} />
//             <TextInput style={styles.textArea} placeholder="Description" value={selectedItem?.complain_description} multiline />
//             <TextInput style={styles.textArea} placeholder="Status" value={selectedItem?.status} />
//             <Button mode="contained" compact>Save</Button>
//             <Button mode="outlined" compact onPress={() => setEditModalVisible(false)}>Close</Button>
//           </View>
//         </View>
//       </Modal>

//       {/* Add Message Modal */}
//       <Modal visible={messageModalVisible} transparent animationType="slide" onRequestClose={() => setMessageModalVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <TextInput style={styles.textArea} placeholder="Add message" value={messageText} onChangeText={setMessageText} />
//             <Button mode="contained" compact>Send</Button>
//             <Button mode="outlined" compact onPress={() => setMessageModalVisible(false)}>Close</Button>
//           </View>
//         </View>
//       </Modal>

//       {/* Add Complain Modal */}
//       <Modal visible={addComplainModalVisible} transparent animationType="slide" onRequestClose={() => setAddComplainModalVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <TextInput style={styles.textArea} placeholder="Title" value={newComplainTitle} onChangeText={setNewComplainTitle} />
//             <TextInput style={styles.textArea} placeholder="Complain Details" multiline value={newComplainMessage} onChangeText={setNewComplainMessage} />
//             <Button mode="contained" compact>Submit</Button>
//             <Button mode="outlined" compact onPress={() => setAddComplainModalVisible(false)}>Close</Button>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
//   suggestionsText: { fontSize: 18, fontWeight: 'bold' },
//   searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
//   iconContainer: { flexDirection: 'row', alignItems: 'center', gap: 2 },
//   iconButton: { padding: 0, marginHorizontal: -6 },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
//   modalContent: { width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10 },
//   textArea: { borderWidth: 1, borderColor: '#ccc', padding: 8, minHeight: 40, marginBottom: 10 },
// });

// export default ChangeFlatInfoScreen;

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { WebView } from "react-native-webview";
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
// import CreateMemberInfo from "./CreateMemberInfo";
import RenderHtml from "react-native-render-html";
import FlatInfoCreate from "./FlatInfoCreate";

const ChangeFlatInfoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [content, setContent] = useState("");
  const rowsPerPage = 10;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  // console.log("file",              text,file  )

  const fetchVisitors = () => {
    axios
      .get("https://society.zacoinfotech.com/api/flat_repair_request/", {
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
    fetchVisitors();
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

    // Update flatInfoData state with the selected item's values
    setFlatInfoData({
      title: item.title || "",
      complain_description: item.complain_description || "",
    });

    setEditModalVisible(true);
  };

  const [flatInfoData, setFlatInfoData] = useState({
    title: "",
    complain_description: "",
  });
  // console.log("hhh", flatInfoData);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setFlatInfoData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      visibilityTime: 4000,
      position: "top",
    });
  };

  const handleSubmit = async () => {
    if (!selectedItem) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", flatInfoData.title);
      formData.append(
        "complain_description",
        flatInfoData.complain_description
      );

      const response = await axios.patch(
        `https://society.zacoinfotech.com/api/flat_repair_request/${selectedItem.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
          },
        }
      );

      console.log("Response:", response);

      if (response.status === 201 || response.status === 200) {
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Request submitted successfully!",
        });

        fetchVisitors();
        setFlatInfoData({
          title: "",
          complain_description: "",
        });

        setEditModalVisible(false);
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error submitting data.",
      });
    } finally {
      setLoading(false);
    }
  };

  const typingTimeoutRef = useRef(null); // Store timeout reference

  const handleMessage = (event) => {
    const htmlData = event.nativeEvent.data;

    // Clear previous timeout to prevent unnecessary updates
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new timeout to update the state after 500ms (debouncing)
    typingTimeoutRef.current = setTimeout(() => {
      setFlatInfoData((prevState) => ({
        ...prevState,
        complain_description: htmlData, // Update after delay
      }));
    }, 500);
  };

  const htmlContent = `
  <html>
    <head>
      <script src="https://cdn.ckeditor.com/ckeditor5/40.0.0/classic/ckeditor.js"></script>
      <style>
        body { margin: 0; padding: 10px; font-family: Arial, sans-serif; }
        #editor-container {
          width: 100%;  
          max-width: 800px; 
          margin: 0 auto;
        }
        .ck-editor__editable { 
          min-height: 400px; 
          overflow-y: auto;
          width: 100%;
          font-size: 18px; 
        }
      </style>
    </head>
    <body>
      <div id="editor"></div>
      <script>
        ClassicEditor
          .create(document.querySelector("#editor"))
          .then(editor => {
            editor.setData(\`${flatInfoData.complain_description || ""}\`);

            editor.model.document.on("change:data", () => {
              window.ReactNativeWebView.postMessage(editor.getData());
            });
          })
          .catch(error => console.error("CKEditor Load Error:", error));
      </script>
    </body>
  </html>
`;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header1}>
          <Text style={styles.title}>Flat Info</Text>
          <View style={[styles.iconContainer, { backgroundColor: "#4169E1" }]}>
            <FlatInfoCreate fetchVisitors={fetchVisitors} />
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

                    <IconButton
                      icon="lead-pencil"
                      size={20}
                      onPress={() => handleEditClick(item)}
                      style={styles.iconButton}
                    />
                    <IconButton
                      icon="plus-thick"
                      size={20}
                      // onPress={() => handleAddMessageClick(item)}
                      style={styles.iconButton}
                    />
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
                       <Text style={styles.modalTitle}>Flat Info</Text>
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
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Flat Info</Text>
                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                  <Icon name="times" size={24} color="#4169E1" />
                </TouchableOpacity>
              </View>
              {/* Title Input */}
              <View style={styles.container2}>
                <View style={styles.labelContainer2}>
                  <Text style={styles.label2}>Title:</Text>
                </View>
                <TextInput
                  placeholder="Enter Title"
                  placeholderTextColor="#808080"
                  value={flatInfoData.title} // Set the value from state
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

              <View style={styles.container2}>
                <View style={styles.labelContainer2}>
                  <Text style={styles.label2}>
                    Write Your Complain in Detail:
                  </Text>
                </View>
                <View style={{ height: 180, width: "100%" }}>
                  <WebView
                    originWhitelist={["*"]}
                    source={{ html: htmlContent }}
                    onMessage={handleMessage}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    style={{ flex: 1, height: 500 }}
                  />
                </View>
              </View>

              {/* Buttons */}
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
  labelContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label2: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
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
    backgroundColor: "white",
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
    color: "#ffffff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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

export default ChangeFlatInfoScreen;
