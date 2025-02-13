import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { DataTable, Button, IconButton } from 'react-native-paper';

const ComplainScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [addComplainModalVisible, setAddComplainModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [complains, setComplains] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [messageText, setMessageText] = useState('');
  const [newComplainTitle, setNewComplainTitle] = useState('');
  const [newComplainMessage, setNewComplainMessage] = useState('');
  const rowsPerPage = 5;

  useEffect(() => {
    axios.get('https://society.zacoinfotech.com/api/complain', {
      headers: {
        'Authorization': `Token e0ba9a7bd3574f04d91315f4452deaa6262880df`,
      }
    })
      .then((response) => setComplains(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredData = complains.filter((item) =>
    (typeof item.name === 'string' && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof item.title === 'string' && item.title.toLowerCase().includes(searchQuery.toLowerCase()))
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

  return (
    <View style={styles.container}>
      {/* Suggestions Text & Add Complain Button */}
      <View style={styles.headerRow}>
        <Text style={styles.suggestionsText}>Complains</Text>
        <Button mode="contained" onPress={handleAddComplain}>Add Complain</Button>
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
          <DataTable.Title style={styles.actionColumn}>Actions</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Title</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
        </DataTable.Header>

        {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell style={styles.actionColumn}>
              <View style={styles.iconContainer}>
                <IconButton icon="eye" size={20} onPress={() => handleViewClick(item)} style={styles.iconButton} />
                <IconButton icon="pencil" size={20} onPress={() => handleEditClick(item)} style={styles.iconButton} />
                <IconButton icon="plus" size={20} onPress={() => handleAddMessageClick(item)} style={styles.iconButton} />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.title}</DataTable.Cell>
            <DataTable.Cell>{item.status}</DataTable.Cell>
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
            {selectedItem && (
              <>
                <Text>Name: {selectedItem.name}</Text>
                <Text>Title: {selectedItem.title}</Text>
                <Text>Description: {selectedItem.complain_description}</Text>
                <Text>Status: {selectedItem.status}</Text>
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
            <TextInput style={styles.textArea1} placeholder="Name" value={selectedItem?.name} />
            <TextInput style={styles.textArea1} placeholder="Title" value={selectedItem?.title} />
            <TextInput style={styles.textArea1} placeholder="Description" value={selectedItem?.complain_description} multiline />
            <TextInput style={styles.textArea1} placeholder="Status" value={selectedItem?.status} />
            <Button mode="contained" compact>Save</Button>
            <Button mode="outlined" compact onPress={() => setEditModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>

      {/* WhatsApp-Style Chat Modal */}
      <Modal visible={messageModalVisible} transparent animationType="slide" onRequestClose={() => setMessageModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.chatContainer}>
            {/* Chat Header */}
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>Chat</Text>
            </View>

            {/* Chat Messages - Scrollable */}
            <ScrollView style={styles.chatBody}>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageText}>Hello! How can I help you?</Text>
              </View>
              <View style={styles.sentMessage}>
                <Text style={styles.messageText}>I need some information about the NOC process.</Text>
              </View>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageText}>Sure! What type of NOC are you looking for?</Text>
              </View>
              <View style={styles.sentMessage}>
                <Text style={styles.messageText}>I need an NOC for my electricity meter transfer.</Text>
              </View>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageText}>Alright. Do you have all the required documents?</Text>
              </View>
              <View style={styles.sentMessage}>
                <Text style={styles.messageText}>Yes, I have my property documents and ID proof.</Text>
              </View>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageText}>Great! You can apply through the society office or online.</Text>
              </View>
              <View style={styles.sentMessage}>
                <Text style={styles.messageText}>Can I download the NOC form from the portal?</Text>
              </View>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageText}>Yes! Log in and go to the NOC section to download it.</Text>
              </View>
              <View style={styles.sentMessage}>
                <Text style={styles.messageText}>Thanks! I'll check and apply soon.</Text>
              </View>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageText}>You're welcome! Let me know if you need further help.</Text>
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
              <Button mode="contained" compact onPress={() => console.log('Message Sent:', messageText)}>Send</Button>
            </View>

            {/* Close Button */}
            <Button mode="outlined" compact onPress={() => setMessageModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>

      {/* Add Complain Modal */}
      <Modal visible={addComplainModalVisible} transparent animationType="slide" onRequestClose={() => setAddComplainModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput style={styles.textArea1} placeholder="Title" value={newComplainTitle} onChangeText={setNewComplainTitle} />
            <TextInput style={styles.textArea1} placeholder="Complain Details" multiline value={newComplainMessage} onChangeText={setNewComplainMessage} />
            <Button mode="contained" compact>Submit</Button>
            <Button mode="outlined" compact onPress={() => setAddComplainModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  suggestionsText: { fontSize: 18, fontWeight: 'bold' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
  iconContainer: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  iconButton: { padding: 0, marginHorizontal: -6 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  textArea1: { borderWidth: 1, borderColor: '#ccc', padding: 8, minHeight: 40, marginBottom: 10 },
  chatContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    maxHeight: '80%',  // Prevents overflow
  },
  chatHeader: {
    backgroundColor: '#2e86c1',
    padding: 10,
  },
  chatTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatBody: {
    maxHeight: 400,  // Scrollable chat area
    padding: 10,
  },
  chatFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  textArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1f2eb',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '75%',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '75%',
  },
  messageText: {
    fontSize: 14,
  },
});

export default ComplainScreen;
