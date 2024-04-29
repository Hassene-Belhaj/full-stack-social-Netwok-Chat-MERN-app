import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authentication: null ,
  isLoggedIn : false ,
  userProfile : null ,
  loading : true ,
  loading_profile : true ,
  error : null ,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {

    sign_in_start : (state ) => {
      state.loading = true ;
      return ;
      },
    sign_in_success : (state,action) => {
      state.loading = false ;
      state.authentication = action.payload ;
      state.error = null ;
      state.isLoggedIn = true ;
      return ;
      },
    sign_in_failure : (state,action) => {
      state.loading = false ; 
      state.error = action.payload ;
      state.isLoggedIn = false ;
      return ;
      },
    start_loading_profile : (state ) => {
      state.loading_profile = true ;
      return ;
     },
     end_loading_profile : (state ) => {
      state.loading_profile = false ;
      return ;
     },
     loading_profile_failure : (state,action) => {
     state.loading_profile = false ;
     state.error = action.payload ;
     },
    Log_Out : (state) => {
      state.authentication = null ;
      return ;
    },
    get_profile : (state , action) => {
      state.userProfile = action.payload ;
      return ;
    },
    // follow_unfollow : (state ,action) => {
    //    state.userProfile.followers.map((id)=>id === action.payload._id ? action.payload : item )
    //    return ;
    // }
  },

});

 

export default auth.reducer;
export const {isLoggedIn_start , isLoggedIn_end , Log_Out ,get_profile , start_loading_auth , end_loading_auth , start_loading_profile , end_loading_profile , loading_profile_failure , sign_in_start , sign_in_success , sign_in_failure } = auth.actions;

