// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
     createUserWithEmailAndPassword,
     getAuth, 
     signInWithEmailAndPassword,
     signOut} from "firebase/auth";
import { 
     addDoc, 
     collection, 
     getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
//import { addDoc, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO2AwWwMd1rsekRqbJ1i17X2-Es5QnDhQ",
  authDomain: "netflix-clone-92d2c.firebaseapp.com",
  projectId: "netflix-clone-92d2c",
  storageBucket: "netflix-clone-92d2c.firebasestorage.app",
  messagingSenderId: "660079015589",
  appId: "1:660079015589:web:096edf1053e4eacec37f4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db=getFirestore(app);

const signup= async(name, email, password)=>{
     try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
     } catch (error){
         console.log(error);
         toast.error(error.code.split('/')[1].split('-').join(" "));
     }
}

const login= async (email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout =() =>{
    signOut(auth);
}

export {auth, db, login, signup, logout };