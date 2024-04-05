import { combineReducers } from "@reduxjs/toolkit";
import auth from "./Slices/auth";

const rootReducer = combineReducers({
  auth: auth,
});

export default rootReducer;
