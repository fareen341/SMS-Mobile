import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { List } from 'react-native-paper';

const MemberScreen = () => {
  const [expanded, setExpanded] = useState(null);

  const handlePress = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const listData = [
    { title: 'Item 1', content: 'This is the detailed content for Item 1.' },
    { title: 'Item 2', content: 'Learn more about Item 2 here.' },
    { title: 'Item 3', content: 'This section contains details about Item 3.' },
    { title: 'Item 4', content: 'Item 4 provides insights into the topic.' },
    { title: 'Item 5', content: 'Detailed explanation for Item 5 is here.' },
    { title: 'Item 6', content: 'This is all about Item 6 and its features.' },
  ];

  return (
    <View style={styles.container}>
      {listData.map((item, index) => (
        <List.Accordion
          key={index}
          title={item.title}
          expanded={expanded === index}
          onPress={() => handlePress(index)}
          style={styles.accordion}
        >
          <View style={styles.content}>
            <Text>{item.content}</Text>
          </View>
          {/* Add a View with margin below the content */}
          <View style={styles.spacingBelowContent} />
        </List.Accordion>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  accordion: {
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 16,
    backgroundColor: '#e8f4f8',
  },
  spacingBelowContent: {
    marginBottom: 16, // Space below the content
  },
});

export default MemberScreen;
