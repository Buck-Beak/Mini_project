import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    // Your web app's Firebase configuration
    apiKey: "AIzaSyA41zRsMq6aEr0I1LhfpDMRACuPVUX9Esw",
    authDomain: "mini-project-2c98f.firebaseapp.com",
    projectId: "mini-project-2c98f",
    storageBucket: "mini-project-2c98f.firebasestorage.app",
    messagingSenderId: "201033275106",
    appId: "1:201033275106:web:9d60ae462a1b5a34fdf0bb",
    measurementId: "G-02W3F3W2SC"
    /*apiKey: "AIzaSyBKq_OwxvkNdGulH8lz9SLLVZ4SUu5FVi4",
    authDomain: "ieee-hack-3623b.firebaseapp.com",
    projectId: "ieee-hack-3623b",
    storageBucket: "ieee-hack-3623b.appspot.com",
    messagingSenderId: "686577314234",
    appId: "1:686577314234:web:fa4f7421656783d6c4d583",
    measurementId: "G-HMG12K7Z4F"*/

    /*
    apiKey: "AIzaSyC0QuTUMp1dEUgLb5h8oIEg5ITyK0ZKDys",
  authDomain: "ieee-hack.firebaseapp.com",
  projectId: "ieee-hack",
  storageBucket: "ieee-hack.appspot.com",
  messagingSenderId: "1059500581233",
  appId: "1:1059500581233:web:c058d91c68c628e384d6d0",
  measurementId: "G-9B66NJ8LZ0"
    */ 
  };

initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const cvdb=getStorage();