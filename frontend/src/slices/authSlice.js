import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userBasicInfo: localStorage.getItem("userBasicInfo")
    ? JSON.parse(localStorage.getItem("userBasicInfo"))
    : null,
  userProfileInfo: localStorage.getItem("userProfileInfo")
    ? JSON.parse(localStorage.getItem("userProfileInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setBasicUserCredentials: (state, action) => {
      state.userBasicInfo = action.payload;
      // set the data to the local storage
      localStorage.setItem("userBasicInfo", JSON.stringify(action.payload));
    },
    setUserProfileCredentials: (state, action) => {
      (state.userProfileInfo = action.payload),
        // set the data to the local storage
        localStorage.setItem("userProfileInfo", JSON.stringify(action.payload));
    },
    removeCredentials: (state, action) => {
      state.userBasicInfo = null;
      (state.userProfileInfo = null),
        // remove the info from the local storage
        localStorage.removeItem("userBasicInfo");
      localStorage.removeItem("userProfileInfo");
    },
  },
});

export const {
  setBasicUserCredentials,
  setUserProfileCredentials,
  removeCredentials,
} = authSlice.actions;
export default authSlice.reducer;
