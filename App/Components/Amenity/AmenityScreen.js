import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { DataTable, Button, IconButton } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

const AmenityScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [amenitiesOptions, setAmenitiesOptions] = useState([]);
  const [newAmenity, setNewAmenity] = useState({
    amenities_id: '',
    booking_days: '',
    from_date: '',
    to_date: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchAmenityData();
    fetchAmenityOptions();
  }, []);

  const fetchAmenityData = async () => {
    try {
      const response = await axios.get('https://society.zacoinfotech.com/api/book_amenity/', {
        headers: { 'Authorization': `Token d28a0f245d51623cd20e56413cd7691e71f1b043` },
      });
      setAmenitiesList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAmenityOptions = async () => {
    try {
      const response = await axios.get('https://society.zacoinfotech.com/api/book_amenity/', {
        headers: { 'Authorization': `Token d28a0f245d51623cd20e56413cd7691e71f1b043` },
      });
      const formattedOptions = response.data.map(item => ({
        label: item.amenity_name, 
        value: item.amenities_id
      }));
      setAmenitiesOptions(formattedOptions);
    } catch (error) {
      console.error('Error fetching amenity options:', error);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  const handleAddAmenity = () => {
    setNewAmenity({ amenities_id: '', booking_days: '', from_date: '', to_date: '' });
    setAddModalVisible(true);
  };

  const handleSaveAmenity = async () => {
    try {
      await axios.post('https://society.zacoinfotech.com/api/amenity_records/', newAmenity, {
        headers: { 'Authorization': `Token d28a0f245d51623cd20e56413cd7691e71f1b043` },
      });
      setAddModalVisible(false);
      fetchAmenityData();
    } catch (error) {
      console.error('Error saving amenity:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.visitorText}>Amenities</Text>
        <Button mode="contained" onPress={handleAddAmenity}>Add Amenity</Button>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by Booking Days, From Date, To Date"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title>Amenity ID</DataTable.Title>
          <DataTable.Title>Booking Days</DataTable.Title>
          <DataTable.Title>From Date</DataTable.Title>
          <DataTable.Title>To Date</DataTable.Title>
        </DataTable.Header>

        {amenitiesList.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
          <DataTable.Row key={item.amenities_id}>
            <DataTable.Cell>{item.amenities_id}</DataTable.Cell>
            <DataTable.Cell>{item.booking_days}</DataTable.Cell>
            <DataTable.Cell>{item.from_date}</DataTable.Cell>
            <DataTable.Cell>{item.to_date}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(amenitiesList.length / rowsPerPage)}
          onPageChange={(newPage) => setPage(newPage)}
          label={`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, amenitiesList.length)} of ${amenitiesList.length}`}
        />
      </DataTable>

      {/* Add Amenity Modal */}
      <Modal visible={addModalVisible} transparent animationType="slide" onRequestClose={() => setAddModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Amenity</Text>
            
            <Dropdown
              style={styles.input}
              data={amenitiesOptions}
              labelField="label"
              valueField="value"
              placeholder="Select Amenity"
              value={newAmenity.amenities_id}
              onChange={item => setNewAmenity({ ...newAmenity, amenities_id: item.value })}
            />

            <TextInput
              style={styles.input}
              placeholder="Booking Days"
              value={newAmenity.booking_days}
              onChangeText={(text) => setNewAmenity({ ...newAmenity, booking_days: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="From Date"
              value={newAmenity.from_date}
              onChangeText={(text) => setNewAmenity({ ...newAmenity, from_date: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="To Date"
              value={newAmenity.to_date}
              onChangeText={(text) => setNewAmenity({ ...newAmenity, to_date: text })}
            />

            <Button mode="contained" onPress={handleSaveAmenity}>Save</Button>
            <Button mode="outlined" onPress={() => setAddModalVisible(false)}>Close</Button>
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
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
});

export default AmenityScreen;
