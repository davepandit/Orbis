import EventCard from "../utils/EventCard";
import { useGetFilteredEventsQuery } from "../slices/eventSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LatestEvents = () => {
  const { data, isLoading } = useGetFilteredEventsQuery({
    status: "upcoming",
    publication_status: "published",
  });

  useEffect(() => {
    if (data?.events) {
      console.log("Filtered Events:", data.events);
    }
  }, [data]);
  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Upcoming events</h2>
          <Link
            to="/all-events"
            className="hidden md:flex text-teal-600 hover:text-teal-700 font-medium text-lg hover:underline"
          >
            See all events
          </Link>
        </div>

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

        <div className="mt-5">
          <a
            href="#"
            className="md:hidden text-teal-600 hover:text-teal-700 font-medium text-lg hover:underline"
          >
            See all events
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestEvents;
