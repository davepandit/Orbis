import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const EventsTable = ({ events, onRemove, onEdit }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-500 text-white">
          <tr>
            <th className="px-6 py-3">Name of Event</th>
            <th className="px-6 py-3">Start Date</th>
            <th className="px-6 py-3">End Date</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Mode</th>
            <th className="px-6 py-3">Event Visibility</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {events?.map((event, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-800">
                {event.name}
              </td>
              <td className="px-6 py-4">{event.event_start}</td>
              <td className="px-6 py-4">{event.event_end}</td>
              <td className="px-6 py-4">{event.status}</td>
              <td className="px-6 py-4">{event.mode}</td>
              <td className="px-6 py-4">{event.event_visibilty}</td>
              <td className="px-6 py-4 space-x-9">
                <button
                  onClick={() => onRemove(event)}
                  className="text-red-500 hover:text-red-700 transition hover:cursor-pointer"
                  title="Remove User"
                >
                  <FaTrashAlt size={16} />
                </button>
                <button
                  onClick={() => onEdit(event)}
                  className="text-red-500 hover:text-red-700 transition hover:cursor-pointer"
                  title="Remove User"
                >
                  <FaEdit size={16} />
                </button>
              </td>
            </tr>
          ))}
          {events?.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-400">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
