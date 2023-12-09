
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore"


const firebaseConfig = {
  apiKey: process.env.REACT_APP_firebaseapikey ,
  authDomain: process.env.REACT_APP_authDomain ,
  projectId: process.env.REACT_APP_projectId ,
  storageBucket: process.env.REACT_APP_storageBuckett ,
  messagingSenderId: process.env.REACT_APP_messagingSenderId ,
  appId: process.env.REACT_APP_appId 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);

//db
export const db = getFirestore(app);
export default app;