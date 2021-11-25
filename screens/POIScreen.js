import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { ListItem } from 'react-native-elements';
import {connect} from 'react-redux';


function POIScreen(props) {

var listPOI = props.POI.map((POI, i) => {
    return (
        <ListItem key={i}
        onPress = {() => props.onDeletePOI(POI)}
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