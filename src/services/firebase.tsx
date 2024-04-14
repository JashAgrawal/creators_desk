import  { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
  measurementId: process.env.REACT_APP_FIREBASE_measurementId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const GoogleSignIn = async () => {
 
    const result = await signInWithPopup(auth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential?.accessToken;
    const user = result.user;
    return user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  
};

export const authenticateUser = async (
  email: string,
  password: string,
  isLogin: boolean
) => {
  
    const firebaseFn = isLogin
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword;
    const userCredentials = await firebaseFn(auth, email, password);
    return userCredentials.user;
  
};
export const storage = getStorage();
export const db = getFirestore();
