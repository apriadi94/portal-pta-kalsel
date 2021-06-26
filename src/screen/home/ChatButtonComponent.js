import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import chatPng from '../../assets/chat.png'

const ChatButtonComponent = ({ navigation, countChat }) => {
    return(
        <TouchableOpacity 
        onPress={() => navigation.navigate('Chat')}
        style={{
            width : 50, height: 50, 
            borderRadius: 25,
            position: 'absolute',
            bottom: 0,
            right: 0,
            marginBottom : 10,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center'
            }}>
            <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', width: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <Text style={{color : 'white'}}>{countChat}</Text>
            </View>
            <Image source={chatPng} style={{ width: 32, height: 30 }}/>
        </TouchableOpacity>
    )
}

export default ChatButtonComponent