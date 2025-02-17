import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogoutScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const logout = async () => {
      try {
        // Clear auth token
        await AsyncStorage.removeItem('authToken');
        
        // Debugging: Confirm token removal
        const token = await AsyncStorage.getItem('authToken');
        console.log('Token after removal:', token);

        // Navigate to Login screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } catch (error) {
        Alert.alert('Logout Error', error.message);
        console.error('Logout failed:', error);
      }
    };

    logout();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logging out...</Text>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
};

export default LogoutScreen;
