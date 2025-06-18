import EventCard from "../utils/EventCard";

// hooks from RTK query
import { useGetLatestEventsQuery } from "../slices/eventSlice";

const UpcomingEvents = () => {
  const { data: latestEvents, isLoading, error } = useGetLatestEventsQuery();
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

  const sampleParticipants = [
    {
      id: "1",
      avatar: "/placeholder.webp?height=32&width=32",
      name: "John Doe",
    },
    {
      id: "2",
      avatar: "/placeholder.webp?height=32&width=32",
      name: "Jane Smith",
    },
    {
      id: "3",
      avatar: "/placeholder.webp?height=32&width=32",
      name: "Mike Johnson",
    },
  ];

  const sampleEvents = [
    {
      title: "here we go",
      subtitle: "here we go again",
      theme: "artificial intelligence",
      participants: sampleParticipants,
      participantCount: 1000,
      status: {
        mode: "OFFLINE",
        registration: "OPEN",
        startDate: "STARTS 11/07/25",
      },
      onLinkClick: () => console.log("Link clicked"),
      onGroupClick: () => console.log("Group clicked"),
      onApplyClick: () => console.log("Apply clicked"),
    },
  ];

  if (isLoading) {
    return <p>Loading....</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  console.log("latest events:", latestEvents);

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Upcoming events</h2>
          <a
            href="#"
            className="hidden md:flex text-teal-600 hover:text-teal-700 font-medium text-lg hover:underline"
          >
            See all events
          </a>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {sampleEvents?.map((sampleEvent, index) => (
            <EventCard
              key={index}
              title={sampleEvent.title}
              subtitle={sampleEvent.subtitle}
              theme={sampleEvent.theme}
              participants={sampleParticipants}
              participantCount={sampleEvent.participantCount}
              status={sampleEvent.status}
              onLinkClick={sampleEvent.onLinkClick}
              onGroupClick={sampleEvent.onGroupClick}
              onApplyClick={sampleEvent.onApplyClick}
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

export default UpcomingEvents;
