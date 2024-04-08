import axios from "axios";


export const GetProfile = () => axios.get('/user/profile');

export const LogOut = () => axios.post('/user/logout');