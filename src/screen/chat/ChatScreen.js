import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { ChatContext } from '../../provider/ChatProvider'
import backgroundChat from '../../assets/chat-background.png'

const ChatScreen = ({ navigation }) => {
    const { socket } = useContext(ChatContext)
    const [conversation, setConversation] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('ChatContactScreen')}>
                  <View style={{ marginRight : 10 }}>
                    <Text>+</Text>
                  </View>
                </TouchableOpacity>
              ),
        })

        socket.emit('REQUEST_CONVERSATION')
        socket.on('CONVERSATION_SENT', data => {
          setConversation(data)
          setLoading(false)
        })
    }, [])
    return(
      <ImageBackground source={backgroundChat} style={{flex: 1}}>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{marginTop: 10, marginHorizontal : 10}}>
          {conversation.map((list, index) =>
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('ChatContentScreen', { 
                    to: [{ name: list.room.name }],
                    room: { id: list.roomId, name: list.room.name, image: list.room.image }
                  })
                }}
                
                >
                <View style={{backgroundColor: '#fff', marginBottom: 10, borderRadius : 10}}>
                  <View
                    style={{
                      marginHorizontal: 10,
                      marginVertical: 10,
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={{uri: list.room.image}}
                      style={{width: 60, height: 60, borderRadius: 30}}
                    />
                    <View>
                        <Text style={{fontSize: 25, marginLeft: 20}}>
                        {list.room.name}
                        </Text>
                        <View style={{flexDirection : 'row'}}>
                          <Text numberOfLines={1} style={{marginLeft : 20, marginTop : 5, width : 270}}>
                              {list.lastMessage}
                          </Text>
                          {
                            list.unRead > 0 ?
                            <View style={{width : 20, backgroundColor : 'pink', borderRadius : 10, justifyContent : 'center', alignItems : 'center'}}>
                            <Text>
                              {list.unRead}
                            </Text>
                          </View> : null
                          }
                        </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
          )}
        </View>
      )}
    </ImageBackground>
    )
}

export default ChatScreen