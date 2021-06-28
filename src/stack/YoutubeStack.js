import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import YoutubeScreen from '../screen/youtube/YoutubeScreen';
import VideoScreen from '../screen/youtube/VideoScreen';

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

const YoutubeStack = () => {
    return(
          <Stack.Navigator>
              <Stack.Screen name='YoutubeScreen' component={YoutubeScreen} options={{ ...optionsStyle, title: 'Chanel Youtube'}}/>
              <Stack.Screen name='Video' component={VideoScreen} options={optionsStyle}/>
          </Stack.Navigator>
      )
}

export default YoutubeStack