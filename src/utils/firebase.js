// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: 'nextblogs-a21c6.firebaseapp.com',
  projectId: 'nextblogs-a21c6',
  storageBucket: 'nextblogs-a21c6.appspot.com',
  messagingSenderId: '664337890661',
  appId: '1:664337890661:web:a8b8a5f1a8e4d2e6d5358c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
