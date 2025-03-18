import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { List, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const MemberScreen = () => {
  const [expanded, setExpanded] = useState(null);
  const [subExpanded, setSubExpanded] = useState(null);
  const [nomineeExpanded, setNomineeExpanded] = useState(null); // Added state for nominee expansion
  const navigation = useNavigation();

  const handlePress = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleSubPress = (subIndex) => {
    setSubExpanded(subExpanded === subIndex ? null : subIndex);
  };

  const handleNomineePress = (nomineeIndex) => {
    setNomineeExpanded(nomineeExpanded === nomineeIndex ? null : nomineeIndex);
  };

  const listData = [
    { 
      title: 'Flat', 
      content: 'Flat Details',
      isFlat: true,
    },
    { 
      title: 'Members', 
      content: 'Members Details.',
      subItems: [
        { 
          title: 'Member 1', 
          details: 'Details about Member 1',
          nominees: [
            { title: 'Nominee 1', details: 'Details about Nominee 1' },
            { title: 'Nominee 2', details: 'Details about Nominee 2' },
          ],
        },
        { 
          title: 'Member 2', 
          details: 'Details about Member 2',
          nominees: [
            { title: 'Nominee 3', details: 'Details about Nominee 3' },
            { title: 'Nominee 4', details: 'Details about Nominee 4' },
          ],
        },
      ],
      isMember: true,
    },
    { title: 'Shares', content: 'Shares Details' },
    { title: 'Home Loan', content: 'Detailed explanation for Item 5 is here.' },
    { title: 'GST', content: 'This is all about Item 6 and its features.' },
    { title: 'Vehicle', content: 'This is all about Item 6 and its features.' },
  ];

  return (
    <ScrollView style={styles.container}>
      {listData.map((item, index) => (
        <View key={index} style={[styles.accordionWrapper, item.isFlat ? styles.flatAccordionWrapper : {}]}>
          {item.isFlat ? (
            <List.Accordion
              title="Flat"
              expanded={expanded === index}
              onPress={() => handlePress(index)}
              style={styles.flatAccordion}
            >
              <View style={styles.flatContent}>
                <Text style={styles.flatText}>{item.content}</Text>
                <Button mode="contained" onPress={() => navigation.navigate('Members')}>
                  Request Change Flat
                </Button>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.detailsRow}>
                  <Text style={styles.label}>Unit Area:</Text>
                  <Text style={styles.value}>1</Text>

                  <Text style={styles.label}>Unit Type:</Text>
                  <Text style={styles.value}>2</Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.label}>Unit Of Measurement:</Text>
                  <Text style={styles.value}>1</Text>

                  <Text style={styles.label}>Property Tax Number:</Text>
                  <Text style={styles.value}>12345</Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.label}>Electricity Connection Number:</Text>
                  <Text style={styles.value}>234</Text>

                  <Text style={styles.label}>Having Pet:</Text>
                  <Text style={styles.value}>No</Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.label}>Gas Connection Number:</Text>
                  <Text style={styles.value}>23456</Text>

                  <Text style={styles.label}>Water Connection Number:</Text>
                  <Text style={styles.value}>2345678</Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.label}>Flat Status:</Text>
                  <Text style={styles.value}>Empty</Text>
                </View>
              </View>
            </List.Accordion>
          ) : (
            <List.Accordion
              title={item.title}
              expanded={expanded === index}
              onPress={() => handlePress(index)}
              style={styles.accordion}
            >
              <View style={styles.content}>
                <View style={styles.contentRow}>
                  <Text>{item.content}</Text>
                  <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Members')}
                    style={styles.requestChangeButton}
                  >
                    Request Change ..
                  </Button>
                </View>
              </View>
              {item.subItems && item.subItems.map((subItem, subIndex) => (
                <List.Accordion
                  key={subIndex}
                  title={subItem.title}
                  expanded={subExpanded === subIndex}
                  onPress={() => handleSubPress(subIndex)}
                  style={[styles.subAccordion, { marginLeft: 0, paddingLeft: 0 }]}
                >
                  <View style={styles.detailsContainer}>
                    <View style={styles.detailsRow}>
                      <Text style={styles.label}>Unit Area:</Text>
                      <Text style={styles.value}>1</Text>

                      <Text style={styles.label}>Unit Type:</Text>
                      <Text style={styles.value}>2</Text>
                    </View>

                    <View style={styles.detailsRow}>
                      <Text style={styles.label}>Unit Of Measurement:</Text>
                      <Text style={styles.value}>1</Text>

                      <Text style={styles.label}>Property Tax Number:</Text>
                      <Text style={styles.value}>12345</Text>
                    </View>

                    <View style={styles.detailsRow}>
                      <Text style={styles.label}>Electricity Connection Number:</Text>
                      <Text style={styles.value}>234</Text>

                      <Text style={styles.label}>Having Pet:</Text>
                      <Text style={styles.value}>No</Text>
                    </View>

                    <View style={styles.detailsRow}>
                      <Text style={styles.label}>Gas Connection Number:</Text>
                      <Text style={styles.value}>23456</Text>

                      <Text style={styles.label}>Water Connection Number:</Text>
                      <Text style={styles.value}>2345678</Text>
                    </View>

                    <View style={styles.detailsRow}>
                      <Text style={styles.label}>Flat Status:</Text>
                      <Text style={styles.value}>Empty</Text>
                    </View>
                  </View>
                  <View style={[styles.subContent, { marginLeft: 0, paddingLeft: 0 }]}>
                    {subItem.nominees && subItem.nominees.map((nominee, nomineeIndex) => (
                      <List.Accordion
                        key={nomineeIndex}
                        title={nominee.title}
                        expanded={nomineeExpanded === nomineeIndex}
                        onPress={() => handleNomineePress(nomineeIndex)}
                        style={[styles.subAccordionNominee, { marginLeft: 0, paddingLeft: 0 }]}
                      >
                        <View style={styles.detailsContainer}>
                          <View style={styles.detailsRow}>
                            <Text style={styles.label}>Unit Area:</Text>
                            <Text style={styles.value}>1</Text>

                            <Text style={styles.label}>Unit Type:</Text>
                            <Text style={styles.value}>2</Text>
                          </View>

                          <View style={styles.detailsRow}>
                            <Text style={styles.label}>Unit Of Measurement:</Text>
                            <Text style={styles.value}>1</Text>

                            <Text style={styles.label}>Property Tax Number:</Text>
                            <Text style={styles.value}>12345</Text>
                          </View>

                          <View style={styles.detailsRow}>
                            <Text style={styles.label}>Electricity Connection Number:</Text>
                            <Text style={styles.value}>234</Text>

                            <Text style={styles.label}>Having Pet:</Text>
                            <Text style={styles.value}>No</Text>
                          </View>

                          <View style={styles.detailsRow}>
                            <Text style={styles.label}>Gas Connection Number:</Text>
                            <Text style={styles.value}>23456</Text>

                            <Text style={styles.label}>Water Connection Number:</Text>
                            <Text style={styles.value}>2345678</Text>
                          </View>

                          <View style={styles.detailsRow}>
                            <Text style={styles.label}>Flat Status:</Text>
                            <Text style={styles.value}>Empty</Text>
                          </View>
                        </View>
                      </List.Accordion>
                    ))}
                  </View>
                </List.Accordion>
              ))}
              <View style={styles.spacingBelowContent} />
            </List.Accordion>
          )}
        </View>
      ))}



      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  accordionWrapper: {
    marginHorizontal: 10,
  },
  flatAccordionWrapper: {
    // marginBottom: 20,
  },
  accordion: {
    marginBottom: 8,
    backgroundColor: '#d1e7fd',
    borderRadius: 8,
  },
  flatAccordion: {
    backgroundColor: '#d1e7fd',
    marginBottom: 8,
    borderRadius: 8,
  },
  flatContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e8f4f8',
  },
  flatText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    backgroundColor: '#e8f4f8',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestChangeButton: {
    marginLeft: 10,
  },
  subAccordion: {
    marginLeft: 6,
    backgroundColor: '#ecffe6',
    borderRadius: 8,
  },
  subAccordionNominee: {
    marginLeft: 6,
    backgroundColor: '#e6fffa',
    borderRadius: 8,
  },
  subContent: {
    padding: 12,
    // backgroundColor: '#cce5ff',
  },
  spacingBelowContent: {
    marginBottom: 16,
  },
  detailsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginTop: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wraps to new line if space is not enough
    justifyContent: 'flex-start',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    marginRight: 6, // Space between label and value
  },
  value: {
    fontSize: 14,
    color: '#555',
    marginRight: 20, // Space between key-value pairs
  },
});

export default MemberScreen;
