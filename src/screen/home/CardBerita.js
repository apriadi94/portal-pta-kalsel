import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const CardBerita = () => {
    return(
        <React.Fragment>
            <View style={{marginHorizontal: 5, flexDirection: 'row'}}>
                <View>
                    <Image 
                        source={{ uri: 'https://www.pta-banjarmasin.go.id/images/Berita_Foto/20210604_Aksi_tanam_pohon/tanampohon2.jpeg' }} 
                        style={{ width: 100, height: 100, borderRadius: 10 }}/>
                </View>
                <View style={{marginLeft: 20}}>
                    <Text numberOfLines={2} style={{ fontWeight: 'bold', width: 270, fontSize: 12 }}>PTA Banjarmasin Gelar Aksi Tanam Pohon yang akan mungkin tumbuh sekitar lama lagi, sekitar puluhan tahun kemudian baru akan tumbuh</Text>
                    <Text numberOfLines={3} style={{ width: 270, fontSize: 10, marginTop: 5 }}>PTA Banjarmasin Gelar Aksi Tanam Pohon yang akan mungkin tumbuh sekitar lama lagi, sekitar puluhan tahun kemudian baru akan tumbuh</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{ width: 150, alignItems: 'center', justifyContent: 'center', backgroundColor: '#cc3300', borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', marginVertical: 2 }}>Selengkapnya</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{height: 1, backgroundColor: '#e6e6e6', marginHorizontal: 5, marginTop: 10, marginBottom: 15}}></View>
        </React.Fragment>
    )
}

export default CardBerita