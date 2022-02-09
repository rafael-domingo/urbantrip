import { initializeApp } from "firebase/app";
import { collection, getFirestore, doc, getDoc } from "firebase/firestore"

const firebaseConfig = {
 //firebaseConfig
};

try {    
    initializeApp(firebaseConfig);
} catch(error) {    
};

// const firestore = getFirestore();

// Get user account info
export const getDocument = async (uid) => {

    try {             
        const app = getFirestore();
        const collectionRef = await collection(app, "tripList"); // get collection
        const documentRef = doc(collectionRef, uid); // get reference for document
        const document = await getDoc(documentRef); // get data in document
        if (document.exists()) {
            return document.data();
        } else {
            throw 'New User';
        }        
    } catch(error) {
        if (error === 'New User') {
            return error;
        } else {
            return 'Error';
        }
        
    }
}