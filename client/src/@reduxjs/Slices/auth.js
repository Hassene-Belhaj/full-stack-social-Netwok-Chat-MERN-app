import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authentication: null,

};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    get_profile: (state, action) => {
      state.authentication = action.payload;
    },
    Log_Out : (state) => {
      state.authentication = null ;
      localStorage.removeItem('info');
    }
  },
});

export default auth.reducer;
export const { get_profile , Log_Out } = auth.actions;
