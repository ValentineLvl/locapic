import React, {useEffect, useState} from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Button, ListItem, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';

import socketIOClient from "socket.io-client";
var socket = socketIOClient("http://192.168.0.38:3000");

function ChatScreen(props) {

  const [currentMessage, setCurrentMessage] = useState("");
  const [listMessage, setListMessage] = useState([]);

  const messageInput = React.createRef();

  useEffect(() => {
   
    socket.on('sendMessageToAll', (newMessageData)=> {
      setListMessage([...listMessage, newMessageData]);
    });
    
  }, [listMessage]);

var messages = listMessage.map((e, i) => {
  
  var str = e.message;
  var newStr = str.replace(/fuck[a-z]*/gi, "\u2022\u2022\u2022").replace(/:\)/g, "\u263A").replace(/:\(/g, "\u2639").replace(/:p/gi, "\uD83D\uDE1B ");

  return (
    
  <ListItem key={i}>
    <ListItem.Content>
      <ListItem.Title>{newStr}</ListItem.Title>
      <ListItem.Subtitle>{e.pseudo}</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
          
  )
})

    return (
        <View style={{flex:1}}>
       
        <ScrollView style={{flex:1, marginTop: 50}}>
          {messages}
        </ScrollView>
  
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Input
                containerStyle = {{marginBottom: 5}}
                placeholder='Your message'
                onChangeText={(val) => setCurrentMessage(val)}
                ref={messageInput}
            />
            <Button
                icon={
                    <Icon
                    name="envelope-o"
                    size={20}
                    color="#ffffff"
                    />
                } 
                title="Send"
                buttonStyle={{backgroundColor: "#eb4d4b"}}
                type="solid"
                onPress={()=> {socket.emit("sendMessage", {message:currentMessage, pseudo:props.pseudo}); messageInput.current.clear()} }
            />
        </KeyboardAvoidingView>
          
      </View>
    );
   }

   function mapStateToProps(state) {
    return { pseudo: state.pseudo}
    }

    export default connect (
      mapStateToProps, 
      null
  )(ChatScreen);