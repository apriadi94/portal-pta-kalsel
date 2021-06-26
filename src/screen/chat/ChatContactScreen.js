import React, { useState, useContext, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../provider/AuthProvider'
import backgroundChat from '../../assets/chat-background.png'

const ChatContactScreen = ({ navigation }) => {
    const { baseUrl, user } = useContext(AuthContext)
    const [contact, setContact] = useState([])
    const [loading, setLoading] = useState(true)
    const [headerShown, setheaderShown] = useState(true)
    const [search, setSearch] = useState('')

    const getContact = useCallback(async () => {
      await axios({
          method: 'get',
          url: `${baseUrl}/api/user`,
          headers: {
              Accept: 'aplication/json'
          }
      }).then(res => {
        if(search !== ''){
          setContact(res.data.data.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
        }else{
          setContact(res.data.data)
        }
      }).catch(err => {
          console.log(err)
      })
      setLoading(false)
  }, [search])

    useEffect(() => {
        navigation.setOptions({
          headerShown,
          headerRight: () => (
              <TouchableOpacity onPress={() => setheaderShown(false)}>
                  <View style={{ marginRight : 10 }}>
                    <Icon name="search" color="gray" size={18} />
                  </View>
              </TouchableOpacity>
          ),
        })
        getContact()
    }, [headerShown, getContact])
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
          <View style={{marginTop: 10, marginHorizontal : 20}}>
          {contact.filter(item => item.id !== user.idForUser).map((list, index) =>
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('ChatContentScreen', { 
                    to: [{ id: list.id, uid: list.uid, name: list.name, profilePicture: list.profilePicture }],
                    room: { id: null, name: list.name, image: list.profilePicture }
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
                      source={{uri: list.profilePicture}}
                      style={{width: 60, height: 60, borderRadius: 30}}
                    />
                    <View>
                        <Text style={{fontSize: 25, marginLeft: 20}}>
                        {list.name}
                        </Text>
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

export default ChatContactScreen