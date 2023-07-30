import firebase from 'firebase/compat/app';
// import { getAnalytics } from 'firebase/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

export const firebaseStorageURL = 'https://firebasestorage.googleapis.com/v0/b/eventtimer-3d6f4.appspot.com/o/';

const firebaseConfig = {
    apiKey: 'AIzaSyChoIfLahyZc_rKJEv1ANX4xrfhfvKN1go',
    authDomain: 'eventtimer-3d6f4.firebaseapp.com',
    projectId: 'eventtimer-3d6f4',
    storageBucket: 'eventtimer-3d6f4.appspot.com',
    messagingSenderId: '615508517956',
    appId: '1:615508517956:web:c30b9e2712ad997ebb0811',
    measurementId: 'G-J4M125BF3V'
};

// const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
