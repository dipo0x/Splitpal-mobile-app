import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../src/screens/auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
