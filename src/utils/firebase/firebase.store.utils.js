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

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAwFDsRXX2wnsihwMnhJIbZWTcFLqUDuH4",
    authDomain: "crwn-clothing-db-59c24.firebaseapp.com",
    projectId: "crwn-clothing-db-59c24",
    storageBucket: "crwn-clothing-db-59c24.appspot.com",
    messagingSenderId: "924596389664",
    appId: "1:924596389664:web:f62c93da3903cc02ffb945"
};

initializeApp(firebaseConfig);

export const db = getFirestore()

export const createUserDocument = async (userAuth, additionalInfo = {}) => {
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