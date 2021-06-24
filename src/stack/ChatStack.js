import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../screen/chat/ChatScreen';

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

const ChatStack = () => {
    return(
          <Stack.Navigator>
              <Stack.Screen name='ChatScreen' component={ChatScreen} options={{ ...optionsStyle, title: 'Chat'}}/>
          </Stack.Navigator>
      )
}

export default ChatStack