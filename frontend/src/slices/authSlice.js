import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userBasicInfo: localStorage.getItem("userBasicInfo")
    ? JSON.parse(localStorage.getItem("userBasicInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userBasicInfo = action.payload;
      // set the data to the local storage
      localStorage.setItem("userBasicInfo", JSON.stringify(action.payload));
    },
    removeCredentials: (state, action) => {
      state.userBasicInfo = null;
      // remove the info from the local storage
      localStorage.removeItem("userBasicInfo");
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;
