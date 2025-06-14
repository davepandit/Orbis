import React from "react";
import { FaCalendarAlt, FaUsers, FaTag, FaVideo } from "react-icons/fa";

// EventCard Component
const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden hover:cursor-pointer">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {/* Online Event Badge */}
        <div className="absolute top-3 left-3 bg-gray-800 bg-opacity-80 text-white px-2 py-1 rounded flex items-center text-sm">
          <FaVideo className="w-3 h-3 mr-1" />
          Online Event
        </div>
      </div>

      {/* Event Content */}
      <div className="p-4">
        {/* Event Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Host Information */}
        <p className="text-gray-600 text-sm mb-3">
          Hosted by: <span className="font-medium">{event.host}</span>
        </p>

        {/* Event Date & Time */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <FaCalendarAlt className="w-4 h-4 mr-2" />
          <span>
            {event.date} • {event.time}
          </span>
        </div>

        {/* Attendees and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600 text-sm">
            <FaUsers className="w-4 h-4 mr-1" />
            <span>{event.attendees} going</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <FaTag className="w-4 h-4 mr-1" />
            <span className="font-medium">{event.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
