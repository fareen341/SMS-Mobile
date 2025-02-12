import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { DataTable, Button, IconButton } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';


const NocScreen = () => {
  const [nocList, setNocList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addNocModalVisible, setAddNocModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const [newNoc, setNewNoc] = useState({
    noc_type: '',
    flat_owner: '',
    flat_no: '',
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
    axios.get('https://society.zacoinfotech.com/api/noc/', {
      headers: { 'Authorization': `Token e0ba9a7bd3574f04d91315f4452deaa6262880df` },
    })
      .then((response) => setNocList(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setNewNoc({ ...item });
    setEditModalVisible(true);
  };

  const handleAddNoc = () => {
    setNewNoc({ noc_type: '', flat_owner: '', flat_no: '', address: '', noc_content: '' });
    setAddNocModalVisible(true);
  };

  const handleNocTypeChange = (value) => {
    setNewNoc({ ...newNoc, noc_type: value, noc_content: generateNocContent(value) });
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

  // const filteredData = nocList.filter((item) =>
  //   item.flat_owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   item.flat_no.includes(searchQuery)
  // );

  const filteredData = nocList.filter((item) =>
    (typeof item.flat_owner === 'string' && item.flat_owner.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof item.flat_no === 'string' && item.flat_no.toLowerCase().includes(searchQuery.toLowerCase()))
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
          <DataTable.Title>Flat Owner</DataTable.Title>
          <DataTable.Title>Flat No</DataTable.Title>
          <DataTable.Title>NOC Type</DataTable.Title>
        </DataTable.Header>

        {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell style={styles.actionColumn}>
              <IconButton icon="eye" size={20} onPress={() => handleViewClick(item)} />
              <IconButton icon="pencil" size={20} onPress={() => handleEditClick(item)} />
            </DataTable.Cell>
            <DataTable.Cell>{item.flat_owner}</DataTable.Cell>
            <DataTable.Cell>{item.flat_no}</DataTable.Cell>
            <DataTable.Cell>{item.noc_type}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(filteredData.length / rowsPerPage)}
          onPageChange={(newPage) => setPage(newPage)}
          label={`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, filteredData.length)} of ${filteredData.length}`}
        />
      </DataTable>

      {/* Add/Edit NOC Modal */}
      <Modal visible={addNocModalVisible || editModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
          <Dropdown
              style={styles.input}
              data={nocChoices}
              labelField="label"  // The field that contains the display text
              valueField="value"  // The field that contains the value
              placeholder="Select NOC Type"
              value={newNoc.noc_type}
              onChange={item => handleNocTypeChange(item.value)}
            />

            <TextInput style={styles.input} placeholder="Flat Owner" value={newNoc.flat_owner} />
            <TextInput style={styles.input} placeholder="Flat No" value={newNoc.flat_no} />
            <TextInput style={styles.input} placeholder="Address" value={newNoc.address} />
            <TextInput style={styles.input} placeholder="NOC Content" value={newNoc.noc_content} multiline />

            <Button mode="contained">Save</Button>
            <Button mode="outlined" onPress={() => setAddNocModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  nocText: { fontSize: 18, fontWeight: 'bold' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
  actionColumn: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, minHeight: 40, marginBottom: 10 },
});


export default NocScreen;
