import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ChatScreen from './screens/ChatScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
 const Tab = createBottomTabNavigator();

 function BottomNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
    
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'Map') {
          iconName = 'ios-navigate';
        } else if (route.name === 'Chat') {
          iconName = 'ios-chatbubbles';
        }
        return <Ionicons name={iconName} size={25} color={color} />;
      },
      tabBarActiveTintColor: "#eb4d4b",
    tabBarInactiveTintColor: "#FFFFFF",
    tabBarStyle: {backgroundColor:"#130f40"},
    headerShown: false
    }
    
    )}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
  }

export default function App() {
  return (
    <NavigationContainer >
       <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}

