import React, { useContext, useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { ChatContext } from '../../provider/ChatProvider'
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios'
import { AuthContext } from '../../provider/AuthProvider';


const SendInputComponent = ({ scrollViewRef, roomId, to }) => {
    const { baseUrl } = useContext(AuthContext)
    const { socket } = useContext(ChatContext)
    const [message, setMessage] = useState('')
    
    const [filePath, setfilePath] = useState({
        data: '',
        uri: ''
      })
      const [fileData, setfileData] = useState('')
      const [fileUri, setfileUri] = useState('')
  
    const sendChat = () => {
      socket.emit('STORE_MESSAGE_CHAT', { roomId, message, type : 'TEXT', to })
      setMessage('')
    }


    const openLibrary = () => {
        let options = {
            storageOptions: {
            skipBackup: true,
            path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                uploadImageToServer({
                    uri: response.assets[0].uri,
                    type: response.assets[0].type,
                    name: response.assets[0].fileName
                }, { height: response.assets[0].height, width: response.assets[0].width })
            }
        });
    }

    const openCamera = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchCamera(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            uploadImageToServer({
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName
            }, { height: response.assets[0].height, width: response.assets[0].width })
          }
        });
      }

      const uploadImageToServer = (image, screen) => {
        let payload = new FormData()
        payload.append('image', image)
        axios({
            method: 'post',
            url: `${baseUrl}/api/upload`,
            data: payload,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            socket.emit('STORE_MESSAGE_CHAT', { roomId, message: image.name, type : image.type, to, url: res.data.data, height: screen.height, width: screen.width })
        }).catch(err => {
            console.log(err)
        })
      }

    return(
        <View style={{justifyContent : 'flex-end'}}>
               <View style={{flexDirection : 'row'}}>
                    <View style={{flex : 1, flexDirection: 'row', marginHorizontal : 10, backgroundColor : 'white', marginBottom : 10, borderRadius : 10}}>
                        <View style={{flex: 1}}>
                            <TextInput onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})} multiline={true} style={{color : 'black', fontSize : 18, marginLeft : 10}} value={message} onChangeText={(text) => setMessage(text)}/>
                        </View>
                        <TouchableOpacity onPress={openLibrary} style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 20, marginBottom: 15 }}>
                            <Icon name="paperclip" color="gray" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openCamera} style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 20, marginBottom: 15 }}>
                            <Icon name="camera" color="gray" size={20} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity disabled={message === ''} onPress={sendChat} style={{ justifyContent: 'flex-end', alignItems: 'center', width : 40, marginBottom : 10, marginRight : 5, borderRadius : 20}}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor : message !== '' ? 'green' : 'gray', width : 40, height: 40, marginBottom : 5, marginHorizontal : 5, borderRadius : 20}}>
                            <Icon name="send" color={message !== '' ? "white" : 'black'} style={{marginRight: 3}} size={18} />
                        </View>
                    </TouchableOpacity>
               </View>
           </View>
    )
}

export default SendInputComponent