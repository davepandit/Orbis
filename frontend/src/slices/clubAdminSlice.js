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
  }),
});

export const { useGetAllClubMembersQuery } = clubAdminSlice;
