import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { auth } from "../../lib/firebase.lib";
import {
  clearTokens,
  isTokenExpired,
  saveTokens,
} from "../../lib/securestorage.lib";
import { AppUser, getUser } from "../../lib/user.lib";

const db = getFirestore();

export type AuthResult = { message: string; isEmail: boolean };

interface AuthState {
  user: User | null;
  appUser: AppUser | null;
  isLoadingUser: boolean;
  isAuthenticating: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  appUser: null,
  isLoadingUser: true,
  isAuthenticating: false,
  error: null,
};

export const signInAsync = createAsyncThunk(
  "auth/signIn",
  async (
    {
      email,
      password,
      remember = false,
    }: { email: string; password: string; remember?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await clearTokens();

      const idToken = await userCredential.user.getIdToken();
      const tokenResult = await userCredential.user.getIdTokenResult();

      const expiresAt = tokenResult.expirationTime
        ? Math.floor(new Date(tokenResult.expirationTime).getTime() / 1000) *
          1000
        : undefined;

      await saveTokens(userCredential.user.uid, idToken, "", expiresAt);

      return userCredential.user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        let message = "An error occurred during sign in.";
        let isEmail = false;

        switch (error.code) {
          case "auth/invalid-email":
            message = "The email address is not valid.";
            isEmail = true;
            break;
          case "auth/user-not-found":
            message = "No account found with this email.";
            isEmail = true;
            break;
          case "auth/user-disabled":
            message = "This user has been disabled.";
            isEmail = true;
            break;
          case "auth/wrong-password":
            message = "Incorrect password. Please try again.";
            isEmail = false;
            break;
          case "auth/invalid-credential":
            message = "Email or password is invalid.";
            isEmail = false;
            break;
          case "auth/too-many-requests":
            message = "Too many attempts. Try again later.";
            isEmail = false;
            break;
          case "auth/network-request-failed":
            message = "Network error. Check your connection and try again.";
            isEmail = false;
            break;
          default:
            message = error.message || "An error occurred during sign in.";
            isEmail = false;
        }

        return rejectWithValue({ message, isEmail });
      }

      return rejectWithValue({
        message: "An unknown error occurred during sign in.",
        isEmail: false,
      });
    }
  }
);

export const signUpAsync = createAsyncThunk(
  "auth/signUp",
  async (
    {
      email,
      password,
      fullName,
      username,
    }: {
      email: string;
      password: string;
      fullName: string;
      username: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      if (user) {
        const userId = user.uid;
        const userData = {
          fullName,
          username,
          userId,
        };

        await setDoc(doc(db, "users", userId), userData);
      }

      await clearTokens();

      const idToken = await userCredential.user.getIdToken();
      const tokenResult = await userCredential.user.getIdTokenResult();

      const expiresAt = tokenResult.expirationTime
        ? Math.floor(new Date(tokenResult.expirationTime).getTime() / 1000) *
          1000
        : undefined;

      await saveTokens(userCredential.user.uid, idToken, "", expiresAt);

      return userCredential.user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        let message = "An error occurred during sign up.";
        let isEmail = false;

        switch (error.code) {
          case "auth/invalid-email":
            message = "The email address is not valid.";
            isEmail = true;
            break;
          case "auth/email-already-in-use":
            message = "Email already in use.";
            isEmail = true;
            break;
          case "auth/weak-password":
            message = "Password should be at least 6 characters.";
            isEmail = false;
            break;
          case "auth/network-request-failed":
            message = "Network error. Check your connection and try again.";
            isEmail = false;
            break;
          default:
            message = error.message || "An error occurred during sign up.";
            isEmail = false;
        }

        return rejectWithValue({ message, isEmail });
      }

      return rejectWithValue({
        message: "An unknown error occurred during sign up.",
        isEmail: false,
      });
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      await clearTokens();
    } catch (error) {
      console.log(error)
      return rejectWithValue("Error signing out");
    }
  }
);

export const initializeAuthAsync = createAsyncThunk(
  "auth/initialize",
  async (_, { dispatch }) => {
    return new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const isExpired = await isTokenExpired();

          if (isExpired) {
            try {
              const newIdToken = await user.getIdToken(true);
              const tokenResult = await user.getIdTokenResult();

              const expiresAt = tokenResult.expirationTime
                ? Math.floor(
                    new Date(tokenResult.expirationTime).getTime() / 1000
                  ) * 1000
                : undefined;

              await saveTokens(user.uid, newIdToken, "", expiresAt);
            } catch {
              await signOut(auth);
              await clearTokens();
              dispatch(setUser(null));
              dispatch(setAppUser(null));
              dispatch(setLoadingUser(false));
              resolve();
              return;
            }
          }

          const combinedUser = await getUser();
          dispatch(setUser(user));
          dispatch(setAppUser(combinedUser));
        } else {
          try {
            await clearTokens();
          } catch (error) {
            console.error("Error clearing tokens:", error);
          }
          dispatch(setUser(null));
          dispatch(setAppUser(null));
        }

        dispatch(setLoadingUser(false));
        resolve();
      });

      return unsubscribe;
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setAppUser: (state, action: PayloadAction<AppUser | null>) => {
      state.appUser = action.payload;
    },
    setLoadingUser: (state, action: PayloadAction<boolean>) => {
      state.isLoadingUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.isAuthenticating = true;
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error =
          (action.payload as AuthResult)?.message || "Sign in failed";
      })
      // Sign Up
      .addCase(signUpAsync.pending, (state) => {
        state.isAuthenticating = true;
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error =
          (action.payload as AuthResult)?.message || "Sign up failed";
      })
      // Sign Out
      .addCase(signOutAsync.fulfilled, (state) => {
        state.user = null;
        state.appUser = null;
        state.error = null;
      })
      // Initialize Auth
      .addCase(initializeAuthAsync.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(initializeAuthAsync.fulfilled, (state) => {
        state.isLoadingUser = false;
      });
  },
});

export const { setUser, setAppUser, setLoadingUser, clearError } =
  authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAppUser = (state: { auth: AuthState }) => state.auth.appUser;
export const selectIsLoadingUser = (state: { auth: AuthState }) =>
  state.auth.isLoadingUser;
export const selectIsAuthenticating = (state: { auth: AuthState }) =>
  state.auth.isAuthenticating;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
