import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { doc, setDoc } from "firebase/firestore";
  import { auth, db } from "../firebase/fire";
  
  export const signIn = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      return res.user;  
    } catch (error) {
      return error;
    }
  };
  
  export const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      return error;
    }
  };

  
  export const signUp = async (email, password, userData) => {
    try {
      console.log(email);
      console.log(password);
      console.log(userData);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", user.user.uid), {
        ...userData,
        uid: user.user.uid,
      });
      return user.user;
    } catch (error) {
      return error;
    }
  };
  