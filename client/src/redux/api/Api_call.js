import axios from "axios";

export const verifyAuth = () => axios.get('/user/authentication');

export const LogOut = () => axios.post('/user/logout');

export const GetProfile = (username) => axios.get(`/user/profile/${username}`) 

//feed posts
export const GetFeedPost = () => axios.get('/posts/post/feed') 
export const GetSinglePost = (id) => axios.get(`/posts/${id}`) 
export const CreateNewPost = ({postedBy,text,image,fn}) => axios.post('/posts/new',{postedBy,text,image,fn})
export const GetAllPostProfile = (username) =>axios.get(`/posts/post/${username}`)
export const DeletePost = (id) => axios.delete(`/posts/${id}`)
export const RepliyPost = (id,text) => axios.post(`/posts/post/${id}` , text)


// export const followUnfollow = (id) => axios.get(`/user/follow/${id}`)


