import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ChatContext } from '../../provider/ChatProvider'
import backgroundChat from '../../assets/chat-background.png'

const ChatScreen = ({ navigation }) => {
    const { socket } = useContext(ChatContext)
    const [conversation, setConversation] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [headerShown, setheaderShown] = useState(true)

    useEffect(() => {
        navigation.setOptions({
          headerShown,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <View style={{ marginLeft : 25 }}>
                    <Icon name="navicon" color="gray" size={18} />
                  </View>
              </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => navigation.navigate('ChatContactScreen')}>
                    <View style={{ marginRight : 20 }}>
                      <Icon name="plus" color="gray" size={18} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setheaderShown(false)}>
                    <View style={{ marginRight : 10 }}>
                      <Icon name="search" color="gray" size={18} />
                    </View>
                </TouchableOpacity>
                </View>
              ),
        })

        socket.emit('REQUEST_CONVERSATION')
        socket.on('CONVERSATION_SENT', data => {
          if(search !== ''){
            const dataSearch = data.filter(item => item.room.name.toLowerCase().includes(search.toLowerCase()))
            setConversation(dataSearch)
          }else{
            setConversation(data)
          }
          setLoading(false)
        })
    }, [headerShown, search])
    return(
      <ImageBackground source={backgroundChat} style={{flex: 1}}>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        // eslint-disable-next-line react-native/no-inline-styles
        <React.Fragment>
          {
            !headerShown ?
            <View style={{ backgroundColor: 'white' }}>
              <View style={{marginHorizontal : 10, flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => {
                  setheaderShown(true)
                  setSearch('')
                }} style={{ justifyContent: 'center', alignItems: 'center', marginRight : 20, marginTop: -5 }}>
                  <Icon name="arrow-left" size={20} />
                </TouchableOpacity>
                <View style={{ flex: 1, borderBottomColor: 'gray' }}>
                  <TextInput style={{width: '100%'}} value={search} onChangeText={text => setSearch(text)} placeholder='Cari'/>
                </View>
              </View>
            </View> : null
          }
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
        </React.Fragment>
      )}
    </ImageBackground>
    )
}

export default ChatScreen