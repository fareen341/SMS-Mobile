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
        title="Go to Personal Details"
        onPress={() => navigation.navigate('Personal')}
      />
    </View>
  );
}

// Profile Screen
function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Details</Text>
      <Button title="Go back dashboard" onPress={() => navigation.goBack()} />
    </View>
  );
}

// House help Screen
function HouseHelpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>House Help Details</Text>
      <Button title="Go back dashboard" onPress={() => navigation.goBack()} />
    </View>
  );
}


// Tenant Screen
function TenantScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tenant Details</Text>
      <Button title="Go back dashboard" onPress={() => navigation.goBack()} />
    </View>
  );
}

// Meeting Screen
function MeetingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Meeting Details</Text>
      <Button title="Go back dashboard" onPress={() => navigation.goBack()} />
    </View>
  );
}


// Office Screen
function OfficeBearerScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Office Bearer Details</Text>
      <Button title="Go back dashboard" onPress={() => navigation.goBack()} />
    </View>
  );
}


// Noc Screen
function NocScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Noc Details</Text>
      <Button title="Go back dashboard" onPress={() => navigation.goBack()} />
    </View>
  );
}


// Complain Screen
function ComplainsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Complains</Text>
      <Button title="Go back dashboard" onPress={() => navigation.goBack()} />
    </View>
  );
}


// Personal Details Change Request Screen
function PersonalDetailScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Personal Details Change Request</Text>
      <Button title="Go back dashboard" onPress={() => navigation.goBack()} />
    </View>
  );
}


// Flat Repair Request Screen
function FlatRepairRequestScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Flat Repair Requests</Text>
      <Button title="Go back dashboard" onPress={() => navigation.goBack()} />
    </View>
  );
}


// Suggestions Request Screen
function SuggestionsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Suggestions Details</Text>
      <Button title="Go back dashboard" onPress={() => navigation.goBack()} />
    </View>
  );
}


// Visitor Request Screen
function VisitorRecordsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Office Bearer Details</Text>
      <Button title="Go back dashboard" onPress={() => navigation.goBack()} />
    </View>
  );
}

// Amenity Request Screen
function AmenityScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Amenity</Text>
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
        <Drawer.Screen name="HouseHelp" component={HouseHelpScreen} />
        <Drawer.Screen name="Tenant" component={TenantScreen} />
        <Drawer.Screen name="Meeting" component={MeetingScreen} />
        <Drawer.Screen name="OfficeBearer" component={OfficeBearerScreen} />
        <Drawer.Screen name="Noc" component={NocScreen} />
        <Drawer.Screen name="Complain" component={ComplainsScreen} />
        <Drawer.Screen name="Personal Detail Change Request" component={PersonalDetailScreen} />
        <Drawer.Screen name="Flat Repair Request" component={FlatRepairRequestScreen} />
        <Drawer.Screen name="Suggestions" component={SuggestionsScreen} />
        <Drawer.Screen name="Visitor Records" component={VisitorRecordsScreen} />
        <Drawer.Screen name="Amenity" component={AmenityScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
