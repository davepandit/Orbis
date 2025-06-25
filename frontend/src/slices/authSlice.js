import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userBasicInfo: localStorage.getItem("userBasicInfo")
    ? JSON.parse(localStorage.getItem("userBasicInfo"))
    : null,
  userProfileInfo: localStorage.getItem("userProfileInfo")
    ? JSON.parse(localStorage.getItem("userProfileInfo"))
    : null,
  userEducationInfo: localStorage.getItem("userEducationInfo")
    ? JSON.parse(localStorage.getItem("userEducationInfo"))
    : null,
  userSkills: localStorage.getItem("userSkills")
    ? JSON.parse(localStorage.getItem("userSkills"))
    : null,
  userSocialLinks: localStorage.getItem("userSocialLinks")
    ? JSON.parse(localStorage.getItem("userSocialLinks"))
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
    setUserEducationCredentials: (state, action) => {
      (state.userEducationInfo = action.payload),
        // set the data to the local storage
        localStorage.setItem(
          "userEducationInfo",
          JSON.stringify(action.payload)
        );
    },
    setUserSkills: (state, action) => {
      (state.userSkills = action.payload),
        // set the data to the local storage
        localStorage.setItem("userSkills", JSON.stringify(action.payload));
    },
    setUserSocialCredentials: (state, action) => {
      (state.userSocialLinks = action.payload),
        // set the data to the local storage
        localStorage.setItem("userSocialLinks", JSON.stringify(action.payload));
    },
    removeCredentials: (state, action) => {
      state.userBasicInfo = null;
      (state.userProfileInfo = null),
        // remove the info from the local storage
        localStorage.removeItem("userBasicInfo");
      localStorage.removeItem("userProfileInfo");
      localStorage.removeItem("userEducationInfo");
    },
  },
});

export const {
  setBasicUserCredentials,
  setUserProfileCredentials,
  setUserEducationCredentials,
  setUserSkills,
  setUserSocialCredentials,
  removeCredentials,
} = authSlice.actions;
export default authSlice.reducer;
