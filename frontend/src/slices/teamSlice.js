import { TEAMS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const teamSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: ({ name, eventId }) => ({
        url: `${TEAMS_URL}/create-team/${eventId}`,
        method: "POST",
        body: { name },
      }),
    }),
    getUserTeamForEvent: builder.query({
      query: (eventId) => `${TEAMS_URL}/get-user-team/${eventId}`,
    }),
    joinTeam: builder.mutation({
      query: (team_id) => ({
        url: `${TEAMS_URL}/join-team`,
        method: "POST",
        body: { team_id },
      }),
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetUserTeamForEventQuery,
  useJoinTeamMutation,
} = teamSlice;
