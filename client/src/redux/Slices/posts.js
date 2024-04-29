import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    posts  : [] ,
    loading : true ,
    error : null ,
    isAdded : false,
    isDeleted : false ,
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
    state.isAdded = false ;
    state.isDeleted = false ;
    return ;
    },
    create_new_post : (state,action) => {
    state.posts = [...state.posts , action.payload] ;
    state.isAdded  = true ;
    return ; 
},
    delete_post : (state,action) => {
    const filter = state.posts.filter((post)=>post._id !== action.payload) ;
    state.posts = filter ;
    state.isDeleted = true ;
    return ;    
    }

    }

})


export default posts.reducer ;
export const {start_post_loading , end_post_loading , error_loading , get_posts , create_new_post , delete_post} = posts.actions ;