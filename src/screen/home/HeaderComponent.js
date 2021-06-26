import React, { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../provider/AuthProvider'
import menuPng from '../../assets/menu.png'

const HeaderComponent = ({ navigation }) => {
    const { user } = useContext(AuthContext)
    return(
        <View style={{backgroundColor: '#fff'}}>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
                <View style={{marginLeft : 20}}>
                    <Image 
                        style={{width: 70, height: 70, borderRadius: 35}}
                        source={{uri: user._user.photoURL}}/>
                </View>
                <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                    <Text>{user._user.email}</Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>{user._user.displayName  ??  user._user.phoneNumber}</Text>
                </View>
                
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={{flex : 1, alignItems : 'flex-end', marginRight: 10, justifyContent: 'center'}}>
                    <Image source={menuPng} style={{ width: 32, height: 32}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HeaderComponent