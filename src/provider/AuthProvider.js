import React, { useEffect, useState, createContext } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const onAuthStateChanged = async (user) => {
        await setUser(user);
        if (initializing) setInitializing(false);
    }
    
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
      }, []);

    const AuthState = { user, initializing };

    return(
        <AuthContext.Provider value={AuthState}>
            {children}
        </AuthContext.Provider>
    )
}