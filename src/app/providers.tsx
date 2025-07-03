'use client';

import { createContext } from "react";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const DBContext = createContext<Firestore>(db);
export const AuthContext = createContext<Auth>(auth);
export const StorageContext = createContext<FirebaseStorage>(storage);

export function Providers({ children }: {children: React.ReactNode}) {
  return (
    <AuthContext.Provider value={auth}>
        <DBContext.Provider value={db}>
            <StorageContext.Provider value={storage}>
                {children}
            </StorageContext.Provider>
        </DBContext.Provider>
    </AuthContext.Provider>
  );
}