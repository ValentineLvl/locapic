import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Icon } from '@expo/vector-icons';

const image = { uri: "./home.jpg" };

export default function HomeScreen(props) {
    return (

        <ImageBackground source={require('../home.jpg')} resizeMode="cover" style={styles.image}>
            <Input placeholder='Valentine'
            leftIcon={<Icon name= 'person' color='#eb4d4b' size={24} />}
            />
            <Button icon={{ type: 'Ionicons', name: 'arrow-forward', color:'#eb4d4b' }}title="Go to Map"
            onPress={() => props.navigation.navigate('BottomNavigator',{screen : 'Map'})}
            />
        </ImageBackground>
     
    );
   }

   const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent:'center'
    },
    image: {
        flex: 1,
        justifyContent: "center"
      },
  });
  