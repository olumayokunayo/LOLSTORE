import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FB_API_KEY}`,
  authDomain: "lolmart-d69cc.firebaseapp.com",
  projectId: "lolmart-d69cc",
  storageBucket: "lolmart-d69cc.appspot.com",
  messagingSenderId: "381755163035",
  appId: "1:381755163035:web:51cd4b342ae693562c213e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;
