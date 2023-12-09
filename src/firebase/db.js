//database functions

import { db } from "../firebase";
import { addDoc, collection, doc, getDoc, updateDoc , setDoc} from "firebase/firestore"

const favCollections = collection(db , "favorites")


export const createFav = async (id ) => {

    const user_array =  await setDoc(doc(db, "favorites", id), {
        favorite : new Array()
      });

    // const Doc = doc(db , `favorites/${id}` )
    // const user_array = await addDoc(Doc , {
    //     favorite : new Array()
    //  })
    console.log( user_array )

    return user_array

}

export const getFav = async (id) => {

    const Doc = doc(db , "favorites" , id )
    const user_array = await getDoc(Doc)
    console.log("dd" , user_array.data())
    return user_array.data().favorite


}

export const updateFav = async (new_array , id ) => {

    console.log("recieved")
    const Doc = doc(db , "favorites" , id )
    const user_array = await updateDoc(Doc , {
        favorite : new_array })
    console.log(user_array)

    return user_array

}

