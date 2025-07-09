import React from "react";
import { Link } from "react-router-dom";
import { useGetSpecificEventDetailsQuery } from "../slices/eventSlice";
import { useGetEventTimelineQuery } from "../slices/eventSlice";
import { useGetEventScheduleQuery } from "../slices/eventSlice";
import { useGetEventPeopleDetailedInfoQuery } from "../slices/eventSlice";
import { useGetEventSponsorsQuery } from "../slices/eventSlice";
import { useGetEventPrizesQuery } from "../slices/eventSlice";
import { useGetEventFaqsQuery } from "../slices/eventSlice";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

import { useParams } from "react-router-dom";
import SpinnerAnimation from "../utils/Spinner";

const EventOverview = () => {
  const { eventId } = useParams();
  const { data: prizes, isLoading: prizeLoading } =
    useGetEventPrizesQuery(eventId);
  const { data: faqs, isLoading: faqsLoading } = useGetEventFaqsQuery(eventId);

  const {
    data: event,
    isLoading: eventInfoLoading,
    refetch,
  } = useGetSpecificEventDetailsQuery(eventId);

  const { data: eventTimeline, isLoading: dataLoading } =
    useGetEventTimelineQuery(eventId);
  const { data: eventSchedule, isLoading: scheduleLoading } =
    useGetEventScheduleQuery(eventId);
  const {
    data: eventPeople,
    isLoading: eventPeopleLoading,
    error,
  } = useGetEventPeopleDetailedInfoQuery(eventId);
  const { data: sponsorsData, isLoading: sponsorsDataLoading } =
    useGetEventSponsorsQuery(eventId);

  if (eventInfoLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }

  if (dataLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }

  if (scheduleLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }
  if (eventPeopleLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }
  if (faqsLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }

  if (sponsorsDataLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }
  if (prizeLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }
  return (
    <>
      <div className="text-center mt-3 text-red-500 hover:cursor-pointer font-bold text-2xl mb-11">
        <Link to="/">Orbis</Link>
      </div>

      {/* basic event info  */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Event Header */}
        <div className="border-b pb-6 mb-8">
          <h1 className="text-3xl font-bold text-ired">{event.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{event.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700">
            <span className="bg-gray-100 px-3 py-1 rounded-md font-medium">
              Mode:{" "}
              <span className="font-semibold capitalize">{event.mode}</span>
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-md font-medium">
              Status:{" "}
              <span className="font-semibold capitalize">{event.status}</span>
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-md font-medium">
              Visibility:{" "}
              <span className="font-semibold capitalize">
                {event.event_visibility}
              </span>
            </span>
          </div>
        </div>

        {/* Organised By */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Organised By
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {event.organised_by.map((club) => (
              <li key={club.value} className="capitalize">
                {club.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Team & Participation */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">
              Max Participants
            </h3>
            <p className="text-lg font-semibold text-gray-800">
              {event.max_participants}
            </p>
          </div>
          <div className="bg-white border p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Min Team Size</h3>
            <p className="text-lg font-semibold text-gray-800">
              {event.min_team_size}
            </p>
          </div>
          <div className="bg-white border p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Max Team Size</h3>
            <p className="text-lg font-semibold text-gray-800">
              {event.max_team_size}
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            About the Event
          </h2>
          <p className="text-gray-700 leading-relaxed">{event.about}</p>
        </div>

        {/* Theme Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Theme</h2>
          <p className="text-lg font-medium text-ired mb-1">
            {event.themeName}
          </p>
          <p className="text-gray-700">{event.themeDescription}</p>
        </div>
      </div>

      {/* event timeline info  */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-ired mb-6">Event Timeline</h2>

        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          {/* Application Period */}
          <div className="bg-white border rounded-lg shadow-sm p-5">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Application Period
            </h3>
            <p>
              <span className="font-medium">Start:</span>{" "}
              {new Date(
                eventTimeline.timeline.application_start
              ).toLocaleString("en-IN")}
            </p>
            <p>
              <span className="font-medium">End:</span>{" "}
              {new Date(eventTimeline.timeline.application_end).toLocaleString(
                "en-IN"
              )}
            </p>
          </div>

          {/* RSVP Deadline */}
          <div className="bg-white border rounded-lg shadow-sm p-5">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              RSVP Deadline
            </h3>
            <p>
              {new Date(eventTimeline.timeline.rsvp_deadline).toLocaleString(
                "en-IN"
              )}
            </p>
          </div>

          {/* Event Period */}
          <div className="bg-white border rounded-lg shadow-sm p-5">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Event Dates
            </h3>
            <p>
              <span className="font-medium">Start:</span>{" "}
              {new Date(eventTimeline.timeline.event_start).toLocaleString(
                "en-IN"
              )}
            </p>
            <p>
              <span className="font-medium">End:</span>{" "}
              {new Date(eventTimeline.timeline.event_end).toLocaleString(
                "en-IN"
              )}
            </p>
          </div>

          {/* Timezone Info */}
          <div className="bg-white border rounded-lg shadow-sm p-5">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Timezone
            </h3>
            <p className="font-medium text-gray-600">
              {eventTimeline.timeline.timezone}
            </p>
          </div>
        </div>
      </div>

      {/* event detailed schedule  */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-ired mb-6">Event Schedule</h2>

        <div className="space-y-6">
          {eventSchedule?.schedule?.map((day, index) => (
            <div key={index}>
              {/* Date Header */}
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1 mb-3">
                {new Date(day.date).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h3>

              {/* Schedule Items */}
              <div className="space-y-4">
                {day.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-semibold text-gray-700">
                        {item.title}
                      </h4>
                      <span className="text-sm text-gray-500 font-medium">
                        {item.start_time} - {item.end_time}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* event people  */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl p-6 mt-8 shadow border border-gray-200">
          <h2 className="text-2xl font-bold text-ired mb-6">Event People</h2>

          {/* Event Admins */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Event Admins
            </h3>
            <div className="flex flex-wrap gap-6">
              {eventPeople.people["event-admin"].map((person, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 w-full sm:w-60 shadow-sm bg-gray-50"
                >
                  <p className="text-lg font-semibold text-gray-700">
                    {person.first_name}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">{person.bio}</p>
                  <div className="flex space-x-3 text-ired text-lg">
                    {person.social_links.github && (
                      <a
                        href={person.social_links.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {person.social_links.twitter && (
                      <a
                        href={person.social_links.twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaTwitter />
                      </a>
                    )}
                    {person.social_links.linkedin && (
                      <a
                        href={person.social_links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Judges */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Judges</h3>
            <div className="flex flex-wrap gap-6">
              {eventPeople.people["judge"].map((person, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 w-full sm:w-60 shadow-sm bg-gray-50"
                >
                  <p className="text-lg font-semibold text-gray-700">
                    {person.first_name}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">{person.bio}</p>
                  <div className="flex space-x-3 text-ired text-lg">
                    {person.social_links.github && (
                      <a
                        href={person.social_links.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {person.social_links.twitter && (
                      <a
                        href={person.social_links.twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaTwitter />
                      </a>
                    )}
                    {person.social_links.linkedin && (
                      <a
                        href={person.social_links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Speakers */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Speakers
            </h3>
            <div className="flex flex-wrap gap-6">
              {eventPeople.people["speaker"].map((person, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 w-full sm:w-60 shadow-sm bg-gray-50"
                >
                  <p className="text-lg font-semibold text-gray-700">
                    {person.first_name}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">{person.bio}</p>
                  <div className="flex space-x-3 text-ired text-lg">
                    {person.social_links.github && (
                      <a
                        href={person.social_links.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {person.social_links.twitter && (
                      <a
                        href={person.social_links.twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaTwitter />
                      </a>
                    )}
                    {person.social_links.linkedin && (
                      <a
                        href={person.social_links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* event sponsors  */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-ired pb-2 mb-8 border-b w-full">
          Our Sponsors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sponsorsData?.sponsors?.map((sponsor) => (
            <a
              href={`${sponsor.website_url}`}
              target="_blank"
              rel="noopener noreferrer"
              key={sponsor._id}
              className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition duration-300"
            >
              <img
                src={sponsor.logo_url}
                alt={sponsor.name}
                className="h-24 w-auto object-contain mb-4"
              />
              <h3 className="text-lg font-medium text-gray-800">
                {sponsor.name}
              </h3>
              <span
                className={`mt-1 text-sm font-semibold uppercase px-3 py-1 rounded-full ${
                  sponsor.tier === "gold"
                    ? "bg-yellow-100 text-yellow-800"
                    : sponsor.tier === "silver"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {sponsor.tier}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* event prizes  */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-ired pb-2 mb-6 border-b w-full">
          Prizes
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {prizes?.map((prize, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-ired capitalize">
                🏆 {prize.position} Prize
              </h3>
              <p className="text-gray-700 mt-2 text-lg font-medium">
                {prize.prize_value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* event faqs  */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-ired pb-2 mb-6 border-b w-full">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs?.map((faq) => (
            <div
              key={faq._id}
              className="border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ❓ {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventOverview;
