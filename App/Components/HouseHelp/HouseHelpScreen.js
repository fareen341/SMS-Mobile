import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { DataTable, Button, IconButton } from 'react-native-paper';

const HouseHelpScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [houseHelpList, setHouseHelpList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const API_TOKEN = 'YOUR_SECURE_API_TOKEN_HERE'; // Replace with secure storage

  useEffect(() => {
    fetchHouseHelpData();
  }, []);

  const fetchHouseHelpData = async () => {
    try {
      const response = await axios.get('https://society.zacoinfotech.com/api/househelp/', {
        headers: { 'Authorization': `Token d28a0f245d51623cd20e56413cd7691e71f1b043` },
      });
      setHouseHelpList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Reset pagination when search query changes
  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  // Filter data based on search input
  const filteredData = houseHelpList.filter((item) =>
    item.house_help_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.house_help_contact.includes(searchQuery) ||
    item.house_help_state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.house_help_city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open view details modal
  const handleViewClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Open edit modal with selected item data
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditModalVisible(true);
  };

  return (
    <View style={styles.container}>
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
          <DataTable.Title style={styles.actionColumn}>Actions</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Contact</DataTable.Title>
          <DataTable.Title>State</DataTable.Title>
          <DataTable.Title>City</DataTable.Title>
        </DataTable.Header>

        {/* Table Rows */}
        {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell style={styles.actionColumn}>
              <View style={styles.iconContainer}>
                <IconButton icon="eye" size={20} onPress={() => handleViewClick(item)} style={styles.iconButton} />
                <IconButton icon="pencil" size={20} onPress={() => handleEditClick(item)} style={styles.iconButton} />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>{item.house_help_name}</DataTable.Cell>
            <DataTable.Cell>{item.house_help_contact}</DataTable.Cell>
            <DataTable.Cell>{item.house_help_state}</DataTable.Cell>
            <DataTable.Cell>{item.house_help_city}</DataTable.Cell>
          </DataTable.Row>
        ))}

        {/* Pagination Controls */}
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(filteredData.length / rowsPerPage)}
          onPageChange={(newPage) => setPage(newPage)}
          label={`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, filteredData.length)} of ${filteredData.length}`}
        />
      </DataTable>

      {/* View Details Modal */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>House Help Details</Text>
                <Text style={styles.modalText}>Name: {selectedItem.house_help_name}</Text>
                <Text style={styles.modalText}>PAN: {selectedItem.house_help_pan_number}</Text>
                <Text style={styles.modalText}>Contact: {selectedItem.house_help_contact}</Text>
                <Text style={styles.modalText}>Aadhar: {selectedItem.house_help_aadhar_number}</Text>
                <Text style={styles.modalText}>State: {selectedItem.house_help_state}</Text>
                <Text style={styles.modalText}>City: {selectedItem.house_help_city}</Text>
              </>
            )}
            <Button mode="contained" onPress={() => setModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal visible={editModalVisible} transparent animationType="slide" onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit House Help</Text>
            {selectedItem && (
              <>
                <TextInput style={styles.input} value={selectedItem.house_help_name} placeholder="Name" />
                <TextInput style={styles.input} value={selectedItem.house_help_contact} placeholder="Contact" keyboardType="numeric" />
                <TextInput style={styles.input} value={selectedItem.house_help_state} placeholder="State" />
                <TextInput style={styles.input} value={selectedItem.house_help_city} placeholder="City" />
                {/* Add Save button when update API logic is implemented */}
              </>
            )}
            <Button mode="contained" onPress={() => setEditModalVisible(false)}>Close</Button>
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
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
  },
  header: {
    backgroundColor: '#f8f9fa',
  },
  actionColumn: {
    width: 100, // Ensures both icons fit properly
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row', // Ensures icons stay side by side
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: -4, // Negative margin to remove all space
    padding: 0, // Ensures no extra padding
  },
});

export default HouseHelpScreen;
