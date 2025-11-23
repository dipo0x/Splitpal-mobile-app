import { FirebaseError } from "firebase/app";
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const db = getFirestore();

type AuthResult = { message: string; isEmail: boolean };

type AuthContextType = {
  user: User | null;
  isLoadingUser?: boolean;
  signIn: (
    email: string,
    password: string,
    remember?: boolean
  ) => Promise<AuthResult | null>;
  signUp: (
    email: string,
    password: string,
    fullName: string,

    username: string
  ) => Promise<AuthResult | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string, remember = false) => {
    try {
      const auth = getAuth();
      // const persistence = remember ? browserLocalPersistence : browserSessionPersistence;
      // try {
      //   await setPersistence(auth, persistence);
      // } catch (e) {
      //   console.warn("setPersistence failed", e);
      // }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      return null;
    } catch (error) {
      if (error instanceof FirebaseError) {
        // Map firebase codes to friendly messages and indicate whether
        // the error relates to the email field (isEmail=true) or password/general (false).
        switch (error.code) {
          case "auth/invalid-email":
            return {
              message: "The email address is not valid.",
              isEmail: true,
            };
          case "auth/user-not-found":
            return {
              message: "No account found with this email.",
              isEmail: true,
            };
          case "auth/user-disabled":
            return { message: "This user has been disabled.", isEmail: true };
          case "auth/wrong-password":
            return {
              message: "Incorrect password. Please try again.",
              isEmail: false,
            };
          case "auth/invalid-credential":
            return {
              message: "Email or password is invalid.",
              isEmail: false,
            };
          case "auth/too-many-requests":
            return {
              message: "Too many attempts. Try again later.",
              isEmail: false,
            };
          case "auth/network-request-failed":
            return {
              message: "Network error. Check your connection and try again.",
              isEmail: false,
            };
          default:
            return {
              message: error.message || "An error occurred during sign in.",
              isEmail: false,
            };
        }
      }

      // Non-Firebase errors
      if (error instanceof Error) {
        return { message: error.message, isEmail: false };
      }

      return {
        message: "An unknown error occurred during sign in.",
        isEmail: false,
      };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    username: string,
    remember = false
  ) => {
    try {
      const auth = getAuth();
      const providerData: { fullName: string; username: string } = {
        fullName,
        username,
      };
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      if (user) {
        const uid = user.uid;
        const userData = providerData;
        await setDoc(doc(db, "users", uid), userData);
      }

      setUser(userCredential.user);
      return null;
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            console.log(error);
            return {
              message: "The email address is not valid.",
              isEmail: true,
            };
          case "auth/user-not-found":
            return {
              message: "No account found with this email.",
              isEmail: true,
            };
          case "auth/user-disabled":
            return { message: "This user has been disabled.", isEmail: true };
          case "auth/wrong-password":
            return {
              message: "Incorrect password. Please try again.",
              isEmail: false,
            };
          case "auth/invalid-credential":
            return {
              message: "Email or password is invalid.",
              isEmail: false,
            };
          case "auth/too-many-requests":
            return {
              message: "Too many attempts. Try again later.",
              isEmail: false,
            };
          case "auth/network-request-failed":
            return {
              message: "Network error. Check your connection and try again.",
              isEmail: false,
            };
          case "auth/email-already-in-use":
            return {
              message: "Email already in use.",
              isEmail: true,
            };
          default:
            return {
              message: error.message || "An error occurred during sign in.",
              isEmail: false,
            };
        }
      }

      // Non-Firebase errors
      if (error instanceof Error) {
        return { message: error.message, isEmail: false };
      }

      return {
        message: "An unknown error occurred during sign in.",
        isEmail: false,
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoadingUser, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be inside AuthProvider");
  }
  return context;
}
