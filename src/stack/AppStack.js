import React, { useContext, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChatStack from './ChatStack';
import HomeStack from './HomeStack';
import InformasiStack from './InformasiStack';
import YoutubeStack from './YoutubeStack';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';

const Drawer = createDrawerNavigator();

const AppStack = () => {
      const { user, baseUrl, setUser } = useContext(AuthContext)
      const addUser = () => {
            axios({
                  method: 'POST',
                  url: `${baseUrl}/api/user`,
                  data: {
                        name: user.displayName,
                        uid: user.uid, 
                        profilePicture: user.photoURL
                  },
                  headers:{
                        Accept: 'Aplication/json'
                  }
            }).then(res => {
                  setUser({...user, idForUser: res.data.data.id})
            }).catch(err => {
                  console.log(err)
            })
      }

      useEffect(() => {
            addUser()
      }, [])

    return(
        <Drawer.Navigator>
              <Drawer.Screen name='Home' component={HomeStack}/>
              <Drawer.Screen name='Informasi' component={InformasiStack}/>
              <Drawer.Screen name='Chat' component={ChatStack}/>
              <Drawer.Screen name='Youtube' component={YoutubeStack}/>
        </Drawer.Navigator>
      )
}

export default AppStack