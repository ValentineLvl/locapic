import React, {useState, useEffect} from 'react';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen(props) {

    const [pseudo, setPseudo] = useState('');
    const [pseudoSubmited, setPseudoSubmited] = useState(false);

    useEffect(() => {
      AsyncStorage.getItem("pseudo", function(error, data) {
        if (data) {
        setPseudo(data);
        setPseudoSubmited(true);
        props.onSubmitPseudo(data);
        // console.log(data); 
      }
      })
    },[]);

var inputPseudo;
if(!pseudoSubmited) {
  inputPseudo = (
  <Input 
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
/>)
} else {
  inputPseudo = <Text style={styles.text}>Welcome back {pseudo} !</Text>
}

    var handleSubmit = () => {
      props.onSubmitPseudo(pseudo);
      props.navigation.navigate('BottomNavigator',{screen : 'Map'});
      AsyncStorage.setItem("pseudo", pseudo);
      setPseudoSubmited(true);
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
    
    {/* {props.pseudo = inputPseudo ? 
    ()
    :} */}

    {inputPseudo}

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