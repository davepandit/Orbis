import React from "react";
import Hero from "../components/Hero";
import UpcomingEvents from "../components/UpcomingEvents";

// hooks from RTK
import { useGetLatestEventsQuery } from "../slices/eventSlice";

const Home = () => {
  const { data: events, isLoading, error } = useGetLatestEventsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading events {error.message}</p>;
  return (
    <>
      <Hero />
      <UpcomingEvents />
      <div>{events.message}</div>
    </>
  );
};

export default Home;
