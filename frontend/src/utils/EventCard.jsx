import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const EventCard = ({
  name,
  tagline,
  mode, // 'online' or 'offline'
  type, // 'open' or 'internal'
  status, // 'upcoming', 'live', etc.
  applicationLink,
}) => {
  const { userBasicInfo } = useSelector((state) => state.auth);
  return (
    <div className="rounded-xl border border-gray-200 shadow-md p-5 w-full max-w-md bg-white hover:shadow-lg transition-all duration-300">
      {/* Event Name */}
      <h2 className="text-xl font-semibold text-gray-900 mb-1">{name}</h2>

      {/* Tagline */}
      <p className="text-gray-600 text-sm mb-4">{tagline}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            mode === "online"
              ? "bg-ired/10 text-ired"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {mode.toUpperCase()}
        </span>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
          {type.toUpperCase()}
        </span>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
          {status.toUpperCase()}
        </span>
      </div>

      {/* Button */}
      {userBasicInfo ? (
        <Link
          to={applicationLink}
          className="mt-5 inline-block bg-ired text-white text-sm font-medium py-2 px-4 rounded-md bg-red-500 transition hover:bg-red-600 duration-300"
        >
          Go to application
        </Link>
      ) : (
        <button
          disabled
          className="mt-5 inline-block bg-gray-300 text-white text-sm font-medium py-2 px-4 rounded-md cursor-not-allowed"
        >
          Go to application
        </button>
      )}
    </div>
  );
};

export default EventCard;
