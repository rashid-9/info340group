import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-IYREi2BChs8RQ4LOG_qtqxJfd0_WI4o",
  authDomain: "project-draft23.firebaseapp.com",
  projectId: "project-draft23",
  storageBucket: "project-draft23.firebasestorage.app",
  messagingSenderId: "96017767989",
  appId: "1:96017767989:web:1f1f7d72d7dc744a795b7c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
