import Firebase from "./Firebase";

// Phone Authentication
export const phoneAuth = async (phoneNumber, recaptchaVerifier) => {
    try {
        const phoneProvider = new Firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier);
        return verificationId;
    } catch(error) {
        return error;
    }
}