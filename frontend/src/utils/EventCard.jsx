"use client";

import React from "react";
import { FiLink, FiUsers } from "react-icons/fi";

const EventCard = ({
  title,
  subtitle,
  theme,
  participants,
  participantCount,
  status,
  onLinkClick,
  onGroupClick,
  onApplyClick,
  showLinkIcon = true,
  showGroupIcon = true,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-2xl hover:border-2 hover:border-red-500 hover:cursor-pointer p-6 max-w-xl w-full ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-1">{title}</h2>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
        <div className="flex gap-2">
          {showLinkIcon && (
            <button
              onClick={onLinkClick}
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer transition-colors"
            >
              <FiLink className="w-5 h-5 text-gray-600" />
            </button>
          )}
          {showGroupIcon && (
            <button
              onClick={onGroupClick}
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 hover:cursor-pointer transition-colors"
            >
              <FiUsers className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Theme Section */}
      <div className="mb-8">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
          THEME
        </p>
        <span className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
          {theme}
        </span>
      </div>

      {/* Participants Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {participants?.slice(0, 3)?.map((participant, index) => (
              <img
                key={participant.id}
                src={participant.avatar || "/placeholder.svg"}
                alt={participant.name}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                style={{ zIndex: 10 - index }}
              />
            ))}
          </div>
        </div>
        <div className="text-emerald-500 font-semibold text-sm">
          +{participantCount} participating
        </div>
      </div>

      {/* Status and Apply Section */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-medium">
            {status?.mode}
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-medium">
            {status?.registration}
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-medium">
            {status?.startDate}
          </span>
        </div>
        <button
          onClick={onApplyClick}
          className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-6 py-2 rounded-full font-medium transition-colors"
        >
          Apply now
        </button>
      </div>
    </div>
  );
};

const ExampleUsage = () => {
  

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <HackathonCard
        title="DeerHack 2025"
        subtitle="Hackathon"
        theme="NO RESTRICTIONS"
        participants={sampleParticipants}
        participantCount={1000}
        status={{
          mode: "OFFLINE",
          registration: "OPEN",
          startDate: "STARTS 11/07/25",
        }}
        onLinkClick={() => console.log("Link clicked")}
        onGroupClick={() => console.log("Group clicked")}
        onApplyClick={() => console.log("Apply clicked")}
      />
    </div>
  )
}

// export default ExampleUsage
export default EventCard;
