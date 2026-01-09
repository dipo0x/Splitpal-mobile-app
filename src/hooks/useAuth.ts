import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../app/store";
import {
  clearError,
  initializeAuthAsync,
  selectAppUser,
  selectAuthError,
  selectIsAuthenticating,
  selectIsLoadingUser,
  selectUser,
  signInAsync,
  signOutAsync,
  signUpAsync,
  type AuthResult,
} from "../screens/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const appUser = useSelector(selectAppUser);
  const isLoadingUser = useSelector(selectIsLoadingUser);
  const isAuthenticating = useSelector(selectIsAuthenticating);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(initializeAuthAsync());
  }, [dispatch]);

  const signIn = async (
    email: string,
    password: string,
    remember?: boolean
  ): Promise<AuthResult | null> => {
    try {
      await dispatch(signInAsync({ email, password, remember })).unwrap();
      return null;
    } catch (error) {
      return error as AuthResult;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    username: string
  ): Promise<AuthResult | null> => {
    try {
      await dispatch(
        signUpAsync({ email, password, fullName, username })
      ).unwrap();
      return null;
    } catch (error) {
      return error as AuthResult;
    }
  };

  const signOut = async () => {
    try {
      await dispatch(signOutAsync()).unwrap();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return {
    user,
    appUser,
    isLoadingUser,
    isAuthenticating,
    error,
    signIn,
    signUp,
    signOut,
    clearError: () => dispatch(clearError()),
  };
};
