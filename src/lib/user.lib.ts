import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from "./firebase.lib";

const db = getFirestore();

export interface FirestoreUserData {
  fullName: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  fullName?: string;
  username?: string;
  isAnonymous: boolean;
  metadata: {
    creationTime?: string;
    lastSignInTime?: string;
  };
}

export async function getUser(): Promise<AppUser | null> {
  try {
    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
      return null;
    }

    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    const firestoreData = userDocSnap.exists()
      ? (userDocSnap.data() as FirestoreUserData)
      : null;

    // Create a serializable user object
    const appUser: AppUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      emailVerified: firebaseUser.emailVerified,
      phoneNumber: firebaseUser.phoneNumber,
      photoURL: firebaseUser.photoURL,
      isAnonymous: firebaseUser.isAnonymous,
      metadata: {
        creationTime: firebaseUser.metadata.creationTime,
        lastSignInTime: firebaseUser.metadata.lastSignInTime,
      },
      fullName: firestoreData?.fullName,
      username: firestoreData?.username,
    };

    return appUser;
  } catch (error) {
    console.error("error fetching user data:", error);
    return null;
  }
}

export async function getUserData(): Promise<FirestoreUserData | null> {
  try {
    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
      return null;
    }

    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      return null;
    }

    return userDocSnap.data() as FirestoreUserData;
  } catch (error) {
    console.error("error fetching user from firestore:", error);
    return null;
  }
}
