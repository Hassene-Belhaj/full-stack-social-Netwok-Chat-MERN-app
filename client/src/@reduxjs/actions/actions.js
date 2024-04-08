import { GetProfile, LogOut } from "../api/Api_call";
import { get_profile ,Log_Out,  } from "../Slices/auth";
import { toast } from 'react-hot-toast'



export const GetProfileAction = () => async(dispatch) => {
  try {
    const {data : {user}} = await GetProfile()
    dispatch(get_profile(user))
  } catch (error) {
    return error
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



