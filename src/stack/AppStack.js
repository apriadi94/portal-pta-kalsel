import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screen/home/HomeScreen';
import ChatStack from './ChatStack';

const Drawer = createDrawerNavigator();

const optionsStyle = {
    headerStyle: {
        backgroundColor: '#AAE296',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
      }
}

const AppStack = () => {
    return(
        <Drawer.Navigator>
              <Drawer.Screen name='Home' component={HomeScreen} options={optionsStyle}/>
              <Drawer.Screen name='Chat' component={ChatStack}/>
        </Drawer.Navigator>
      )
}

export default AppStack