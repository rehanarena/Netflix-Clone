import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDBk8lfk59fEUpQrfkZcqKaLyJCrPxMEEo",
  authDomain: "netflix-clone-b35a4.firebaseapp.com",
  projectId: "netflix-clone-b35a4",
  storageBucket: "netflix-clone-b35a4.appspot.com",
  messagingSenderId: "786518680317",
  appId: "1:786518680317:web:dcc624c096f87854619494"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name,email,password) =>{
    try {
       const response = await createUserWithEmailAndPassword(auth,email,password);
        const user = response.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}



const login = async(email,password) =>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const logout = async () =>{
    signOut(auth);
}



export {auth,db,login,signup,logout};