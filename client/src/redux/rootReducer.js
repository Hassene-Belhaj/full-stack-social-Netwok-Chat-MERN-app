import { combineReducers } from "@reduxjs/toolkit";
import auth from "./Slices/auth";
import posts from "./Slices/posts";

const rootReducer = combineReducers({
  auth : auth,
  posts : posts ,
});

export default rootReducer;
