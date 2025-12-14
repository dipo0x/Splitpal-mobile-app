import { User } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from "./firebase.lib";

const db = getFirestore();

export interface FirestoreUserData {
  fullName: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppUser extends User {
  fullName?: string;
  username?: string;
}

export async function getUser(): Promise<AppUser | null> {
  try {
    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
      return null;
    }

    const userDocRef = doc(db, "users", firebaseUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      return firebaseUser as AppUser;
    }

    const firestoreData = userDocSnap.data() as FirestoreUserData;

    const appUser: AppUser = {
      ...firebaseUser,
      fullName: firestoreData.fullName,
      username: firestoreData.username,
    };

    return appUser;
  } catch (error) {
    console.error("error fetching user data:", error);

    return auth.currentUser as AppUser | null;
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
