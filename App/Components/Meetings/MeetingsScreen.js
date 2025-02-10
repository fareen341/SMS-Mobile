import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { DataTable, Button, IconButton } from 'react-native-paper';

const MeetingsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [suggestionModalVisible, setSuggestionModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [suggestionText, setSuggestionText] = useState('');
  const [activeTab, setActiveTab] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    axios.get('https://society.zacoinfotech.com/api/meetings/', {
      headers: {
        'Authorization': `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
      }
    })
      .then((response) => setMeetings(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredData = meetings.filter((item) =>
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
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Meeting Type, Place"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={styles.actionColumn}>Actions</DataTable.Title>
          <DataTable.Title>Type</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Time</DataTable.Title>
          {/* <DataTable.Title>Place</DataTable.Title> */}
        </DataTable.Header>

        {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell style={styles.actionColumn}>
              <View style={styles.iconContainer}>
                <IconButton icon="eye" size={20} onPress={() => handleViewClick(item)} style={styles.iconButton} />
                <IconButton icon="lightbulb-outline" size={20} onPress={() => handleSuggestionClick(item)} style={styles.iconButton} />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>{item.meeting_type_formatted}</DataTable.Cell>
            <DataTable.Cell>{item.date_of_meeting}</DataTable.Cell>
            <DataTable.Cell>{item.time_of_meeting}</DataTable.Cell>
            {/* <DataTable.Cell>{item.place_of_meeting}</DataTable.Cell> */}
          </DataTable.Row>
        ))}

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
            <View style={styles.tabContainer}>
              <TouchableOpacity onPress={() => setActiveTab(1)} style={[styles.tab, activeTab === 1 && styles.activeTab]}>
                <Text style={styles.tabText}>Meeting Details</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab(2)} style={[styles.tab, activeTab === 2 && styles.activeTab]}>
                <Text style={styles.tabText}>Minutes</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {selectedItem && activeTab === 1 ? (
                <>
                  <Text style={styles.modalText}>Date: {selectedItem.date_of_meeting}</Text>
                  <Text style={styles.modalText}>Time: {selectedItem.time_of_meeting}</Text>
                  <Text style={styles.modalText}>Place: {selectedItem.place_of_meeting}</Text>
                  <Text style={styles.modalText}>Agenda: {selectedItem.agenda}</Text>
                  <Text style={styles.modalText}>Financials: {selectedItem.financials}</Text>
                  <Text style={styles.modalText}>Content: {selectedItem.content}</Text>
                </>
              ) : (
                <Text style={styles.modalText}>{selectedItem?.minutes_content}</Text>
              )}
            </ScrollView>
            <Button mode="contained" onPress={() => setModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>

      {/* Suggestion Modal */}
      <Modal visible={suggestionModalVisible} transparent animationType="slide" onRequestClose={() => setSuggestionModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Write Your Suggestion</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Type your suggestion here..."
              multiline
              value={suggestionText}
              onChangeText={setSuggestionText}
            />
            <View style={styles.buttonRow}>
              <Button mode="contained" compact onPress={() => console.log('Saved')}>Save</Button>
              <Button mode="outlined" compact onPress={() => setSuggestionModalVisible(false)}>Close</Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  iconContainer: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  iconButton: { padding: 0, marginHorizontal: -6 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', maxHeight: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  textArea: { borderWidth: 1, borderColor: '#ccc', padding: 8, minHeight: 60, textAlignVertical: 'top' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  tab: { flex: 1, padding: 10, alignItems: 'center', backgroundColor: '#ddd' },
  activeTab: { backgroundColor: '#007bff' },
  tabText: { color: 'white', fontWeight: 'bold' },
});

export default MeetingsScreen;
