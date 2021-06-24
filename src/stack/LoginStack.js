import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/login/LoginScreen';
import PhoneLoginScreen from '../screen/login/PhoneLoginScreen';

const Stack = createStackNavigator();

const LoginStack = () => {
    return(
          <Stack.Navigator>
              <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}}/>
              <Stack.Screen name='PhoneLoginScreen' component={PhoneLoginScreen} options={{
                  title : 'Log-In',
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
                  }}/>
          </Stack.Navigator>
      )
}

export default LoginStack