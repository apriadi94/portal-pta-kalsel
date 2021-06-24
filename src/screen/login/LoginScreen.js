import React from 'react'
import { View, ImageBackground, Button } from 'react-native'
import backgroundGambar from '../../assets/background.png'

const LoginScreen = ({ navigation }) => {
    return(
        <View style={{flex : 1}}>
           <ImageBackground style={{flex : 1}} source={backgroundGambar}>
            <View style={{flex: 1, justifyContent : 'flex-end', marginBottom : 110, marginHorizontal : 20}}>
                  <View style={{ width: 230 }}>
                    <Button title={'Login'} color={'#AAE296'} onPress={() => navigation.navigate('PhoneLoginScreen')}/>
                  </View>
              </View>
           </ImageBackground>
        </View>
    )
}

export default LoginScreen