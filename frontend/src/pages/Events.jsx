import React from "react";
import { useGetUserEventsQuery } from "../slices/eventSlice";
import EventCard from "../utils/EventCard";
import { Link } from "react-router-dom";

const Events = () => {
  const { data, isLoading } = useGetUserEventsQuery();
  console.log("data: ", data);
  return (
    <>
      <div className="text-center mt-3 text-red-500 hover:cursor-pointer font-bold text-2xl mb-11">
        <Link to="/">Orbis</Link>
      </div>
      <section className=" rounded-xl max-w-7xl mx-auto">
        {/* Events Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {data?.events?.map((event) => (
            <EventCard
              key={event._id}
              name={event.name}
              tagline={event.tagline}
              mode={event.mode}
              type={event.event_visibility}
              status={event.status}
              applicationLink={`${event._id}`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Events;
