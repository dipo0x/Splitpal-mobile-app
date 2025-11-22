// import { env } from "@/src/config/process.env.config";
import { FirebaseApp, initializeApp } from "firebase/app";
import { doc, Firestore, getDoc, getFirestore } from "firebase/firestore";

const firebaseConfig: Record<string, string> = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

let app: FirebaseApp;

try {
  app = initializeApp(firebaseConfig);
  console.log(`firebase initialized!`);
} catch (error) {
  console.error("firebase initialization Failed:", error);
  throw error;
}

const verifyFirebase = async (): Promise<boolean> => {
  try {
    console.log("[Firebase] Verifying Firestore connection...");
    const db: Firestore = getFirestore(app);

    // attempt a read operation; doc does not need to exist
    const ref = doc(db, "_healthcheck", "ping");
    await getDoc(ref);

    console.log("firestore connection OK");
    return true;
  } catch (error) {
    console.error("[firestore connection FAILED:", error);
    return false;
  }
};

export { app, verifyFirebase };
