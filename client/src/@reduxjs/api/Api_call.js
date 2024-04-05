import axios from "axios";


export const GetProfile = () => axios.get('/user/profile');

