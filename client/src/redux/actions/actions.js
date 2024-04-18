import { GetProfile, LogOut,verifyAuth } from "../api/Api_call";
import {Log_Out,get_profile,start_loading_profile,end_loading_profile,sign_in_failure,sign_in_success} from "../Slices/auth";
import { toast } from "react-hot-toast";

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
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(end_loading_profile());
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



