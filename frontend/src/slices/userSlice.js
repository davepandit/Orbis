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
    makeAdmin: builder.mutation({
      query: ({ user, admin }) => ({
        url: `${USERS_URL}/${admin}/make-admin`,
        method: "PUT",
        body: user,
      }),
    }),
    removeAdmin: builder.mutation({
      query: ({ user, admin }) => ({
        url: `${USERS_URL}/${admin}/remove-as-admin`,
        method: "PUT",
        body: user,
      }),
    }),
    getPendingRequests: builder.query({
      query: (admin) => ({
        url: `${USERS_URL}/${admin}/get-pending-requests`,
        method: "GET",
      }),
    }),
    approveRequest: builder.mutation({
      query: ({ admin, requestId }) => ({
        url: `${USERS_URL}/${admin}/approve-request/${requestId}`,
        method: "POST",
      }),
    }),
    rejectRequest: builder.mutation({
      query: ({ admin, requestId }) => ({
        url: `${USERS_URL}/${admin}/reject-request/${requestId}`,
        method: "POST",
      }),
    }),
    updateAvatar: builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL}/update-avatar`,
        method: "POST",
        body: formData,
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
  useMakeAdminMutation,
  useRemoveAdminMutation,
  useGetPendingRequestsQuery,
  useApproveRequestMutation,
  useRejectRequestMutation,
  useUpdateAvatarMutation,
} = userSlice;
