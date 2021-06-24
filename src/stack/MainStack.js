import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../provider/AuthProvider';
import HomeStack from './HomeStack';
import LoginStack from './LoginStack';

const MainStack = () => {
    const {user, initializing} = useContext(AuthContext);
    if(initializing) return null;

    return(
        <NavigationContainer>
           { user ? <HomeStack/> : <LoginStack/> }
        </NavigationContainer>
    )
}

export default MainStack