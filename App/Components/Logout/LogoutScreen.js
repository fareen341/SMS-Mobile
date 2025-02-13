import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogoutScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const logout = async () => {
      await AsyncStorage.removeItem('authToken'); // Remove token
      navigation.navigate('Login'); // Redirect to Login
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
