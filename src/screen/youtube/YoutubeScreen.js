import React, { useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import axios from 'axios'
import moment from 'moment'

const YoutubeScreen = ({ navigation }) => {
    const [List, setList] = useState([]);
    const [nextPageToken, setnextPageToken] = useState('')
    const [refreshing, setRefreshing] = useState(false);
    const [Loading, setLoading] = useState(true);
    const [LoadingMoreData, setLoadingMoreData] = useState(false)

    const GetData = async () => {
        setLoading(true)
        await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyC8avjMSINELXqirk6U5glSkrVpbKKVqt0&channelId=UCk-UO4mjjUY7rCqy8LirRTg&part=snippet,id&order=date`, {
          headers: {
            Accept: 'application/json',
          }
        })
          .then(function (response) {
            setnextPageToken(response.data.nextPageToken)
            setList(response.data.items);
          }).catch(e => {
            alert('Network Error')
          })
          setLoading(false)
    }

    useEffect(() => {
        navigation.setOptions({
            title: 'Youtube Chanel',
        });
        GetData();
    }, [])

    const TambahDataSelanjutnya = async () => {
        setLoadingMoreData(true);
        await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyC8avjMSINELXqirk6U5glSkrVpbKKVqt0&channelId=UCk-UO4mjjUY7rCqy8LirRTg&part=snippet,id&order=date&pageToken=${nextPageToken}`, {
          headers: {
            Accept: 'application/json',
          }
        })
          .then(function (response) {
            setList(List => [...List, ...response.data.items]);
            setnextPageToken(response.data.nextPageToken)
          }).catch(e => {
            alert(e)
          })
          setLoadingMoreData(false)
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };

    return(
        <View style={{flex : 1, backgroundColor : '#F3F6FF'}}>
           {
               Loading ? <Text>Loading....</Text> :
               <ScrollView
               onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        TambahDataSelanjutnya()
                    }
                }}
                scrollEventThrottle={400}
               >
                   {
                       List.map((item, index) => 
                       <TouchableOpacity style={{backgroundColor: '#fff', marginBottom : 10}} key={index} onPress={() => navigation.navigate('Video', {vidID : item.id.videoId, titleVideo : item.snippet.title})}>
                            <View style={{ marginBottom : 10, marginTop : 10}}>
                                <View style={{marginHorizontal : 2}}>
                                    <Image source={{uri : item.snippet.thumbnails.medium.url}} style={{width : '100%', height : 200}}/>
                                </View>
                                <View style={{marginHorizontal : 10}}>
                                    <Text style={{marginTop : 10, fontWeight : 'bold', fontSize : 15, marginBottom : 5}}>{item.snippet.title}</Text>
                                    <Text>dipublikasikan {moment(item.snippet.publishTime).format('dddd, DD-MMMM-YYYY')}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                       )
                   }
                   {
                       LoadingMoreData ?
                       <View style={{height : 50}}>
                           <Text>Loading...</Text>
                       </View> : null
                   }
               </ScrollView>
           }
        </View>
    )
}

export default YoutubeScreen