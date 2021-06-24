import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/home/HomeScreen'

const Stack = createStackNavigator();

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

const HomeStack = () => {
    return(
          <Stack.Navigator>
              <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ ...optionsStyle, title: 'Beranda'}}/>
          </Stack.Navigator>
      )
}

export default HomeStack