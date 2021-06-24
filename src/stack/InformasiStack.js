import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InformasiScreen from '../screen/informasi/InformasiScreen';

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

const InformasiStack = () => {
    return(
          <Stack.Navigator>
              <Stack.Screen name='InformasiScreen' component={InformasiScreen} options={{ ...optionsStyle, title: 'Portal Informasi'}}/>
          </Stack.Navigator>
      )
}

export default InformasiStack