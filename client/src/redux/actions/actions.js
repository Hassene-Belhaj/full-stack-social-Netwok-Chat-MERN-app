import {GetFeedPost, GetProfile, GetSinglePost, LogOut,GetAllPostProfile,verifyAuth, CreateNewPost, DeletePost } from "../api/Api_call";
import {Log_Out,get_profile,start_loading_profile,end_loading_profile,sign_in_failure,sign_in_success, end_loading_auth, loading_profile_failure} from "../Slices/auth";
import { toast } from "react-hot-toast";
import { create_new_post, delete_post, end_post_loading, error_loading, get_posts, get_single_post, start_post_loading } from "../Slices/posts";

export const verifyAuthAction = () => async (dispatch) => {
  try {
    const { data } = await verifyAuth();
    const { user } = data;
    if(data.success) {
    dispatch(sign_in_success(user));
    }
  } catch (error) {
    dispatch(sign_in_failure(error.response.data.msg));
  }
};

export const getProfileAction = (username) => async (dispatch) => {
  try {
    dispatch(start_loading_profile());
    const { data } = await GetProfile(username);
    dispatch(get_profile(data.resp));
    // console.log(data);
    dispatch(end_loading_profile());
  } catch (error) {
    dispatch(loading_profile_failure(error.response.data.msg))
    console.log(error.response.data.msg);
  } 
};

export const LogOutAction = () => async (dispatch) => {
  try {
    const { data } = await LogOut();
    dispatch(Log_Out());
    if (data.success) {
      toast.success(data.msg);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  } catch (error) {
    console.log(error);
  }
}

// export const followUnfollowAction = (id) =>async(dispatch) => {
// try {
//   const {data} = await followUnfollow(id)
//   dipstach(follow_unfollow(data.follow || data.unfollow))
//   console.log(data.follow || data.unfollow)
// } catch (error) {
//  console.log(error)
// }
// }
//post

export const FeedPostAction = () => async(dispatch) => {
  try {
    dispatch(start_post_loading())
    const {data} = await GetFeedPost()
    // console.log(data)
    dispatch(get_posts(data.posts))
    dispatch(end_post_loading())
  } catch (error) {  
    // console.log(error.response.data.msg)
    dispatch(error_loading(error.response.data.msg))
  }
}


export const getSinglePostAction = (id) => async(dispatch) => {
  try {
    dispatch(start_post_loading())
    const {data} = await GetSinglePost(id)
    dispatch(get_single_post(data.resp))
    dispatch(end_post_loading())
  } catch (error) {  
    dispatch(error_loading(error.response.data.msg))
  }
}

export const GetAllPostsProfileAction = (username) => async(dispatch) => {
  try {
    dispatch(start_post_loading())
    const {data} = await GetAllPostProfile(username)
    // console.log(data)
    dispatch(get_posts(data.result))
    dispatch(end_post_loading())
  } catch (error) {
    console.log(error)
    dispatch(error_loading(error.response.data.msg))
  }
}


export const CreateNewPostAction = ({postedBy,text,image,fn}) => async(dispatch) => {
  try {
    dispatch(start_post_loading())
    const {data} = await CreateNewPost({postedBy,text,image}) 
    console.log(data)
    if(data.success) {
      toast.success('post created successfully') ;
    } 
    dispatch(create_new_post(data.newPost))
    dispatch(end_post_loading())
  } catch (error) {
    dispatch(error_loading(error.response.data.msg))
    toast.error(error.response.data.msg);
  }
}


export const DeletePostAction = (id) => async(dispatch) => {
  try {
    dispatch(start_post_loading())
    const {data} = await DeletePost(id)
    dispatch(delete_post(id))
    console.log(data.msg)
    if(data.success) {
      toast.success('post deleted successfully')
    } 
    dispatch(end_post_loading())
  } catch (error) {
    console.log(error)
    dispatch(error_loading(error.response.data.msg))
  }
}