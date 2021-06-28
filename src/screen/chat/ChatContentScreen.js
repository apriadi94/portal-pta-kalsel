import React, { useContext, useEffect, useState, useRef } from 'react'
import { View, Text, ScrollView, Keyboard, ImageBackground, Image, Dimensions } from 'react-native'
import { AuthContext } from '../../provider/AuthProvider';
import { ChatContext } from '../../provider/ChatProvider';
import SendInputComponent from './SendInputComponent';
import backgroundChat from '../../assets/chat-background.png'


const ChatContentScreen = ({ navigation, route }) => {
    const { baseUrl, user, getUnreadMessage } = useContext(AuthContext)
    const { socket } = useContext(ChatContext)
    const { to, room } = route.params;
    const [roomId, setRoomid] = useState(room.id)
    const [chat, setChat] = useState([])
    const [loadingChat, setLoadingChat] = useState(true)
    const [OnPageSearch, setOnPageSearch] = useState(null)
    const [OnIndexSerach, setOnIndexSearch] = useState(0)
    const [isTyping, setIsTyping] = useState(false)

    const scrollViewRef = useRef();

    const screenWidth = Math.round(Dimensions.get('window').width);  

    useEffect(() => {
        navigation.setOptions({
            title: isTyping? 'sedang mengetik' : to[0].name
        })

        socket.emit('REQUEST_MESSAGE', ({ roomId, to }))

        socket.on('MESSAGE_SENT', (message, resRoomId) => {
            setChat(message)
            setRoomid(resRoomId)
            socket.emit('READ_MESSAGE', resRoomId)
            getUnreadMessage(user.idForUser)
            setLoadingChat(false)
        })

        socket.on('TYPING', (status) => {
            setIsTyping(status)
        })

        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);

        return(() => {
            socket.removeAllListeners("MESSAGE_SENT");
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        })
    }, [isTyping])


    const _keyboardDidShow = () => scrollViewRef.current.scrollToEnd({animated: true});

    return(
           <ImageBackground source={backgroundChat} style={{flex : 1}}>
                <ScrollView
                        ref={scrollViewRef}
                        onContentSizeChange={() => {
                            scrollViewRef.current.scrollToEnd({animated: true})
                        }}
                        >
                    {
                        loadingChat ? <View><Text>Loading...</Text></View> :
                        <View style={{flex : 1, marginTop : 10, marginHorizontal : 10, marginBottom : 10}}>
                            {
                                chat.map((list, index) =>
                                        <View key={index} style={{marginTop : 10, alignItems : list.isFromSelf ? 'flex-end' : 'flex-start'}}>
                                                <View style={{backgroundColor : list.id === OnPageSearch ? 'white' : 'rgba(76, 175, 80, 0)', borderRadius : 10}}>
                                                    <View style={{backgroundColor : list.isFromSelf ? '#80ffaa' : '#b3daff', borderRadius : 10, marginHorizontal : 10, marginVertical : 10}}>
                                                        <View style={{marginTop : 5, marginLeft : 10, marginRight : 10}}>
                                                            {
                                                                list.type === 'TEXT' ?
                                                                <React.Fragment>
                                                                    <Text style={{fontSize : 14}}>{list.content}</Text>
                                                                    <Text style={{fontSize : 12, color: 'gray', marginTop: 2, textAlign: 'right', marginBottom : 5}}>{list.jam}</Text>                                                  
                                                                </React.Fragment> :
                                                                <React.Fragment>
                                                                    <Image source={{ uri : `${baseUrl}/${list.url}`}} style={{ width: list.width / 7, height: list.height / 7 }} resizeMode="contain"/>
                                                                    <Text style={{fontSize : 12, color: 'gray', marginTop: 2, textAlign: 'right', marginBottom : 5}}>{list.jam}</Text>                                                  
                                                                </React.Fragment>
                                                            }
                                                            </View>
                                                    </View>
                                                </View>
                                        </View>
                                )
                            }
                            </View>
                    }
                    </ScrollView>
                    <SendInputComponent scrollViewRef={scrollViewRef} roomId={roomId} to={to}/>
            </ImageBackground>
    )
}

export default ChatContentScreen