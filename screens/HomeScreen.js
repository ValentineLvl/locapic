import React, {useState, useEffect} from 'react';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen(props) {

    const [pseudo, setPseudo] = useState('');

    useEffect(() => {
      AsyncStorage.getItem("pseudo", function(error, data) {
        setPseudo(data);
        props.onSubmitPseudo(data);
        console.log(data);
      })
    },[]);

    var handleSubmit = () => {
      props.onSubmitPseudo(pseudo);
      props.navigation.navigate('BottomNavigator',{screen : 'Map'});
      AsyncStorage.setItem("pseudo", pseudo);
     // console.log(pseudo);
  }    

  //var handleDisconnect = () => {
    // props.onSubmitPseudo(pseudo);
    // props.navigation.navigate('BottomNavigator',{screen : 'Map'});
    //AsyncStorage.clear("pseudo", pseudo);
   // console.log(pseudo);
//}    


    return (
        <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>
    
    {props.pseudo ? 
    (<Text style={styles.text}>Welcome back {pseudo} !</Text>)
    :(<Input 
      containerStyle = {{marginBottom: 25, width: '70%'}}
      inputStyle={{marginLeft: 10}}
      placeholder='Valentine'
      value={pseudo}
         leftIcon={<Icon
         name='user'
         size={24}
         color='#eb4d4b'
     />}
     onChangeText={(val) => setPseudo(val)}
 />)}

     <Button icon={
         <Icon
         name="arrow-right"
         size={20}
         color="#eb4d4b"
         />
     }
     title="Go to Map"
     type="solid"
     onPress={() => handleSubmit()}
     />

    {/* <Button 
      title="Se déconnecter"
      type="clear"
      onPress={() => handleDisconnect()}
    /> */}
     
     </ImageBackground>
    );
   }

   const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent:'center'
    },
    text : {
      color: "white",
      fontSize: 20,
      marginBottom:15
    },
  });

  function mapStateToProps(state) {
    return { pseudo: state.pseudo}
    }

  function mapDispatchToProps(dispatch) {
    return {
      onSubmitPseudo: function(pseudo) { 
        dispatch( {type: 'savePseudo', pseudo: pseudo }) 
      }
    }
  }
  
  export default connect(
    mapStateToProps, 
      mapDispatchToProps
  )(HomeScreen);