import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    posts  : [] ,
    loading : false ,
    error : null ,
})

const post  = createSlice({
    name : 'Post',
    initialState,
    reducers : {
    start_post_loading :(state)  =>{
    state.loading = true ;
    return ;
    },    
    end_post_loading: (state) => {
    state.loading = false ;
    return ;
    }, 
    error_loading:(state,action) => {
    state.loading = false ;
    state.error = action.payload ;
    return;
    },
    }

})


export default post.reducer ;
export const {start_post_loading , end_post_loading , error_loading} = post.actions ;