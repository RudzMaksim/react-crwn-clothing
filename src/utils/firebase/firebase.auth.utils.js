import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import { createUserDocument } from "./firebase.store.utils";

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const signInWithGooglePopup = async () => {
    try {
        const {user} = await signInWithPopup(auth, googleProvider);
        if (user) {
            await createUserDocument(user);
        }
        return user;
    } catch (error) {
        console.log("Error with Gogle Sign In", error);
    }
}

export const signInWithEmail = (email, password) => {
    if (!email || !password) return;
    return signInWithEmailAndPassword(auth, email, password);
}

export const signUpWithCreds = async (email, password, displayName = '') => {
    if (!displayName || !email || !password) return;

    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        if (response) {
            await createUserDocument(response.user, {displayName: displayName});
        }
        return response;
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert('Email is already in use')
        }
        console.log('user creation encountered an error', error)
    }
}

export const signOutUser = async () => signOut(auth);

export const onAuthChangeListener = (callback) => onAuthStateChanged(auth, callback);