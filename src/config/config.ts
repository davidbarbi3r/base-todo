import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import {getFirestore} from "@firebase/firestore"

interface IFirebase {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

const firebaseConfig:IFirebase = {
        apiKey: import.meta.env.VITE_FIRE_APIKEY || "",
        authDomain: import.meta.env.VITE_FIRE_AUTHDOMAIN || "",
        projectId: import.meta.env.VITE_FIRE_PROJECTID || "",
        storageBucket: import.meta.env.VITE_FIRE_STORAGE_BUCKET || "",
        messagingSenderId: import.meta.env.VITE_FIRE_SENDERID || "",
        appId: import.meta.env.VITE_FIRE_APPID || ""
}

const app = firebase.initializeApp(firebaseConfig)

export const auth = app.auth()
export const database = getFirestore()

export default app