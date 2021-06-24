import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { AuthContext } from '../../provider/AuthProvider'

const HomeScreen = () => {
    const { signOut } = useContext(AuthContext)
    return(
        <View style={{flex : 1}}>
            <Text>Home Screen</Text>
            <Button title="logout" onPress={signOut}/>
        </View>
    )
}

export default HomeScreen