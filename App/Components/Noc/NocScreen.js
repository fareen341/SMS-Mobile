import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DataTable, Button, IconButton } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { View, Text, StyleSheet, Modal, TextInput, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



const NocScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        navigation.replace('Dashboard');
      }
    };
    checkAuth();
  }, [navigation]);

  const { width } = useWindowDimensions();
  const [nocList, setNocList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addNocModalVisible, setAddNocModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const [newNoc, setNewNoc] = useState({
    noc_type_display: '',
    flat_owner: '',
    flat_no_name: '',
    address: '',
    noc_content: '',
  });

  const nocChoices = [
    { label: 'Issue of Fresh Passport (Self)', value: 'freshPassportSelf' },
    { label: 'Issue of Fresh Passport (Family Member / Tenant)', value: 'freshPassportFamily' },
    { label: 'Issue of Renewal of Passport (Self)', value: 'renewalPassportSelf' },
    { label: 'Issue of Renewal of Passport (Family Member / Tenant)', value: 'renewalPassportFamily' },
    { label: 'Electricity meter connection transfer', value: 'electricityTransfer' },
    { label: 'Gas meter connection transfer', value: 'gasTransfer' },
    { label: 'Domicile Certificate (Self)', value: 'domicileCertificateSelf' },
    { label: 'Domicile Certificate (Family Member)', value: 'domicileCertificateFamily' },
    { label: 'Bank Loan', value: 'bankLoan' },
    { label: 'Others', value: 'others' },
  ];

  useEffect(() => {
    axios.get('https://society.zacoinfotech.com/api/noc_api/', {
      headers: { 'Authorization': `Token e0ba9a7bd3574f04d91315f4452deaa6262880df` },
    })
      .then((response) => setNocList(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setViewModalVisible(true);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setNewNoc({
      ...item,
      noc_content: '', // Ensure content starts empty
    });
    setEditModalVisible(true);
  };

  const handleAddNoc = () => {
    setNewNoc({
      noc_type_display: '',
      flat_owner: '',
      flat_no_name: '',
      address: '',
      noc_content: '',
    });
    setAddNocModalVisible(true);
  };
  
  const handleNocTypeChange = (value) => {
    setNewNoc({
      ...newNoc,
      noc_type_display: value,
      noc_content: generateNocContent(value), // Update content based on type
    });
  };

  const closeModal = () => {
    setAddNocModalVisible(false);
    setEditModalVisible(false);
  };

  const generateNocContent = (nocType) => {
    switch (nocType) {
      case 'freshPassportSelf':
        return 'This is to certify that [Flat Owner] is residing at [Address]. The society has no objection to the issuance of a fresh passport.';
      case 'freshPassportFamily':
        return 'This is to certify that [Family Member] residing with [Flat Owner] has no objections for passport issuance.';
      case 'renewalPassportSelf':
        return 'This is to confirm that [Flat Owner] has been residing at [Address] and there is no objection for passport renewal.';
      case 'renewalPassportFamily':
        return 'This is to confirm that [Family Member] residing at [Address] has no objection for passport renewal.';
      case 'electricityTransfer':
        return 'The society approves the electricity meter transfer request for flat no [Flat No].';
      case 'gasTransfer':
        return 'The society has no objection to transferring the gas connection for flat no [Flat No].';
      case 'domicileCertificateSelf':
        return 'This certificate confirms that [Flat Owner] is a resident of this society for domicile application purposes.';
      case 'domicileCertificateFamily':
        return 'This certificate confirms that [Family Member] is residing at [Address] for domicile application purposes.';
      case 'bankLoan':
        return 'The society confirms that [Flat Owner] owns Flat No. [Flat No] and has no dues, allowing for bank loan approval.';
      default:
        return '';
    }
  };



  const filteredData = nocList.filter((item) =>
    (typeof item.flat_owner_name === 'string' && item.flat_owner_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof item.flat_no_name === 'string' && item.flat_no_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.nocText}>NOCs</Text>
        <Button mode="contained" onPress={handleAddNoc}>Add NOC</Button>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by Flat Owner or Flat No"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={styles.actionColumn}>Actions</DataTable.Title>
          <DataTable.Title>NOC Type</DataTable.Title>
          <DataTable.Title>Flat No</DataTable.Title>
        </DataTable.Header>

        {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
          <DataTable.Row key={item.id}>
          <DataTable.Cell style={styles.actionColumn}>
            <View style={styles.iconContainer}>
              <IconButton icon="eye" size={20} onPress={() => handleViewClick(item)} style={styles.iconButton} />
              <IconButton icon="pencil" size={20} onPress={() => handleEditClick(item)} style={styles.iconButton} />
            </View>
          </DataTable.Cell>
          <DataTable.Cell>{item.noc_type_display}</DataTable.Cell>
          <DataTable.Cell>{item.flat_no_name}</DataTable.Cell>
        </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(filteredData.length / rowsPerPage)}
          onPageChange={(newPage) => setPage(newPage)}
          label={`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, filteredData.length)} of ${filteredData.length}`}
        />
      </DataTable>

      {/* View NOC Modal */}
      <Modal visible={viewModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>NOC Details</Text>
            {selectedItem && (
              <ScrollView>
                <Text style={styles.modalText}><Text style={styles.bold}>NOC Type:</Text> {selectedItem.noc_type_display}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Flat Owner:</Text> {selectedItem.flat_owner_name}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Flat No:</Text> {selectedItem.flat_no_name}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Address:</Text> {selectedItem.address}</Text>

                <RenderHtml contentWidth={width - 40} source={{ html: selectedItem.noc_content || '' }} />

              </ScrollView>
            )}
            <Button mode="outlined" onPress={() => setViewModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>

      {/* Add/Edit NOC Modal */}
      <Modal visible={addNocModalVisible || editModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Dropdown
              style={styles.input}
              data={nocChoices}
              labelField="label"
              valueField="value"
              placeholder="Select NOC Type"
              value={newNoc.noc_type_display}
              onChange={(item) => handleNocTypeChange(item.value)}
            />

            <TextInput style={styles.input} placeholder="Flat Owner" value={newNoc.flat_owner} />
            <TextInput style={styles.input} placeholder="Flat No" value={newNoc.flat_no_name} />
            <TextInput style={styles.input} placeholder="Address" value={newNoc.address} />

            {/* CKEditor inside WebView */}
            <View style={{ height: 300, width: '100%', marginBottom: 10 }}>
              <WebView
                originWhitelist={['*']}
                source={{
                  html: `
                  <html>
                  <head>
                    <script src="https://cdn.ckeditor.com/4.20.1/standard/ckeditor.js"></script>
                  </head>
                  <body>
                    <textarea id="editor">${newNoc.noc_content || ''}</textarea>
                    <script>
                      CKEDITOR.replace('editor');
                      CKEDITOR.instances.editor.on('change', function() {
                        window.ReactNativeWebView.postMessage(CKEDITOR.instances.editor.getData());
                      });
                    </script>
                  </body>
                  </html>
                  `,
                }}
                javaScriptEnabled
                onMessage={(event) => {
                  setNewNoc({ ...newNoc, noc_content: event.nativeEvent.data });
                }}
              />
            </View>

            <Button mode="contained">Save</Button>
            <Button mode="outlined" onPress={closeModal}>Close</Button>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'left', marginBottom: 10 },
  nocText: { fontSize: 18, fontWeight: 'bold' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, minHeight: 40, marginBottom: 10 },
  actionColumn: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // Adjust space between icons
  },
  iconButton: {
    marginHorizontal: -6, // Adjust spacing between buttons
    padding: 0,
  },
});


export default NocScreen;
