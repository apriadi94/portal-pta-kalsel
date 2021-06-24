import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/home/HomeScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
    return(
          <Stack.Navigator>
              <Stack.Screen name='Home' component={HomeScreen}/>
          </Stack.Navigator>
      )
}

export default HomeStack