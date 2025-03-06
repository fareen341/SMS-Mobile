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
  Linking,
} from "react-native";
import { DataTable, Button, IconButton } from "react-native-paper";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
const MeetingsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [suggestionModalVisible, setSuggestionModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");
  const [activeTab, setActiveTab] = useState("meeting");
  const rowsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://society.zacoinfotech.com/api/meetings/", {
        headers: {
          Authorization: `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
        },
      })
      .then((response) => setMeetings(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = meetings.filter(
    (item) =>
      item.meeting_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.place_of_meeting.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSuggestionClick = (item) => {
    setSelectedItem(item);
    setSuggestionModalVisible(true);
  };

  return (

    <>
      <View style={styles.container}>
        <View style={styles.header1}>
          <Text style={styles.title}>Meetings</Text>
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
                Date of Meeting
              </Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                Time of Meeting
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

                <DataTable.Cell>{item.date_of_meeting}</DataTable.Cell>
                <DataTable.Cell>{item.time_of_meeting}</DataTable.Cell>
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
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Tabs */}
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "meeting" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("meeting")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "meeting" && styles.activeTabText,
                    ]}
                  >
                    Meeting
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "minutes" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("minutes")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "minutes" && styles.activeTabText,
                    ]}
                  >
                    Minutes
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Content */}
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {activeTab === "meeting" ? (
                  <View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Date of Meeting:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.date_of_meeting || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Time of Meeting:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.time_of_meeting || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Place of Meeting:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.place_of_meeting || "N/A"}
                      </Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Place of Meeting:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.place_of_meeting || "N/A"}
                      </Text>
                    </View>

                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Agenda Document:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.agenda ? (
                          <Text
                            style={{ color: "#4169E1" }}
                            onPress={() =>
                              typeof selectedItem.agenda === "string"
                                ? Linking.openURL(selectedItem.agenda)
                                : null
                            }
                          >
                            View Document
                          </Text>
                        ) : (
                          "N/A"
                        )}
                      </Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Financials:</Text>
                      <Text style={styles.value}>
                        {selectedItem?.financials ? (
                          <Text
                            style={{ color: "#4169E1" }}
                            onPress={() =>
                              typeof selectedItem.financials === "string"
                                ? Linking.openURL(selectedItem.financials)
                                : null
                            }
                          >
                            View Document
                          </Text>
                        ) : (
                          "N/A"
                        )}
                      </Text>
                    </View>

                    <View style={styles.content}>
                      <Text style={styles.label}>Meeting :</Text>
                      {selectedItem?.content ? (
                        <WebView
                          source={{ html: selectedItem?.content }}
                          style={styles.webview}
                        />
                      ) : (
                        <Text style={styles.value}>N/A</Text>
                      )}
                    </View>
                  </View>
                ) : (
                  <>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Minutes Document:</Text>
                    <Text style={styles.value}>
                      {selectedItem?.minutes_document &&
                      typeof selectedItem.minutes_document === "string" &&
                      selectedItem.minutes_document.trim() !== "" ? (
                        <Text
                          style={{ color: "#4169E1" }}
                          onPress={() => Linking.openURL(selectedItem.minutes_document)}
                        >
                          View Document
                        </Text>
                      ) : (
                        "N/A"
                      )}
                    </Text>
                  </View>
                
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Other Document:</Text>
                    <Text style={styles.value}>
                      {selectedItem?.minutes_other_doc &&
                      typeof selectedItem.minutes_other_doc === "string" &&
                      selectedItem.minutes_other_doc.trim() !== "" ? (
                        <Text
                          style={{ color: "#4169E1" }}
                          onPress={() => Linking.openURL(selectedItem.minutes_other_doc)}
                        >
                          View Document
                        </Text>
                      ) : (
                        "N/A"
                      )}
                    </Text>
                  </View>
                
                  <View style={styles.content}>
                    <Text style={styles.label}>Minutes:</Text>
                    {selectedItem?.minutes_content &&
                    typeof selectedItem.minutes_content === "string" &&
                    selectedItem.minutes_content.trim() !== "" ? (
                      <WebView source={{ html: selectedItem.minutes_content }} style={styles.webview} />
                    ) : (
                      <Text style={styles.value}>N/A</Text>
                    )}
                  </View>
                </>
                
                )}
              </ScrollView>

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButtonwow}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonTextwow}>Close</Text>
              </TouchableOpacity>
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#4169E1",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  activeTabText: {
    color: "#4169E1",
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
  },
  content: {
    marginVertical: 10,
  },
  link: {
    fontSize: 16,
    color: "#4169E1",
    textDecorationLine: "underline",
  },
  webview: {
    height: 150,
    marginTop: 10,
  },
  closeButtonwow: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    margin: 10,
  },
  closeButtonTextwow: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default MeetingsScreen;
