



import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { DataTable, Text, TextInput, IconButton } from "react-native-paper";

const data = [
  { id: 101, product: "Laptop", price: "1200 USD" },
  { id: 102, product: "Smartphone", price: "800 USD" },
  { id: 103, product: "Tablet", price: "500 USD" },
  { id: 104, product: "Smartwatch", price: "250 USD" },
  { id: 105, product: "Headphones", price: "150 USD" },
  { id: 106, product: "Monitor", price: "300 USD" },
  { id: 107, product: "Keyboard", price: "50 USD" },
  { id: 108, product: "Mouse", price: "40 USD" },
  { id: 109, product: "Printer", price: "200 USD" },
  { id: 110, product: "Speakers", price: "180 USD" }
]

const rowsPerPage = 10; // Set rows per page to 10

const NoticeBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  // Filter data based on the search query, checking all columns
  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Paginate filtered data
  const paginatedData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <TextInput
        mode="outlined"
        placeholder="Search for product list"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      
        left={<TextInput.Icon icon="magnify" />}
      />

      {/* 🏠 Header with Filter */}
      <View style={styles.header}>
        <Text style={styles.title}>WORKROOM</Text>
        {/* <IconButton icon="filter-outline" size={24} /> */}
      </View>

      {/* 🔄 Tabs */}
      {/* <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>Products</Text>
        <Text style={styles.tab}>Billings</Text>
        <Text style={styles.tab}>History</Text>
      </View> */}

      {/* 📊 Data Table with Horizontal Scroll */}
      <ScrollView horizontal>
        <DataTable style={styles.table}>
          {/* 📌 Table Header */}
          <DataTable.Header style={styles.headerRow}>
            <DataTable.Title textStyle={styles.columnHeader}>Product ID</DataTable.Title>
            <DataTable.Title textStyle={styles.columnHeader}>Name</DataTable.Title>
            <DataTable.Title textStyle={styles.columnHeader}>Warehouse</DataTable.Title>
            {/* <DataTable.Title textStyle={styles.columnHeader}>Quantity left</DataTable.Title> */}
            <DataTable.Title textStyle={styles.columnHeader}>Action</DataTable.Title>
            {/* <DataTable.Title textStyle={styles.columnHeader}>Action</DataTable.Title> */}
            {/* <DataTable.Title textStyle={styles.columnHeader}>Action</DataTable.Title> */}
        
          </DataTable.Header>

          {/* 📌 Table Rows */}
          {paginatedData.map((item, index) => (
            <DataTable.Row key={index} style={styles.row}>
              <DataTable.Cell textStyle={styles.cell}>{item.id}</DataTable.Cell>
              <DataTable.Cell textStyle={styles.cell}>{item.product}</DataTable.Cell>
              <DataTable.Cell textStyle={styles.cell}>{item.price}</DataTable.Cell>
              <DataTable.Cell textStyle={styles.cell}>Action</DataTable.Cell>
        
            </DataTable.Row>
          ))}

          {/* 📌 Pagination */}
          <DataTable.Pagination
            page={currentPage}
            numberOfPages={Math.ceil(filteredData.length / rowsPerPage)}
            onPageChange={handlePageChange}
            label={`${currentPage * rowsPerPage + 1}-${Math.min((currentPage + 1) * rowsPerPage, filteredData.length)} of ${filteredData.length}`}
            style={styles.pagination}
          />
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  
  tab: {
    fontSize: 14,
    padding: 8,
    marginRight: 10,
    color: "#666",
  },
  activeTab: {
    fontWeight: "bold",
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  table: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    
    
  },
  headerRow: {
    backgroundColor: "#f0f0f0",
    gap:47,
    justifyContent:"space-between"
  },
  columnHeader: {
    fontWeight: "bold",
    color: "#333",
    // gap:10

  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
   justifyContent:"flex-end"
  },
  cell: {
    fontSize: 14,
    color: "#444",
  },
  pagination: {
    alignSelf: "right",
    marginVertical: 10,
  },
});

export default NoticeBoard;


