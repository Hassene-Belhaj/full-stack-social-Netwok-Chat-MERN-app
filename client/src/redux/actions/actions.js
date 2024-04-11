import { followUnfollow, GetProfile, LogOut, verifyAuth } from "../api/Api_call";
import { verify_Auth, Log_Out, get_profile, start_loading, end_loading } from "../Slices/auth";
import { toast } from 'react-hot-toast'



export const verifyAuthAction = () => async(dispatch) => {
  try {
    start_loading()
    const {data : {user}} = await verifyAuth()
    dispatch(verify_Auth(user))
  } catch (error) {
    localStorage.removeItem('info')
    return error
  } 
  finally {
    end_loading()
  }
}

export const LogOutAction = () => async(dispatch) => {
  try {
    const data = await LogOut()
    dispatch(Log_Out())
    console.log(data)
    if(data.status === 200) {
      toast.success(data.data.msg)
    }
  } catch (error) {
    console.log(error)
  }
}



export const getProfileAction = (username) => async(dispatch) => {
  try {
    dispatch(start_loading())
    const {data} = await GetProfile(username)
    dispatch(get_profile(data.resp))
    console.log(data)
  } catch (error) {
  } finally {
      dispatch(end_loading())
  }
}


export const followUnfollowAction = (id) =>async(dispatch) => {
try {
  const {data} = await followUnfollow(id)
  dipstach(follow_unfollow(data.follow || data.unfollow))
  console.log(data.follow || data.unfollow)
} catch (error) {
 console.log(error) 
}
}