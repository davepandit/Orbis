import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEditEventTimelineMutation } from "../slices/eventSlice";
import { FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useGetEventTimelineQuery } from "../slices/eventSlice";
import SpinnerAnimation from "../utils/Spinner";

const EditEventTimeline = () => {
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const [applicationStart, setApplicationStart] = useState(null);
  const [applicationEnd, setApplicationEnd] = useState(null);
  const [rsvpDeadline, setRsvpDeadline] = useState(null);
  const [eventStart, setEventStart] = useState(null);
  const [eventEnd, setEventEnd] = useState(null);

  const { admin, eventId } = useParams();
  const [editEventTimeline, { isLoading }] = useEditEventTimelineMutation();
  const { data, isLoading: dataLoading } = useGetEventTimelineQuery(eventId);

  console.log("data:", data);
  const timeline = data?.timeline || {};

  useEffect(() => {
    if (timeline) {
      setTimezone(timeline.timezone || "Asia/Kolkata");
      setApplicationStart(
        timeline.application_start ? new Date(timeline.application_start) : null
      );
      setApplicationEnd(
        timeline.application_end ? new Date(timeline.application_end) : null
      );
      setRsvpDeadline(
        timeline.rsvp_deadline ? new Date(timeline.rsvp_deadline) : null
      );
      setEventStart(
        timeline.event_start ? new Date(timeline.event_start) : null
      );
      setEventEnd(timeline.event_end ? new Date(timeline.event_end) : null);
    }
  }, [timeline]);

  function DateInput({ label, selected, onChange }) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
          {label}
        </label>
        <div className="relative">
          <DatePicker
            selected={selected}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholderText={`Select ${label.toLowerCase()}`}
            dateFormat="dd/MM/yyyy"
          />
          {/* <FaCalendarAlt className="absolute right-0 top-3 text-gray-400 pointer-events-none" /> */}
        </div>
      </div>
    );
  }

  const handleEditTimeline = async () => {
    const data = {
      applicationStart: applicationStart,
      applicationEnd: applicationEnd,
      rsvpDeadline: rsvpDeadline,
      eventStart: eventStart,
      eventEnd: eventEnd,
    };

    try {
      const res = await editEventTimeline({ data, admin, eventId }).unwrap();
      toast.success(`${res.message}`, {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(`${error.data.message}`, {
        autoClose: 2000,
      });
    }
  };

  if (dataLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form className="space-y-6">
            {/* No Formal Education Checkbox */}

            {/* Degree Type */}
            {/* Timezone Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                Timezone
              </label>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Application Start */}
            <DateInput
              label="Application Start"
              selected={applicationStart}
              onChange={setApplicationStart}
            />

            {/* Application End */}
            <DateInput
              label="Application End"
              selected={applicationEnd}
              onChange={setApplicationEnd}
            />

            {/* RSVP Deadline */}
            <DateInput
              label="RSVP Deadline"
              selected={rsvpDeadline}
              onChange={setRsvpDeadline}
            />

            {/* Event Start */}
            <DateInput
              label="Event Start"
              selected={eventStart}
              onChange={setEventStart}
            />

            {/* Event End */}
            <DateInput
              label="Event End"
              selected={eventEnd}
              onChange={setEventEnd}
            />

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleEditTimeline}
                className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-8 py-2 rounded-md font-medium transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEventTimeline;
