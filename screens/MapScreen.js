import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import {Button, Overlay, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default function MapScreen() {
    
    //ma position
    const [currentLatitude, setCurrentLatitude] = useState({latitude:0});
    const [currentLongitude, setCurrentLongitude] = useState({longitude:0});
    
    //Etat du bouton
    const [addPOI, setAddPOI] = useState(false);
    //Etat liste des POI
    const [listPOI, setListPOI] = useState([]);

    //Etat de l'Overlay
    const [visible, setVisible] = useState(false);

    const [titrePOI, setTitrePOI] = useState();
    const [descPOI, setDescPOI] = useState();
    const [tempPOI, setTempPOI] = useState();
  
  useEffect(() => {
    async function askPermissions() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
      Location.watchPositionAsync({ distanceInterval: 2 }, 
        (location) => {
        setCurrentLatitude({latitude:location.coords.latitude});
        setCurrentLongitude({longitude:location.coords.longitude});
      })
        }
  } askPermissions();
   }, []);

   var selectPOI = (e) => {
    if(addPOI){
    setAddPOI(false);
    setVisible(true);
    setTempPOI([...listPOI, { latitude: e.nativeEvent.coordinate.latitude, longitude:e.nativeEvent.coordinate.longitude } ] );
      }
     }

     var handleSubmit = () => {
        setVisible(false);
        setListPOI([...listPOI, {longitude: tempPOI.longitude, latitude: tempPOI.latitude, titre: titrePOI, description: descPOI } ]);
     }    
  
  var POI = listPOI.map((e,i) => {
    return (<Marker
    coordinate={{latitude: e.latitude, longitude: e.longitude}}
    title={e.titre}
    description={e.description}
    key={i}
    pinColor={'blue'}
    draggable
/>)
  })

  var isDisabled = false;
  if(addPOI){
    isDisabled = true;
  }

//   const toggleOverlay = () => {
//     setVisible(!visible);
//   };

    return (
        <View style={{flex : 1}}>
        <MapView style={{flex : 1}}
        onPress={(e) => selectPOI(e)}
        initialRegion={{
          latitude: 48.866667,
          longitude: 2.333333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
       mapType ="terrain" 
      >
        {POI}
        <Marker
        coordinate={{latitude: currentLatitude.latitude, longitude: currentLongitude.longitude}}
        title="Hello"
        description="I am here"
        pinColor={'red'}
      />

     </MapView>
     
     <Button
        disabled={isDisabled}
        icon={
            <Icon
            name="map-pin"
            size={20}
            color="#ffffff"
            />
        } 
        title="Add POI"
        buttonStyle={{backgroundColor: "#eb4d4b"}}
        type="solid"
        onPress={() => setAddPOI(true)}
    />

<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
     <Overlay 
        overlayStyle = {{width: '60%', justifyContent:'center'}}
        visible={visible} 
        onBackdropPress={() => {setVisible(false)}}>
     <Input 
        containerStyle = {{ width: '90%'}}
        inputStyle={{marginLeft: 10}}
        placeholder='titre'
        onChangeText={(val) => setTitrePOI(val)}
    />
    <Input 
        containerStyle = {{ width: '90%'}}
        inputStyle={{marginLeft: 10}}
        placeholder='description'
        onChangeText={(val) => setDescPOI(val)}
    />
    <Button
        title="Valider"
        buttonStyle={{backgroundColor: "#eb4d4b"}}
        onPress={() => handleSubmit()}
    />
      </Overlay>
      </KeyboardAvoidingView>

     </View>
    );
   }

   const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent:'center'
    },
  });