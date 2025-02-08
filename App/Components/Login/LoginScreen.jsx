import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Image, Alert, 
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    Alert.alert('Login Successful', `Welcome ${email}`);
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
              value={email}
              onChangeText={setEmail}
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

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>LOGIN</Text>
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
    backgroundColor: 'rgba(135, 206, 235, 0.7)', // Skyblue transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    width: 350,
    backgroundColor: 'grey', // Grey color for form box
    padding: 20,
    borderRadius: 10,
    opacity: 0.9, // Slightly transparent form
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
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
