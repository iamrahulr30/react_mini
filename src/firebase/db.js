//database functions

import { db } from "../firebase";
import {  collection, doc, getDoc, updateDoc , setDoc} from "firebase/firestore"



export const createFav = async (id ) => {

    const user_array =  await setDoc(doc(db, "favorites", id), {
        favorite : new Array()
      });

    return user_array

}

export const getFav = async (id) => {

    const Doc = doc(db , "favorites" , id )
    const user_array = await getDoc(Doc)
    return user_array.data().favorite


}

export const updateFav = async (new_array , id ) => {

    const Doc = doc(db , "favorites" , id )
    const user_array = await updateDoc(Doc , {
        favorite : new_array })

    return user_array

}

