"use client"
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React,{ createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/fire";

const UserContext = createContext();

export const UserAuth = () => {
  return useContext(UserContext);
};

export default function AuthContextProvider({ children }) {
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedOut(false);
        onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          setUser(doc.data());
          console.log(doc.data());
        });
        console.log("It ran again");
      } else {
        setIsLoggedOut(true);
        console.log("It ran");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [isLoggedOut]);

  return (
    <UserContext.Provider
      value={{
        isLoggedOut,
        user
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
