import React, { useContext } from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import { AuthContext } from '../../provider/AuthProvider'
import HeaderComponent from './HeaderComponent'
import ChatButtonComponent from './ChatButtonComponent'

const HomeScreen = ({navigation}) => {
    const { signOut, countChat } = useContext(AuthContext)
    return(
        <View style={{flex : 1, backgroundColor: '#F3F6FF'}}>
            <ScrollView>
                <HeaderComponent navigation={navigation}/>
                <Button onPress={signOut} title="logout"/>
            </ScrollView>
            {
                countChat > 0 ? <ChatButtonComponent navigation={navigation} countChat={countChat}/> : null
            }
        </View>
    )
}

export default HomeScreen