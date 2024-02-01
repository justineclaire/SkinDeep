// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxRv5Xpa9txLjQDvXr2FwjlvmD0wRPIl8",
  authDomain: "skindeep-fyp.firebaseapp.com",
  projectId: "skindeep-fyp",
  storageBucket: "skindeep-fyp.appspot.com",
  messagingSenderId: "128245545767",
  appId: "1:128245545767:web:2996cf0c316895288e8702"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
