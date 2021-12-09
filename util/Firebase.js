import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    //firebaseConfig
};

let Firebase;
try {
    Firebase = firebase.initializeApp(firebaseConfig);
} catch (error) {
    return error    
}

export default Firebase;