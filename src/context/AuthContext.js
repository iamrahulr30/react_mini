import { createContext, useEffect, useState } from "react";
import  app , {auth }   from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext()


const AuthContextProvider = ({ children }) => {

    const [ currentUser , setCurrentUser ] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth , (userCred => {
            
            setCurrentUser(userCred)
        }))

        console.log(currentUser)
    }
    , [])

    return (
        <AuthContext.Provider value={{
            currentUser
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;