import React, { useEffect, useState, createContext } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const baseUrl = 'http://192.168.1.4:8010'
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true)

    const onAuthStateChanged = async (user) => {
        await setUser(user);
        if (initializing) setInitializing(false);
    }

    const signOutGoogle = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } catch (error) {
        alert(error)
      }
    };

    const signOut = async () => {
        auth()
        .signOut()
        .then(() => {
          if(user._user.providerData[0].providerId === 'google.com'){
              signOutGoogle();
          }
        });
    };
    
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
      }, []);

    const AuthState = { user, setUser, initializing, signOut, baseUrl, setLoadingAuth };

    return(
        <AuthContext.Provider value={AuthState}>
            {children}
        </AuthContext.Provider>
    )
}