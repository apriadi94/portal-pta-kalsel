import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChatStack from './ChatStack';
import HomeStack from './HomeStack';
import InformasiStack from './InformasiStack';
import YoutubeStack from './YoutubeStack';

const Drawer = createDrawerNavigator();

const AppStack = () => {
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