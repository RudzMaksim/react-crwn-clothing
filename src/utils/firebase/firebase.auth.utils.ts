import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    UserCredential
} from 'firebase/auth'

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signInWithEmail = async (email: string, password: string): Promise<UserCredential | void> => {
    if (!email || !password) return;
    return signInWithEmailAndPassword(auth, email, password);
}

export const signUpWithCreds = async (email: string, password: string) => {
    if (!email || !password) return;
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const getCurrentUser = (): Promise<User | null> => {
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