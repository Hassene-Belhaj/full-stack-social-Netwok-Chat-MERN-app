import { combineReducers } from "@reduxjs/toolkit";
import auth from "./Slices/auth";
import post from "./Slices/post";

const rootReducer = combineReducers({
  auth : auth,
  post,
});

export default rootReducer;
