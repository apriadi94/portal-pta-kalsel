import React, { useContext, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ChatContext } from '../../provider/ChatProvider';
import SendInputComponent from './SendInputComponent';

const ChatContentScreen = ({ navigation, route }) => {
    const { socket } = useContext(ChatContext)
    const { to, room } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: to[0].name
        })

        if(room.id){
            socket.emit('REQUEST_MESSAGE', room.id)
        }
    }, [])
    return(
        <View style={{flex: 1}}>
            <ScrollView>

            </ScrollView>
            <SendInputComponent room={room} to={to}/>
        </View>
    )
}

export default ChatContentScreen