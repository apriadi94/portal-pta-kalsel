import React from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
    webClientId: '317960334230-2ns66jvl9mccjj0lgavg691b6d3f7tem.apps.googleusercontent.com',
  });


const GoogleLogin = () => {
    
    async function onGoogleButtonPress() {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
      }

    return(
        <View style={{marginHorizontal : 15, marginTop : 10, marginBottom : 10}}>
            <GoogleSigninButton
                style={{ width: '100%', height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={onGoogleButtonPress}
                 />
        </View>
    )
}

export default GoogleLogin;