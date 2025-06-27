import { apiSlice } from "./apiSlice";
import { USERS_URL, PASSPORT_URL } from "../constants";

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    getMyBasicProfileWithGoogle: builder.query({
      query: () => ({
        url: `${USERS_URL}/my-profile`,
        method: "GET",
      }),
    }),
    completeUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/complete-profile`,
        method: "POST",
        body: data,
      }),
    }),
    getMyExtendedProfile: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/my-extended-profile`,
        method: "GET",
      }),
    }),
    updateProfileInfo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update-profile-info`,
        method: "PUT",
        body: data,
      }),
    }),
    updateEducationInfo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update-education-info`,
        method: "PUT",
        body: data,
      }),
    }),
    updateSocialLinks: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update-social-links`,
        method: "PUT",
        body: data,
      }),
    }),
    updateUserSKills: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update-skills`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMyBasicProfileWithGoogleQuery,
  useCompleteUserProfileMutation,
  useGetMyExtendedProfileQuery,
  useUpdateProfileInfoMutation,
  useUpdateEducationInfoMutation,
  useUpdateSocialLinksMutation,
  useUpdateUserSKillsMutation,
} = userSlice;
