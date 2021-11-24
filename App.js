import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ChatScreen from './screens/ChatScreen';
import POIScreen from './screens/POIScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import pseudo from './reducers/pseudo';
import listPOI from './reducers/listPOI';

const store = createStore(combineReducers({pseudo, listPOI}));

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
        } else if (route.name === 'POI'){
          iconName = 'ios-location';
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
      <Tab.Screen name="POI" component={POIScreen} />
    </Tab.Navigator>
  );
  }

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer >
       <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      </Stack.Navigator>
  </NavigationContainer>
  </Provider>
  );
}

