import React from 'react'
import { View, ScrollView } from 'react-native'
import CardBerita from './CardBerita'

const BeritaWebComponent = () => {
    return(
        <View style={{ flex: 1, backgroundColor: '#fff', marginTop : 5}}>
            <View style={{ marginTop : 10, marginBottom: 10 }}>
                <ScrollView>
                    <CardBerita/>
                    <CardBerita/>
                    <CardBerita/>
                    <CardBerita/>
                </ScrollView>
            </View>
        </View>
    )
}

export default BeritaWebComponent