import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { DataTable, Button, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const TenantScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5; // Number of rows per page

  useEffect(() => {
    axios.get('https://society.zacoinfotech.com/api/tenant_creation/', {
      headers: {
          'Authorization': `Token d28a0f245d51623cd20e56413cd7691e71f1b043`,
      }
  })
      .then((response) => {
        setTenants(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Filter tenants based on search query
  const filteredData = tenants.filter((item) =>
    item.tenant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tenant_contact.includes(searchQuery) ||
    item.tenant_state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tenant_city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle eye icon click to open modal
  const handleEyeClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
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
              <IconButton icon="eye" size={20} onPress={() => handleEyeClick(item)} />
            </DataTable.Cell>
            <DataTable.Cell>{item.tenant_name}</DataTable.Cell>
            <DataTable.Cell>{item.tenant_contact}</DataTable.Cell>
            <DataTable.Cell>{item.tenant_state}</DataTable.Cell>
            <DataTable.Cell>{item.tenant_city}</DataTable.Cell>
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

      {/* Modal for Tenant Details */}
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
                <Text style={styles.modalTitle}>Tenant Details</Text>
                <Text style={styles.modalText}>Name: {selectedItem.tenant_name}</Text>
                <Text style={styles.modalText}>PAN: {selectedItem.tenant_pan_number}</Text>
                <Text style={styles.modalText}>Contact: {selectedItem.tenant_contact}</Text>
                <Text style={styles.modalText}>Aadhar: {selectedItem.tenant_aadhar_number}</Text>
                <Text style={styles.modalText}>State: {selectedItem.tenant_state}</Text>
                <Text style={styles.modalText}>City: {selectedItem.tenant_city}</Text>
              </>
            )}
            <Button mode="contained" onPress={() => setModalVisible(false)}>Close</Button>
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
    width: 60, // Set fixed width for the actions column
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
  },
});

export default TenantScreen;
