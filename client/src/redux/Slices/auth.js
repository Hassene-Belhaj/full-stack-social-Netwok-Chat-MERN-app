import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  authentication: null,
  userProfile : null,
  loading : true,
  status : 'idle'
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {

    start_loading : (state ) => {
     state.loading = true ;
    },
    end_loading : (state ) => {
      state.loading = false;
    },
    Log_Out : (state) => {
      state.authentication = null ;
      localStorage.removeItem('info');
      state.isLoggedIn = false ;
      return ;
    },
    verify_Auth: (state, action) => {
      state.authentication = action.payload;
      return ;
    },
    get_profile : (state , action) => {
      state.userProfile = action.payload ;
      return ;
    },
    follow_unfollow : (state ,action) => {
       state.userProfile.followers.map((item)=>item === action.payload._id ? action.payload : item )
       return ;
    }
    
  },

});

 

export default auth.reducer;
export const { verify_Auth ,isLoggedIn_start , isLoggedIn_end , Log_Out ,get_profile , start_loading , end_loading } = auth.actions;
