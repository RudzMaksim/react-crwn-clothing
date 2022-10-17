import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore'
import { Category } from "../../interfaces/category";

import { initializeApp } from "firebase/app";

import {
    User
} from 'firebase/auth'

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

export type AdditionalInformation = {
    displayName?: string
}

export type UserData = {
    createdAt: Date,
    displayName: string,
    email: string
}

export const createUserDocument = async (userAuth: User, additionalInfo?: AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
            console.log("error creating the user", error)
        }
    }
    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

type ObjectToAdd = {
    title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category);
}