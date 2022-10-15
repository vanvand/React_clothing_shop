import { createContext, useState, useEffect } from "react"
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null, 
    setCurrentUser: () => null,
})

// provider > actual component
export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] =useState(null);
    const value = { currentUser, setCurrentUser };



    // centralize sign-in and sign-out 
    // method will only run on mounting once
    useEffect( () => {
        // the onAuthStateChangedListener is an open listener, so always listen > when component unmount we do not need to listen anymore, so we use unsubscribe function
        const unsubscribe = onAuthStateChangedListener( (user) => {
            // if a user comes through then createUserDocumentFromAuth, otherwise set current user 
            if(user) {
                  createUserDocumentFromAuth(user);
            }
            // set the current user > we get null when user sign out
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
