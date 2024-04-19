import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    posts  : [] ,
    loading : false ,
    error : null ,
})

const posts  = createSlice({
    name : 'posts',
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
    get_posts: (state,action) => {
    state.posts = action.payload ;
    }
    }

})


export default posts.reducer ;
export const {start_post_loading , end_post_loading , error_loading , get_posts} = posts.actions ;