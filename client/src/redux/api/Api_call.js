import axios from "axios";

export const verifyAuth = () => axios.get('/user/authentication');

export const LogOut = () => axios.post('/user/logout');

export const GetProfile = (username) => axios.get(`/user/profile/${username}`) 

//feed posts
export const GetFeedPost = () => axios.get('/posts/post/feed') 


// export const followUnfollow = (id) => axios.get(`/user/follow/${id}`)
