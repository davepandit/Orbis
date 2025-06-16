import { GET_ALL_EVENTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const eventSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => ({
        url: GET_ALL_EVENTS_URL,
      }),
    }),
  }),
});

export const { useGetAllEventsQuery } = eventSlice;
