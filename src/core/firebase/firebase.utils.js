import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBEMatba8h1EINMS-6yesROyPTzkMjqyb4",
    authDomain: "react-ecommerce-webapp.firebaseapp.com",
    databaseURL: "https://react-ecommerce-webapp.firebaseio.com",
    projectId: "react-ecommerce-webapp",
    storageBucket: "react-ecommerce-webapp.appspot.com",
    messagingSenderId: "871277159557",
    appId: "1:871277159557:web:4f265773ef4aba607ab5ec",
    measurementId: "G-YBP3ZMYEZE"
};

firebase.initializeApp(config);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });

export const getCurrentUser = () => new Promise(((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
    }, reject);
}));

export const createUserProfileDoc = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (e) {
            console.error('Error creating user', e.message);
        }
    }

    return userRef;
}

export const convertCollectionsSnapshotToMap = collections => {
    return collections.docs
        .map(doc => {
            const { title, items } = doc.data();
            return {
                id: doc.id,
                routeName: encodeURI(title.toLowerCase()),
                title,
                items
            }
        })
        .reduce((acc, collection) => {
            acc[collection.title.toLowerCase()] = collection;
            return acc;
        }, {});
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}

export default firebase;



