import { CLUBS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const clubSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClubInfo: builder.query({
      query: () => ({
        url: `${CLUBS_URL}/get-club-info`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetClubInfoQuery } = clubSlice;
