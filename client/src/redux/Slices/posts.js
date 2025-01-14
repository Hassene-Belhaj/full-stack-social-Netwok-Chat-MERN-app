import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    posts  : [] ,
    singlePost : [],
    replies : [],
    loading : true ,
    error : null ,
    isAdded : false,
    // isDeleted : false ,
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
    get_single_post : (state,action) => {
    state.singlePost = action.payload ;
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
    },
    get_user_replies : (state,action) => {
    state.replies = action.payload
    return ;
    },
    // add_reply : (state,action) => {
    // state.replies = [...state.replies , action.payload] ;
    // return ;
    // }
    
    }

})


export default posts.reducer ;
export const {start_post_loading , end_post_loading , error_loading , get_posts ,get_single_post, create_new_post , delete_post , get_user_replies , add_reply} = posts.actions ;