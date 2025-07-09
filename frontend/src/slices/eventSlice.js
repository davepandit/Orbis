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
    editEventTimeline: builder.mutation({
      query: ({ data, admin, eventId }) => ({
        url: `${EVENTS_URL}/${admin}/edit-event-timeline/${eventId}`,
        method: "POST",
        body: data,
      }),
    }),
    getEventTimeline: builder.query({
      query: (eventId) => ({
        url: `${EVENTS_URL}/get-event-timeline/${eventId}`,
        method: "GET",
      }),
    }),
    editEventSchedule: builder.mutation({
      query: ({ days, admin, eventId }) => ({
        url: `${EVENTS_URL}/${admin}/edit-event-schedule/${eventId}`,
        method: "POST",
        body: days,
      }),
    }),
    getEventSchedule: builder.query({
      query: (eventId) => ({
        url: `${EVENTS_URL}/get-event-schedule/${eventId}`,
        method: "GET",
      }),
    }),
    editEventPeople: builder.mutation({
      query: ({ people, admin, eventId }) => ({
        url: `${EVENTS_URL}/${admin}/edit-event-people/${eventId}`,
        method: "POST",
        body: people,
      }),
    }),
    getEventPeople: builder.query({
      query: (eventId) => ({
        url: `${EVENTS_URL}/get-event-people/${eventId}`,
        method: "GET",
      }),
    }),
    editEventSponsors: builder.mutation({
      query: ({ formData, admin, eventId }) => ({
        url: `${EVENTS_URL}/${admin}/edit-event-sponsors/${eventId}`,
        method: "POST",
        body: formData,
      }),
    }),
    editEventPrizes: builder.mutation({
      query: ({ prizes, admin, eventId }) => ({
        url: `${EVENTS_URL}/${admin}/edit-event-prizes/${eventId}`,
        method: "POST",
        body: prizes,
      }),
    }),
    getEventPrizes: builder.query({
      query: (eventId) => ({
        url: `${EVENTS_URL}/get-event-prizes/${eventId}`,
        method: "GET",
      }),
    }),
    editEventFaqs: builder.mutation({
      query: ({ faqs, admin, eventId }) => ({
        url: `${EVENTS_URL}/${admin}/edit-event-faqs/${eventId}`,
        method: "POST",
        body: faqs,
      }),
    }),
    getEventFaqs: builder.query({
      query: (eventId) => ({
        url: `${EVENTS_URL}/get-event-faqs/${eventId}`,
        method: "GET",
      }),
    }),
    deleteEvent: builder.mutation({
      query: ({ admin, eventId }) => ({
        url: `${EVENTS_URL}/${admin}/delete-event/${eventId}`,
        method: "DELETE",
      }),
    }),
    getFilteredEvents: builder.query({
      query: ({ status, publication_status }) => ({
        url: `${EVENTS_URL}/get-filtered-events`,
        method: "GET",
        params: { status, publication_status },
      }),
    }),
    getUserEvents: builder.query({
      query: () => ({
        url: `${EVENTS_URL}/get-user-events`,
        method: "GET",
      }),
    }),
    getEventPeopleDetailedInfo: builder.query({
      query: (eventId) => ({
        url: `${EVENTS_URL}/get-event-people-detailed-info/${eventId}`,
        method: "GET",
      }),
    }),
    getEventSponsors: builder.query({
      query: (eventId) => ({
        url: `${EVENTS_URL}/get-event-sponsors/${eventId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetLatestEventsQuery,
  useGetClubEventsQuery,
  useGetSpecificEventDetailsQuery,
  useEditBasicEventInfoMutation,
  useEditEventTimelineMutation,
  useGetEventTimelineQuery,
  useEditEventScheduleMutation,
  useGetEventScheduleQuery,
  useEditEventPeopleMutation,
  useGetEventPeopleQuery,
  useEditEventSponsorsMutation,
  useEditEventPrizesMutation,
  useGetEventPrizesQuery,
  useEditEventFaqsMutation,
  useGetEventFaqsQuery,
  useDeleteEventMutation,
  useGetFilteredEventsQuery,
  useGetUserEventsQuery,
  useGetEventPeopleDetailedInfoQuery,
  useGetEventSponsorsQuery,
} = eventSlice;
