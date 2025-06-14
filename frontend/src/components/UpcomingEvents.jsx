import EventCard from "../utils/EventCard";

const UpcomingEvents = () => {
  // Dummy data array
  const eventsData = [
    {
      id: 1,
      title: "System design of a VPN service!",
      host: "Expertifie",
      date: "SUN, JUN 15",
      time: "12:00 PM IST",
      attendees: 595,
      price: "Free",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title:
        "Inside the Database Engine: MySQL, PostgreSQL & MongoDB - Architecture",
      host: "CoderRange - AI, Big data, Data Science!",
      date: "SUN, JUN 15",
      time: "7:30 PM IST",
      attendees: 902,
      price: "Free",
      image:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "(Online/Free) Free English Conversation Club with global people",
      host: "🗣️ Free Online English Speaking Meetup Organized by...",
      date: "SUN, JUN 15",
      time: "4:30 PM IST",
      attendees: 16,
      price: "Free",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      title: 'T20DSAChallenge | Master "Range Queries & Prefix Sum" in 7 days!',
      host: "Techies of Hyderabad",
      date: "SUN, JUN 15",
      time: "12:01 PM IST",
      attendees: 40,
      price: "Free",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Upcoming online events
          </h2>
          <a
            href="#"
            className="hidden md:flex text-teal-600 hover:text-teal-700 font-medium text-lg hover:underline"
          >
            See all events
          </a>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {eventsData.map((event) => (
            <EventCard key={event.id} event={event} />
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

export default UpcomingEvents;
