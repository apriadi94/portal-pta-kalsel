import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ChatContext } from '../../provider/ChatProvider';
import SendInputComponent from './SendInputComponent';

const ChatContentScreen = ({ navigation, route }) => {
    const { socket } = useContext(ChatContext)
    const { to, room } = route.params;
    const [roomId, setRoomid] = useState(room.id)
    const [chat, setChat] = useState([])
    const [loadingChat, setLoadingChat] = useState(true)
    const [OnPageSearch, setOnPageSearch] = useState(null)
    const [OnIndexSerach, setOnIndexSearch] = useState(0)

    useEffect(() => {
        navigation.setOptions({
            title: to[0].name
        })

        socket.emit('REQUEST_MESSAGE', ({ roomId, to }))

        socket.on('MESSAGE_SENT', (message, resRoomId) => {
            setChat(message)
            setRoomid(resRoomId)
            setLoadingChat(false)
        })
    }, [])
    return(
        <View style={{flex: 1}}>
            <ScrollView>
           {
               loadingChat ? <View><Text>Loading...</Text></View> :
               <View style={{flex : 1, marginTop : 10, marginHorizontal : 10, marginBottom : 10}}>
                   {
                       chat.map((list, index) =>
                            <View key={index} style={{marginTop : 10, alignItems : list.isFromSelf ? 'flex-end' : 'flex-start'}}>
                                    <View style={{backgroundColor : list.id === OnPageSearch ? 'white' : 'rgba(76, 175, 80, 0)', borderRadius : 10}}>
                                        <View style={{backgroundColor : list.isFromSelf ? '#80ffaa' : '#b3daff', height : 50, borderRadius : 10, marginHorizontal : 10, marginVertical : 10}}>
                                            <View style={{marginTop : 5, marginLeft : 10, marginRight : 10}}>
                                                <Text style={{fontSize : 14}}>{list.content}</Text>
                                            </View>
                                        </View>
                                    </View>
                            </View>
                       )
                   }
                </View>
           }
           </ScrollView>
            <SendInputComponent roomId={roomId} to={to}/>
        </View>
    )
}

export default ChatContentScreen