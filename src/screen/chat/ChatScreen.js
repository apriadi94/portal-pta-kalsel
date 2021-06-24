import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const ChatScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('ChatContactScreen')}>
                  <View style={{ marginRight : 10 }}>
                    <Text>+</Text>
                  </View>
                </TouchableOpacity>
              ),
        })
    }, [])
    return(
        <View>
            <Text>Chat Screen</Text>
        </View>
    )
}

export default ChatScreen