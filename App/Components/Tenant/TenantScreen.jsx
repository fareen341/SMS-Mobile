import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome

const TenantScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [initialTenant, setTenant] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  console.log('..........', initialTenant);

  const tableHead = ['Actions', 'Name', 'Contact', 'State', 'City'];

  useEffect(() => {
    axios.get('http://192.168.1.8:8000/api/tenant_creation/')
      .then((response) => {
        setTenant(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Filtered data based on search query
  const filteredData = initialTenant.filter((item) =>
    item.tenant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tenant_contact.includes(searchQuery) ||
    item.tenant_state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tenant_city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEyeClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity style={styles.actionCell} onPress={() => handleEyeClick(item)}>
        <Icon name="eye" size={20} color="#000" />
      </TouchableOpacity>
      <Text style={styles.cell}>{item.tenant_name}</Text>
      <Text style={styles.cell}>{item.tenant_contact}</Text>
      <Text style={styles.cell}>{item.tenant_state}</Text>
      <Text style={styles.cell}>{item.tenant_city}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Box */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Name, Contact, State, City"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Table Header */}
      <View style={[styles.row, styles.headerRow]}>
        {tableHead.map((header, index) => (
          <Text key={index} style={[styles.cell, styles.headerCell]}>
            {header}
          </Text>
        ))}
      </View>

      {/* Table Body */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No data available</Text>
        }
      />

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
                <Text style={styles.modalText}>Name: {selectedItem.tenant_name}</Text>
                <Text style={styles.modalText}>PAN: {selectedItem.tenant_pan_number}</Text>
                <Text style={styles.modalText}>Contact: {selectedItem.tenant_contact}</Text>
                <Text style={styles.modalText}>Aadhar: {selectedItem.tenant_aadhar_number}</Text>
                <Text style={styles.modalText}>State: {selectedItem.tenant_state}</Text>
                <Text style={styles.modalText}>City: {selectedItem.tenant_city}</Text>
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
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerRow: {
    backgroundColor: '#f8f9fa',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionCell: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    padding: 20,
    color: '#888',
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
