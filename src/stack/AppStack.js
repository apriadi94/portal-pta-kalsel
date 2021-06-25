import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChatStack from './ChatStack';
import HomeStack from './HomeStack';
import InformasiStack from './InformasiStack';
import YoutubeStack from './YoutubeStack';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';

const Drawer = createDrawerNavigator();

const AppStack = () => {
      const { user, baseUrl, setUser, loadingAuth, setLoadingAuth } = useContext(AuthContext)
      const addUser = async () => {
            await axios({
                  method: 'POST',
                  url: `${baseUrl}/api/user`,
                  data: {
                        name: user._user.displayName ??  user._user.phoneNumber,
                        uid:  user._user.uid, 
                        profilePicture:  user._user.photoURL
                  },
                  headers:{
                        Accept: 'Aplication/json'
                  }
            }).then(res => {
                  setUser({...user, idForUser: res.data.data.id})
            }).catch(err => {
                  console.log(err)
            })
            setLoadingAuth(false)
      }

      useEffect(() => {
            addUser()
      }, [])

    return(
      loadingAuth ? 
        <View><Text>Loading...</Text></View> :
        <Drawer.Navigator>
              <Drawer.Screen name='Home' component={HomeStack}/>
              <Drawer.Screen name='Informasi' component={InformasiStack}/>
              <Drawer.Screen name='Chat' component={ChatStack}/>
              <Drawer.Screen name='Youtube' component={YoutubeStack}/>
        </Drawer.Navigator>
      )
}

export default AppStack