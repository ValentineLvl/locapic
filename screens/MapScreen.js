import React, {useEffect, useState} from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import {Button, Overlay, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import { connect } from 'react-redux';

function MapScreen(props) {
    
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
        setCurrentLatitude(location.coords.latitude);
        setCurrentLongitude(location.coords.longitude);
      })
        }
  } askPermissions();
   }, []);

  //  useEffect(() => {
  //    setListPOI(props.POI)
  //  }, [props.POI]);

   var selectPOI = (e) => {
    if(addPOI){
    setAddPOI(false);
    setVisible(true);
    setTempPOI({ latitude: e.nativeEvent.coordinate.latitude, longitude:e.nativeEvent.coordinate.longitude } );
      }
     }

     var handleSubmit = () => {
        
        setListPOI([...listPOI, 
          {longitude: tempPOI.longitude, 
            latitude: tempPOI.latitude, 
            titre: titrePOI, 
            description: descPOI },
          ]);
        var sendPOI = {longitude: tempPOI.longitude, 
          latitude: tempPOI.latitude, 
          titre: titrePOI, 
          description: descPOI}
        setVisible(false);
        setTempPOI();
        setDescPOI();
        setTitrePOI();
        
        props.onSubmitListPOI(sendPOI); 

    }    
  
    var markerPOI = listPOI.map((POI, i) => {
        return <Marker key={i} pinColor="blue" 
        coordinate={{ latitude: POI.latitude, longitude: POI.longitude }}
          title={POI.titre}
          description={POI.description}
        />
      });

  var isDisabled = false;
  if(addPOI){
    isDisabled = true;
  }

    return (
        <View style={{flex : 1}}>

<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
     <Overlay 
        overlayStyle = {{width: '60%', justifyContent:'center'}}
        isVisible={visible} 
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
        type = 'solid'
    />
      </Overlay>
      </KeyboardAvoidingView>

        <MapView style={{flex : 1}}
        onPress={(e) => {selectPOI(e)}}
        initialRegion={{
          latitude: 48.866667,
          longitude: 2.333333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
       mapType ="terrain" 
      >
        
        <Marker
        coordinate={{latitude: currentLatitude.latitude, longitude: currentLongitude.longitude}}
        title="Hello"
        description="I am here"
        pinColor={'red'}
      />
        {markerPOI}   
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

     </View>
    );
   }

  // function mapStateToProps(state) {
  //   return { POI: state.listPOI}
  //   }

  function mapDispatchToProps(dispatch) {
    return {
      onSubmitListPOI: function(POI) { 
        dispatch( {type: 'savePOI', POI: POI }) 
      }
    }
  }
  
  export default connect (
    null, 
    mapDispatchToProps
)(MapScreen);