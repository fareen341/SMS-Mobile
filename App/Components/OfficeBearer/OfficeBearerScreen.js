import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import { DataTable, Button, IconButton } from 'react-native-paper';

const OfficeBearerScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [officeBearers, setOfficeBearers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    axios.get('https://society.zacoinfotech.com/api/office_bearer/', {
      headers: {
        'Authorization': `Token d28a0f245d51623cd20e56413cd7691e71f1b043`,
      }
    })
      .then((response) => setOfficeBearers(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredData = officeBearers.filter((item) =>
    (typeof item.name === 'string' && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof item.designation === 'string' && item.designation.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Name, Designation"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* DataTable */}
      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={styles.actionColumn}>Actions</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Designation</DataTable.Title>
          <DataTable.Title>From Date</DataTable.Title>
          <DataTable.Title>To Date</DataTable.Title>
        </DataTable.Header>

        {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell style={styles.actionColumn}>
              <IconButton icon="eye" size={20} onPress={() => handleViewClick(item)} style={styles.iconButton} />
            </DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.designation}</DataTable.Cell>
            <DataTable.Cell>{item.from_date}</DataTable.Cell>
            <DataTable.Cell>{item.to_date}</DataTable.Cell>
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

      {/* View Modal */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              {selectedItem && (
                <>
                  <Text style={styles.modalText}>Name: {selectedItem.name}</Text>
                  <Text style={styles.modalText}>Designation: {selectedItem.designation}</Text>
                  <Text style={styles.modalText}>From Date: {selectedItem.from_date}</Text>
                  <Text style={styles.modalText}>To Date: {selectedItem.to_date}</Text>
                </>
              )}
            </ScrollView>
            <Button mode="contained" onPress={() => setModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchInput: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 10, paddingLeft: 8 },
  header: { backgroundColor: '#f8f9fa' },
  actionColumn: { width: 70, justifyContent: 'center', alignItems: 'center' },
  iconButton: { padding: 0, marginHorizontal: -6 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', maxHeight: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  modalText: { fontSize: 16, marginVertical: 4, textAlign: 'center' },
});

export default OfficeBearerScreen;
