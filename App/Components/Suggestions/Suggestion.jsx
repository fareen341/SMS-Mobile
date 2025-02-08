import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SuggestionCreate from "./SuggestionCreate";
import SuggestionCard from "./SuggestionCard";

const Data = [
  {
    suggestion: "John Doe",
    filename: "john.doe",
  },
  {
    suggestion: "Jane Smith",
    filename: "jane.smith",
  },
  {
    suggestion: "Michael Johnson Michael Johnson",
    filename: "michael.johnson Michael Johnson",
  },
  {
    suggestion: "Emily Davis",
    filename: "emily.davis",
  },
  {
    suggestion: "John Doe",
    filename: "john.doe",
  },
  {
    suggestion: "Jane Smith",
    filename: "jane.smith",
  },
  {
    suggestion: "Michael Johnson Michael Johnson",
    filename: "michael.johnson Michael Johnson",
  },
  {
    suggestion: "Emily Davis",
    filename: "emily.davis",
  },
  {
    suggestion: "John Doe",
    filename: "john.doe",
  },
  {
    suggestion: "Jane Smith",
    filename: "jane.smith",
  },
  {
    suggestion: "Michael Johnson Michael Johnson",
    filename: "michael.johnson Michael Johnson",
  },
  {
    suggestion: "Emily Davis",
    filename: "emily.davis",
  },
  {
    suggestion: "John Doe",
    filename: "john.doe",
  },
  {
    suggestion: "Jane Smith",
    filename: "jane.smith",
  },
  {
    suggestion: "Michael Johnson Michael Johnson",
    filename: "michael.johnson Michael Johnson",
  },
  {
    suggestion: "Emily Davis",
    filename: "emily.davis",
  },
  {
    suggestion: "John Doe",
    filename: "john.doe",
  },
  {
    suggestion: "Jane Smith",
    filename: "jane.smith",
  },
  {
    suggestion: "Michael Johnson Michael Johnson",
    filename: "michael.johnson Michael Johnson",
  },
  {
    suggestion: "Emily Davis",
    filename: "emily.davis",
  },
  {
    suggestion: "John Doe",
    filename: "john.doe",
  },
  {
    suggestion: "Jane Smith",
    filename: "jane.smith",
  },
  {
    suggestion: "Michael Johnson Michael Johnson",
    filename: "michael.johnson Michael Johnson",
  },
  {
    suggestion: "Emily Davis",
    filename: "emily.davis",
  },
  {
    suggestion: "John Doe",
    filename: "john.doe",
  },
  {
    suggestion: "Jane Smith",
    filename: "jane.smith",
  },
  {
    suggestion: "Michael Johnson Michael Johnson",
    filename: "michael.johnson Michael Johnson",
  },
  {
    suggestion: "Emily Davis",
    filename: "emily.davis",
  },
  {
    suggestion: "John Doe",
    filename: "john.doe",
  },
  {
    suggestion: "Jane Smith",
    filename: "jane.smith",
  },
  {
    suggestion: "Michael Johnson Michael Johnson",
    filename: "michael.johnson Michael Johnson",
  },
  {
    suggestion: "Emily Davis",
    filename: "emily.davis",
  },
];
const ITEMS_PER_PAGE = 11;
const Suggestion = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // Filtering data based on search query
  const filteredData = Data.filter((item) =>
    item.suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleEyeClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
    console.log("item",item)
  };
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {/* <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() => handleEyeClick(item)}
          style={styles.iconButton}
        >
          <Icon name="eye" size={20} color="#4169E1" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleEditClick(item)}
          style={styles.iconButton}
        >
          <Icon name="edit" size={20} color="#4169E1" />
        </TouchableOpacity>
      </View> */}
      <SuggestionCard item={item}/>
      <Text
        style={[styles.cell, styles.nameCell]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.suggestion}
      </Text>
      <Text
        style={[styles.cell, styles.filenameCell]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.filename}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WORKROOM</Text>
        <View style={[styles.iconContainer, { backgroundColor: "#4169E1" }]}>
          <SuggestionCreate />
        </View>
      </View>

      {/* Search Box */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Name"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          setCurrentPage(1); // Reset page on search
        }}
      />

      {/* Table Header */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerCell, styles.actionCell]}>
          Actions
        </Text>
        <Text style={[styles.cell, styles.headerCell, styles.nameCell]}>
          Name
        </Text>
        <Text style={[styles.cell, styles.headerCell, styles.filenameCell]}>
          Filename
        </Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={currentData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No data available</Text>
        }
      />
      {/* Pagination Controls */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[
            styles.pageButton,
            currentPage === 1 && styles.disabledButton,
          ]}
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Text style={styles.pageText}>Previous</Text>
        </TouchableOpacity>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <TouchableOpacity
            key={i + 1}
            style={[
              styles.pageNumber,
              currentPage === i + 1 && styles.activePage,
            ]}
            onPress={() => handlePageChange(i + 1)}
          >
            <Text style={styles.pageNumberText}>{i + 1}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            styles.pageButton,
            currentPage === totalPages && styles.disabledButton,
          ]}
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.pageText}>Next</Text>
        </TouchableOpacity>
      </View>
      {/* Modal */}
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
                <Text style={styles.modalTitle}>Details</Text>
                <Text style={styles.modalText}>
                  Name: {selectedItem.suggestion}
                </Text>
                <Text style={styles.modalText}>
                  Filename: {selectedItem.filename}
                </Text>
              </>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3, // Adjust width for proper alignment
    justifyContent: "space-around",
  },
  iconButton: {
    paddingHorizontal: 5,
    color: "C4D9FF",
  },
  headerRow: {
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 2,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 14,
  },

  actionCell: {
    flex: 2.1, // Fix width for action button
    justifyContent: "center",
    alignItems: "center",
  },
  nameCell: {
    flex: 2,
    minWidth: 100, // Ensures it doesn't shrink too much
    maxWidth: 180, // Prevents it from being too big
    overflow: "hidden",
  },
  filenameCell: {
    flex: 2,
    minWidth: 100,
    maxWidth: 180,
    overflow: "hidden",
  },
  emptyMessage: {
    textAlign: "center",
    padding: 20,
    color: "#888",
  },
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
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginVertical: 4,
  },

  ///////////////////pageination//////////
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  pageButton: {
    padding: 8,
    marginHorizontal: 5,
    backgroundColor: "#4169E1",
    borderRadius: 5,
  },
  disabledButton: { backgroundColor: "#ccc" },
  pageText: { color: "#fff", fontWeight: "bold" },
  pageNumber: {
    padding: 8,
    marginHorizontal: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#4169E1",
  },
  activePage: { backgroundColor: "#4169E1" },
  pageNumberText: { color: "#000", fontWeight: "bold" },
});

export default Suggestion;
