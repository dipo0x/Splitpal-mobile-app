import { env } from "@/src/config/env.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import {
  doc,
  enableNetwork,
  Firestore,
  getDoc,
  getFirestore,
} from "firebase/firestore";

export const firebaseConfig: Record<string, string> = {
  apiKey: env.FIREBASE_API_KEY!,
  authDomain: env.FIREBASE_AUTH_DOMAIN!,
  databaseURL: env.FIREBASE_DATABASE_URL!,
  projectId: env.FIREBASE_PROJECT_ID!,
  storageBucket: env.FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID!,
  appId: env.FIREBASE_APP_ID!,
};

let app: FirebaseApp;
let auth: Auth;

try {
  app = initializeApp(firebaseConfig);

  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    auth = getAuth(app);
  }
} catch (error) {
  throw error;
}

const verifyFirebase = async (): Promise<boolean> => {
  try {
    console.log("verifying firestore connection..");
    const db: Firestore = getFirestore(app);

    await enableNetwork(db);

    const ref = doc(db, "_healthcheck", "ping");
    await getDoc(ref);
    return true;
  } catch (error) {
    console.error("[firestore connection failed:", error);
    return false;
  }
};

export { app, auth, verifyFirebase };
