import { useDispatch } from "react-redux";
import { GetProfile } from "../api/Api_call";
import { get_profile } from "../Slices/auth";




export const GetProfileAction = () => async(dispatch) => {
  try {
    const {data : {user}} = await GetProfile()
    dispatch(get_profile(user))
  } catch (error) {
    console.log(error.response.data.msg)
  }
}