import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

const clubAdminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClubMembers: builder.query({
      query: (adminType) => ({
        url: `${USERS_URL}/${adminType}/get-all-club-members`,
        method: "GET",
      }),
    }),
    removeUserFromClub: builder.mutation({
      query: ({admin, username}) => ({
        url: `${USERS_URL}/${admin}/remove-user/${username}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetAllClubMembersQuery, useRemoveUserFromClubMutation } =
  clubAdminSlice;
