import { EVENTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const eventSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // this is to fetch 4 latest events on the home page
    getLatestEvents: builder.query({
      query: () => ({
        url: `${EVENTS_URL}?limit=4&sort=latest`,
      }),
    }),
  }),
});

export const { useGetLatestEventsQuery } = eventSlice;
