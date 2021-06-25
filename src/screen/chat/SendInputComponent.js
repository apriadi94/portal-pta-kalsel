import React, { useContext, useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { ChatContext } from '../../provider/ChatProvider'

const SendInputComponent = ({ roomId, to }) => {
    const { socket } = useContext(ChatContext)
    const [message, setMessage] = useState('')
  
    const sendChat = () => {
      socket.emit('STORE_MESSAGE_CHAT', { roomId, message, type : 'TEXT', to })
      setMessage('')
    }

    return(
        <View style={{justifyContent : 'flex-end'}}>
               <View style={{flexDirection : 'row'}}>
                    <View style={{flex : 1, marginHorizontal : 10, backgroundColor : 'white', height : 40, marginBottom : 10, borderRadius : 10}}>
                            <TextInput style={{color : 'black', fontSize : 18, marginLeft : 10}} value={message} onChangeText={(text) => setMessage(text)}/>
                    </View>
                    <TouchableOpacity onPress={sendChat} style={{backgroundColor : 'green', width : 40, marginBottom : 10, marginRight : 5, borderRadius : 20}}>
                        <View style={{backgroundColor : 'green', width : 50, marginBottom : 5, marginRight : 5, borderRadius : 20}}>

                        </View>
                    </TouchableOpacity>
               </View>
           </View>
    )
}

export default SendInputComponent