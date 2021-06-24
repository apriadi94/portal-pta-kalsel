import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ChatProvider } from '../provider/ChatProvider';
import ChatScreen from '../screen/chat/ChatScreen';
import ChatContactScreen from '../screen/chat/ChatContactScreen';
import { AuthContext } from '../provider/AuthProvider';

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
  const { user } = useContext(AuthContext)
    return(
          <ChatProvider user={user}>
            <Stack.Navigator>
                <Stack.Screen name='ChatScreen' component={ChatScreen} options={{ 
                    ...optionsStyle, 
                    title: 'Chat'
                  }}/>
                <Stack.Screen name='ChatContactScreen' component={ChatContactScreen} options={{ ...optionsStyle, title: 'List Kontak'}}/>
            </Stack.Navigator>
          </ChatProvider>
      )
}

export default ChatStack