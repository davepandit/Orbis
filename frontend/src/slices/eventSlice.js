import { CLUBS_URL, EVENTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const eventSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // this is to fetch 4 latest events on the home page
    getLatestEvents: builder.query({
      query: () => ({
        url: `${EVENTS_URL}?limit=4&sort=latest`,
      }),
    }),
    getClubEvents: builder.query({
      query: (adminType) => ({
        url: `${EVENTS_URL}/${adminType}/get-club-events`,
        method: "GET",
      }),
    }),
    getSpecificEventDetails: builder.query({
      query: (eventId) => ({
        url: `${EVENTS_URL}/get-event-details/${eventId}`,
        method: "GET",
      }),
    }),
    editBasicEventInfo: builder.mutation({
      query: ({ data, admin, eventId }) => ({
        url: `${EVENTS_URL}/${admin}/edit-basic-event-info/${eventId}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetLatestEventsQuery,
  useGetClubEventsQuery,
  useGetSpecificEventDetailsQuery,
  useEditBasicEventInfoMutation,
} = eventSlice;
