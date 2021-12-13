import {initializeApp} from 'firebase/app';
import {getAuth, PhoneAuthProvider, signInWithCredential} from 'firebase/auth';

const firebaseConfig = {
    //firebaseConfig
};
try {
    initializeApp(firebaseConfig);
} catch(error) {

}
const auth = getAuth();

// Phone Authentication
export const phoneAuth = async (phoneNumber, recaptchaVerifier) => {
        
    
    try {
        const phoneProvider = new PhoneAuthProvider(auth);  
        recaptchaVerifier._reset = () => {} // temp fix to address error when calling 'verifyPhoneNumber' (https://github.com/firebase/firebase-js-sdk/issues/5638)
        const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier)        
        return verificationId;
    } catch(error) {        
        return 'error';
    }
};

// Verification Code
export const verificationAuth = async (verificationCode, verificationId) => {
    try {
        const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
        const user = await signInWithCredential(auth, credential);
        return user;
    } catch(error) {
        return error.message;
    }
};