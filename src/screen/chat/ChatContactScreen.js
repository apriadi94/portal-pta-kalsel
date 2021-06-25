import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import axios from 'axios'
import { AuthContext } from '../../provider/AuthProvider'
import backgroundChat from '../../assets/chat-background.png'

const ChatContactScreen = ({ navigation }) => {
    const { baseUrl, user } = useContext(AuthContext)
    const [contact, setContact] = useState([])
    const [loading, setLoading] = useState(true)

    const getContact = async () => {
        await axios({
            method: 'get',
            url: `${baseUrl}/api/user`,
            headers: {
                Accept: 'aplication/json'
            }
        }).then(res => {
            setContact(res.data.data)
        }).catch(err => {
            console.log(err)
        })
        setLoading(false)
    }

    useEffect(() => {
        getContact()
    }, [])
    return(
        <ImageBackground source={backgroundChat} style={{flex: 1}}>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        // eslint-disable-next-line react-native/no-inline-styles
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
      )}
    </ImageBackground>
    )
}

export default ChatContactScreen