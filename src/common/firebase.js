// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALVtKTl_doLIoOCnSdZYdhsmqS7MPPOhc",
    authDomain: "noteed-c137b.firebaseapp.com",
    projectId: "noteed-c137b",
    storageBucket: "noteed-c137b.appspot.com",
    messagingSenderId: "595381931052",
    appId: "1:595381931052:web:38f4d2cd290c9d5ae91589",
    measurementId: "G-F8HVDR4LE6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
