import React from 'react'
import { View, Text, Button } from 'react-native'

const LoginScreen = ({ navigation }) => {
    return(
        <View style={{flex : 1}}>
           <View style={{flex: 1, justifyContent : 'flex-end', marginBottom : 60, marginHorizontal : 20}}>
                <View>
                  <Button title={'Login'} color={'#84d198'} onPress={() => navigation.navigate('PhoneLoginScreen')}/>
                </View>
             </View>
        </View>
    )
}

export default LoginScreen