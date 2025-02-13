import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Alert, ActivityIndicator
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://society.zacoinfotech.com/api/login/', {
        username,
        password,
      });

      const result = response.data;

      if (response.status === 200) {
        await AsyncStorage.setItem('authToken', response.data.auth_token);
        Alert.alert('Login Successful', `Welcome ${response.data.auth_token}`);
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Login Failed', result.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server', error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formBox}>
        <View style={styles.headerForm}>
          <FontAwesome name="user-circle" size={100} color="#007bff" />
        </View>

        <View style={styles.bodyForm}>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="user" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginText}>LOGIN</Text>
            )}
          </TouchableOpacity>

          <View style={styles.message}>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.social}>
            <TouchableOpacity>
              <FontAwesome name="facebook" size={35} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="twitter-square" size={35} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="google" size={35} color="#DB4437" />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(135, 206, 235, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    width: 350,
    backgroundColor: 'grey',
    padding: 20,
    borderRadius: 10,
    opacity: 0.9,
  },
  headerForm: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bodyForm: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 15,
  },
  forgotPassword: {
    color: '#007bff',
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default Login;