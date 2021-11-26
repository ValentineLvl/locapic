import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { ListItem } from 'react-native-elements';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function POIScreen(props) {

const handleDelete = (POI) => {
    var listPOI = props.POI.filter((e) => e.latitude != POI.latitude && e.longitute != POI.longitude)
    props.onDeletePOI(listPOI)
    AsyncStorage.setItem("POI", JSON.stringify(listPOI));
}

//  useEffect(() => { 
//     AsyncStorage.setItem("listPOI", JSON.stringify(props.POI));
//   }, [props.POI]);

var listPOI = props.POI.map((POI, i) => {
    return (
        <ListItem key={i}
        onPress = {() => handleDelete(POI)}
        >
        <ListItem.Content>
            <ListItem.Title>Point d'intérêt : {POI.titre} </ListItem.Title>
            <ListItem.Subtitle>Description : {POI.description} </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
    );
})

return (

<View style={{flex : 1}}>

<ScrollView style={{flex:1, marginTop: 50}}>
   { listPOI }
</ScrollView>

</View>

)

}

function mapStateToProps(state) {
    return { POI: state.listPOI}
    }

function mapDispatchToProps(dispatch) {
    return {
        onDeletePOI: function(POI) { 
        dispatch( {type: 'deletePOI', POI: POI }) 
        }
    }
    }
  
  export default connect(
      mapStateToProps, mapDispatchToProps
  )(POIScreen);