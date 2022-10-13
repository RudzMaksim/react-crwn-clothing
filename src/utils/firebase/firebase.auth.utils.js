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

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signInWithEmail = (email, password) => {
    if (!email || !password) return;
    return signInWithEmailAndPassword(auth, email, password);
}

export const signUpWithCreds = async (email, password) => {
    if (!email || !password) return;
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}