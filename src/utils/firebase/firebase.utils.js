import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAwFDsRXX2wnsihwMnhJIbZWTcFLqUDuH4",
    authDomain: "crwn-clothing-db-59c24.firebaseapp.com",
    projectId: "crwn-clothing-db-59c24",
    storageBucket: "crwn-clothing-db-59c24.appspot.com",
    messagingSenderId: "924596389664",
    appId: "1:924596389664:web:f62c93da3903cc02ffb945"
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore()

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const signInWithGooglePopup = async () => {
    try {
        const {user} = await signInWithPopup(auth, googleProvider);
        if (user) {
            await createUserDocumentFromAuth(user);
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
            await createUserDocumentFromAuth(response.user, {displayName: displayName});
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


export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (error) {
            console.log("error creating the user", error.message)
        }
    }
    return userDocRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
}