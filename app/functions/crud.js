import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    setDoc,
    updateDoc,
    query ,
    where,
    orderBy,
    limit,
  } from "firebase/firestore";
  import { db} from "../firebase/fire";
  
  const generateRandomID = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomID = "";
  
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomID += characters.charAt(randomIndex);
    }
    return randomID;
  };
  
  export const createData = async (collectionName, data) => {
    const id = generateRandomID();
    try {
      const docRef = doc(db, collectionName, id);
      await setDoc(docRef, {
        id,
        ...data,
      });
      console.log("posted successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  
  export const readData = async (collection, id) => {
    try {
      const docRef = doc(db, collection, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error reading document: ", error.message);
    }
  };
  
  export const updateData = async (collection, id, data) => {
    try {
      const docRef = doc(db, collection, id);
      await updateDoc(docRef, {
        id: id,
        ...data,
      });
  
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error.message);
    }
  };
  
  export const deleteData = async (collection, id) => {
    try {
      const docRef = doc(db, collection, id);
      await deleteDoc(docRef);
  
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error.message);
    }
  };
  
  export const readAllData = async (collectionName) => {
    try {
      const newDataArr = [];
      const querySnapshot = await getDocs(collection(db, collectionName));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        newDataArr.push(doc.data());
      });
      return newDataArr;
    } catch (error) {
      console.error("Error reading collection: ", error.message);
    }
  };

  export const readLatestSummary = async (collectionName, userId) => {
    try {
      const summariesRef = collection(db, collectionName);
      const querySnapshot = await getDocs(summariesRef);
      
      const userSummaries = [];
  
      // Loop through all documents
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.user === userId && data.timestamp) {
          userSummaries.push(data);
          console.log("User summary:", data);
        }
      });
  
      if (userSummaries.length === 0) {
        console.log("No summaries found for this user.");
        return null;
      }
  
      // Sort manually by timestamp (latest first)
      userSummaries.sort((a, b) => b.timestamp - a.timestamp);
  
      console.log("Latest summary:", userSummaries[0].summary);
      return userSummaries[0].summary; // Return latest summary
    } catch (error) {
      console.error("Error fetching latest summary:", error.message);
    }
  };
  
  export const listenToCollection = (collectionName, callback) => {
    const collectionRef = collection(db, collectionName);
  
    return onSnapshot(collectionRef, (querySnapshot) => {
      const newDataArr = [];
      querySnapshot.forEach((doc) => {
        newDataArr.push(doc.data());
      });
      callback(newDataArr);
    });
  };

  export const readDocument = async (collectionName, documentId) => {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        throw new Error("Document not found");
      }
    } catch (error) {
      console.error("Error reading document:", error);
      throw error;
    }
  };