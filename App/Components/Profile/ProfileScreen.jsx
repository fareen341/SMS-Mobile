import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react'
const ProfileScreen = () => {
  return (
<>

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Details</Text>
      <Button title="Go back to Dashboard" onPress={() => navigation.goBack()} />

      {/* Table in Profile Screen */}
      <View style={styles.container}>
        {/* Box 1 */}
        <View style={[styles.box, styles.box1]}>
          <Text style={styles.text}>Box 1</Text>
        </View>

        {/* Box 2 */}
        <View style={[styles.box, styles.box2]}>
          <Text style={styles.text}>Box 2</Text>
        </View>
      </View>

    </View>
</>
  )
}

export default ProfileScreen

// const styles = StyleSheet.create({})
const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,  // Ensures full screen height
      justifyContent: 'flex-start',  // Align content to top of screen
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      paddingTop: 20,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      width: '100%',
    },
    box: {
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      backgroundColor: '#8080ff',
      // Using CSS properties for web
      backgroundImage: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
      borderRadius: 10,
    },
    box2: {
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      backgroundColor: '#8080ff',
      backgroundImage: 'linear-gradient(45deg, #6a11cb, #2575fc)',
      borderRadius: 10,
    },
    text: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    profileBox: {
      flexDirection: 'row', // Aligns items horizontally (side by side)
      alignItems: 'center', // Vertically centers the content within the box
      backgroundColor: '#fff',
      width: '90%', // Takes 90% of the width of the container to give space on both sides
      padding: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      marginTop: 10, // Adds a little space between the two boxes and the profile box
    },
    profileIcon: {
      marginRight: 10, // Space between the icon and the name
    },
    profileName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
  
  });
  