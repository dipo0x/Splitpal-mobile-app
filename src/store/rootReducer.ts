import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../screens/auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
