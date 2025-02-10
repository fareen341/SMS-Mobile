import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { DataTable, Button, IconButton } from 'react-native-paper';

const VisitorRecordScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visitorList, setVisitorList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchVisitorData();
  }, []);

  const fetchVisitorData = async () => {
    try {
      const response = await axios.get('https://society.zacoinfotech.com/api/visitor_records/', {
        headers: { 'Authorization': `Token d28a0f245d51623cd20e56413cd7691e71f1b043` },
      });
      setVisitorList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Reset pagination when search query changes
  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  // Filter data based on search input
  const filteredData = visitorList.filter((item) =>
    item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.contact_no.includes(searchQuery) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
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

  // Open add visitor modal
  const handleAddVisitor = () => {
    setAddModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Visitors Text & Add Visitor Button */}
      <View style={styles.headerRow}>
        <Text style={styles.visitorText}>Visitors</Text>
        <Button mode="contained" onPress={handleAddVisitor}>Add Visitor</Button>
      </View>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Name, Contact, Email"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* DataTable */}
      <DataTable>
        {/* Table Header */}
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={styles.actionColumn}>Actions</DataTable.Title>
          <DataTable.Title>Visitor ID</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Contact</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>

        {/* Table Rows */}
        {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
          <DataTable.Row key={item.visitor_id}>
            <DataTable.Cell style={styles.actionColumn}>
              <View style={styles.iconContainer}>
                <IconButton icon="eye" size={20} onPress={() => handleViewClick(item)} />
                <IconButton icon="pencil" size={20} onPress={() => handleEditClick(item)} />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>{item.visitor_id}</DataTable.Cell>
            <DataTable.Cell>{item.full_name}</DataTable.Cell>
            <DataTable.Cell>{item.contact_no}</DataTable.Cell>
            <DataTable.Cell>{item.status}</DataTable.Cell>
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
                <Text style={styles.modalTitle}>Visitor Details</Text>
                <Text style={styles.modalText}>Visitor ID: {selectedItem.visitor_id}</Text>
                <Text style={styles.modalText}>Full Name: {selectedItem.full_name}</Text>
                <Text style={styles.modalText}>Contact: {selectedItem.contact_no}</Text>
                <Text style={styles.modalText}>Email: {selectedItem.email}</Text>
                <Text style={styles.modalText}>Visit Date: {selectedItem.visitor_date}</Text>
                <Text style={styles.modalText}>Purpose: {selectedItem.visit_purpose}</Text>
                <Text style={styles.modalText}>Additional Note: {selectedItem.additional_note}</Text>
                <Text style={styles.modalText}>Status: {selectedItem.status}</Text>
                {selectedItem.visitor_photo && (
                  <Image source={{ uri: selectedItem.visitor_photo }} style={styles.visitorImage} />
                )}
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
            <Text style={styles.modalTitle}>Edit Visitor</Text>
            {selectedItem && (
              <>
                <TextInput style={styles.input} placeholder="Full Name" value={selectedItem.full_name} />
                <TextInput style={styles.input} placeholder="Contact" value={selectedItem.contact_no} keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Email" value={selectedItem.email} />
                <TextInput style={styles.input} placeholder="Visit Date" value={selectedItem.visitor_date} />
                <TextInput style={styles.input} placeholder="Purpose" value={selectedItem.visit_purpose} />
                <TextInput style={styles.input} placeholder="Additional Note" value={selectedItem.additional_note} multiline />
                <TextInput style={styles.input} placeholder="Status" value={selectedItem.status} />
              </>
            )}
            <Button mode="contained">Save</Button>
            <Button mode="outlined" onPress={() => setEditModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  visitorText: { fontSize: 18, fontWeight: 'bold' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
  iconContainer: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  modalText: { fontSize: 16, marginVertical: 4, textAlign: 'center' },
  visitorImage: { width: 100, height: 100, marginVertical: 10, alignSelf: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
});

export default VisitorRecordScreen;
