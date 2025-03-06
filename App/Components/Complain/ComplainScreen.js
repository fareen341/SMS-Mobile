import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { DataTable, Button, IconButton } from "react-native-paper";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Icon from "react-native-vector-icons/FontAwesome";

const ComplainScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addComplainModalVisible, setAddComplainModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [complains, setComplains] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [messageText, setMessageText] = useState("");
  const [newComplainTitle, setNewComplainTitle] = useState("");
  const [newComplainMessage, setNewComplainMessage] = useState("");
  const rowsPerPage = 10;

  useEffect(() => {
    if (addComplainModalVisible) {
      setNewComplainTitle(""); // Clear title
      setNewComplainMessage(""); // Clear message
    }

    axios
      .get("https://society.zacoinfotech.com/api/complain/", {
        headers: {
          Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
        },
      })
      .then((response) => setComplains(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [addComplainModalVisible]);

  const filteredData = complains.filter(
    (item) =>
      (typeof item.name === "string" &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (typeof item.title === "string" &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditModalVisible(true);
  };

  const handleAddMessageClick = (item) => {
    setSelectedItem(item);
    setMessageModalVisible(true);
  };

  const handleAddComplain = () => {
    setAddComplainModalVisible(true);
  };

  const handleComplainSubmit = () => {
    const complainData = {
      title: newComplainTitle,
      complain_description: newComplainMessage,
    };

    axios
      .post("https://society.zacoinfotech.com/api/complain/", complainData, {
        headers: {
          Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
        },
      })
      .then((response) => {
        const newComplain = response.data;
        showMessage({
          message: "Complain Submitted!",
          type: "success",
        });
        setAddComplainModalVisible(false);
        // setComplains(prevComplains => [
        //   ...prevComplains,
        //   { title: newComplainTitle, complain_description: newComplainMessage }
        // ]);
        setComplains((prevComplains) => [
          ...prevComplains,
          { ...newComplain }, // Spread the response object to dynamically include all properties
        ]);
      })
      .catch((error) => {
        setAddComplainModalVisible(false);
        if (error.response) {
          const errorData = error.response.data;

          // If we have field-specific errors
          if (errorData) {
            let errorMessage = "";
            Object.keys(errorData).forEach((key) => {
              const fieldErrors = errorData[key];
              errorMessage += `${key}: ${fieldErrors.join(", ")}\n`;
            });

            showMessage({
              message: errorMessage || "Something went wrong!",
              type: "danger",
            });
          } else {
            // If no specific field error is available, fallback to a general error message
            showMessage({
              message: error.response.data?.message || "Something went wrong!",
              type: "danger",
            });
          }
        } else if (error.request) {
          // No response from server
          showMessage({
            message: "No response from server. Please check your connection.",
            type: "danger",
          });
        } else {
          // Any other errors
          showMessage({
            message: error.message || "An unknown error occurred.",
            type: "danger",
          });
        }
      });
  };

  const handleComplainEditSubmit = () => {
    const updatedComplainData = {
      title: selectedItem.title,
      complain_description: selectedItem.complain_description,
    };

    axios
      .patch(
        `https://society.zacoinfotech.com/api/complain/${selectedItem.id}/`,
        updatedComplainData,
        {
          headers: {
            Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
          },
        }
      )
      .then((response) => {
        showMessage({
          message: "Complain Updated!",
          type: "success",
        });

        // Update the complains array with the updated data
        setComplains((prevComplains) =>
          prevComplains.map((complain) =>
            complain.id === selectedItem.id
              ? { ...complain, ...response.data }
              : complain
          )
        );

        setEditModalVisible(false);
      })
      .catch((error) => {
        setEditModalVisible(false);
        // If error has a response
        if (error.response) {
          const errorData = error.response.data;

          // If we have field-specific errors
          if (errorData) {
            let errorMessage = "";
            Object.keys(errorData).forEach((key) => {
              const fieldErrors = errorData[key];
              errorMessage += `${key}: ${fieldErrors.join(", ")}\n`;
            });

            showMessage({
              message: errorMessage || "Something went wrong!",
              type: "danger",
            });
          } else {
            // If no specific field error is available, fallback to a general error message
            showMessage({
              message: error.response.data?.message || "Something went wrong!",
              type: "danger",
            });
          }
        } else if (error.request) {
          // No response from server
          showMessage({
            message: "No response from server. Please check your connection.",
            type: "danger",
          });
        } else {
          // Any other errors
          showMessage({
            message: error.message || "An unknown error occurred.",
            type: "danger",
          });
        }
      });
  };

  return (
    <View style={styles.container}>
      {/* Suggestions Text & Add Complain Button */}
      <View style={styles.headerRow}>
        <Text style={styles.suggestionsText}>Complains</Text>
        <Button mode="contained" onPress={handleAddComplain}>
          Add Complain
        </Button>
      </View>

      <View style={styles.header1}>
        <Text style={styles.title1}>Member Info</Text>
        <View style={[styles.iconContainer1, { backgroundColor: "#4169E1" }]}>
          {/* <CreateMemberInfo fetchVisitors={fetchVisitors} /> */}
          <View>
            <TouchableOpacity style={styles.button} onPress={handleAddComplain}>
              <Icon name="plus-circle" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Name, Title"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Data Table */}
      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={styles.actionColumn}>
            <Text style={styles.headerTitle}>Actions</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.headerTitle}>Title</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.headerTitle}>Description</Text>
          </DataTable.Title>
        </DataTable.Header>

        {filteredData
          .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
          .map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>
                <View style={styles.iconContainer}>
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
                    onPress={() => handleAddMessageClick(item)}
                    style={styles.iconButton}
                  />
                </View>
              </DataTable.Cell>
              {/* <DataTable.Cell>{item.name}</DataTable.Cell> */}
              <DataTable.Cell>{item.title}</DataTable.Cell>
              <DataTable.Cell>{item.complain_description}</DataTable.Cell>
            </DataTable.Row>
          ))}

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

      {/* View Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentForView}>
            {/* Header with Title on the left and Close Icon on the right */}
            <View style={styles.modalHeaderForView}>
              <Text style={styles.modalTitle}>Complain</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="times" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            {selectedItem && (
              <>
                <Text style={styles.detailText}>
                  <Text style={[styles.label, { fontWeight: "bold" }]}>
                    Title:
                  </Text>{" "}
                  {selectedItem.title}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={[styles.label, { fontWeight: "bold" }]}>
                    Description:
                  </Text>{" "}
                  {selectedItem.complain_description}
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Edit Complain Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header with Title and Close Icon */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Complain</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Icon name="times" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.textArea1}
              placeholder="Title"
              value={selectedItem?.title}
              onChangeText={(text) =>
                setSelectedItem({ ...selectedItem, title: text })
              }
            />
            <TextInput
              style={styles.textArea1}
              placeholder="Complain Details"
              multiline
              value={selectedItem?.complain_description}
              onChangeText={(text) =>
                setSelectedItem({ ...selectedItem, complain_description: text })
              }
            />

            {/* Buttons Side by Side */}
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                compact
                onPress={handleComplainEditSubmit}
                style={styles.button}
              >
                Save
              </Button>
              <Button
                mode="outlined"
                compact
                onPress={() => setEditModalVisible(false)}
                style={styles.button}
              >
                Close
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* WhatsApp-Style Chat Modal */}
      <Modal
        visible={messageModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMessageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.chatContainer}>
            {/* Chat Header */}
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>Chat</Text>
            </View>

            {/* Chat Messages - Scrollable */}
            <ScrollView style={styles.chatBody}>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageText}>
                  Hello! How can I help you?
                </Text>
              </View>
              <View style={styles.sentMessage}>
                <Text style={styles.messageText}>
                  I need some information about the NOC process.
                </Text>
              </View>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageText}>
                  Sure! What type of NOC are you looking for?
                </Text>
              </View>
              <View style={styles.sentMessage}>
                <Text style={styles.messageText}>
                  I need an NOC for my electricity meter transfer.
                </Text>
              </View>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageText}>
                  Alright. Do you have all the required documents?
                </Text>
              </View>
              <View style={styles.sentMessage}>
                <Text style={styles.messageText}>
                  Yes, I have my property documents and ID proof.
                </Text>
              </View>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageText}>
                  Great! You can apply through the society office or online.
                </Text>
              </View>
              <View style={styles.sentMessage}>
                <Text style={styles.messageText}>
                  Can I download the NOC form from the portal?
                </Text>
              </View>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageText}>
                  Yes! Log in and go to the NOC section to download it.
                </Text>
              </View>
              <View style={styles.sentMessage}>
                <Text style={styles.messageText}>
                  Thanks! I'll check and apply soon.
                </Text>
              </View>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageText}>
                  You're welcome! Let me know if you need further help.
                </Text>
              </View>
            </ScrollView>

            {/* Chat Input */}
            <View style={styles.chatFooter}>
              <TextInput
                style={styles.textArea}
                placeholder="Type a message..."
                value={messageText}
                onChangeText={setMessageText}
              />
              <Button
                mode="contained"
                compact
                onPress={() => console.log("Message Sent:", messageText)}
              >
                Send
              </Button>
            </View>

            {/* Close Button */}
            <Button
              mode="outlined"
              compact
              onPress={() => setMessageModalVisible(false)}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>

      {/* Add Complain Modal */}
      <Modal
        visible={addComplainModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddComplainModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Complain</Text>
              <TouchableOpacity
                onPress={() => setAddComplainModalVisible(false)}
              >
                <Icon name="times" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* <TextInput
              style={styles.textArea1}
              placeholder="Title"
              value={newComplainTitle}
              onChangeText={setNewComplainTitle}
            />
            <TextInput
              style={styles.textArea1}
              placeholder="Complain Details"
              multiline
              value={newComplainMessage}
              onChangeText={setNewComplainMessage}
            /> */}

            {/* Button Container for Side-by-Side Buttons */}
            {/* <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                compact
                onPress={() => handleComplainSubmit(false)}
                style={styles.button}
              >
                Save
              </Button>
              <Button
                mode="outlined"
                compact
                onPress={() => setAddComplainModalVisible(false)}
                style={styles.button}
              >
                Close
              </Button>
            </View> */}

            <View style={styles.container2}>
              <View style={styles.labelContainer2}>
                <Text style={styles.label2}>Title:</Text>
              </View>
              <TextInput
                placeholder="Enter Title"
                value={newComplainTitle}
                onChangeText={setNewComplainTitle}
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
                <Text style={styles.label2}>Complain Details:</Text>
              </View>
              <TextInput
                  placeholder="Complain Details"
                value={newComplainMessage}
                onChangeText={setNewComplainMessage}
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



                 <View style={styles.buttonRow}>
                          <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setAddComplainModalVisible(false)}
                          >
                            <Text style={styles.buttonText}>Close</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => handleComplainSubmit(false)}
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

      <FlashMessage position="top" />
    </View>
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
  header1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  iconContainer1: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton1: {
    marginHorizontal: -4,
    padding: 0,
  },
  // container1: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#4169E1", // Your button color
    paddingVertical: 1, // Reduced padding for less space above and below
    paddingHorizontal: 8,
  },
  headerTitle: {
    color: "#fff", // Text color
    fontSize: 15, // Increase font size
    fontWeight: "bold", // Optional: makes the text bold
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  iconContainer: {
    flexDirection: "row", // Align icons horizontally
    justifyContent: "center", // Center the icons horizontally
    alignItems: "center", // Vertically center the icons
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  suggestionsText: { fontSize: 18, fontWeight: "bold" },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
  },
  // iconContainer: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  iconButton: { padding: 0, marginHorizontal: -6 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  textArea1: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    minHeight: 40,
    marginBottom: 10,
  },
  chatContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    maxHeight: "80%", // Prevents overflow
  },
  chatHeader: {
    backgroundColor: "#2e86c1",
    padding: 10,
  },
  chatTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  chatBody: {
    maxHeight: 400, // Scrollable chat area
    padding: 10,
  },
  chatFooter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  textArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d1f2eb",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: "75%",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: "75%",
  },
  messageText: {
    fontSize: 14,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%", // Reduced the width
    minHeight: 200, // Set a minimum height
    maxHeight: 400, // Limit the maximum height
  },
  modalContentForView: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    maxHeight: "auto",
    minHeight: "auto",
  },
  modalHeaderForView: {
    flexDirection: "row",
    justifyContent: "space-between", // Pushes items to opposite ends
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18, // Slightly reduced the font size
    fontWeight: "bold",
    color: "#000",
  },
  textArea1: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
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

export default ComplainScreen;
