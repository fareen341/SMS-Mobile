import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Dasgboard Screen
function DashboardScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Dashboard Screen</Text>
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate('Notifications')}
      />
    </View>
  );
}

// Notifications Screen
function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Notifications Screen</Text>
      <Button title="Go back dashboard" onPress={() => navigation.goBack()} />
    </View>
  );
}

// Drawer Navigator
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
