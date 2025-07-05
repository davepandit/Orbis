import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfileCredentials } from "../slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SpinnerAnimation from "../utils/Spinner";
import { useGetClubInfoQuery } from "../slices/clubSlice";
import AsyncSelect from "react-select/async";
import { useGetSpecificEventDetailsQuery } from "../slices/eventSlice";
import { useEditBasicEventInfoMutation } from "../slices/eventSlice";
import _ from "lodash";

const EditBasicEventInfo = () => {
  const dispatch = useDispatch();
  const { eventId, admin } = useParams();
  const { userProfileInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data: clubInfo, isLoading: clubInfoLoading } = useGetClubInfoQuery();
  const {
    data: eventInfo,
    isLoading: eventInfoLoading,
    refetch,
  } = useGetSpecificEventDetailsQuery(eventId);
  const [editBasicEventInfo, { isLoading: editBasicInfoLoading }] =
    useEditBasicEventInfoMutation();

  const [name, setName] = useState("");
  const [mode, setMode] = useState("");
  const [tagline, setTagline] = useState("");
  const [about, setAbout] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(100);
  const [minTeamsize, setMinTeamSize] = useState(2);
  const [maxTeamsize, setMaxTeamSize] = useState(5);
  const [organisedBy, setOrganisedBy] = useState([]);
  const [eventVisibility, setEventVisibility] = useState("");

  useEffect(() => {
    if (eventInfo) {
      setName(eventInfo.name || "");
      setMode(eventInfo.mode || "");
      setTagline(eventInfo.tagline || "");
      setAbout(eventInfo.about || "");
      setMaxParticipants(eventInfo.max_participants || 100);
      setMinTeamSize(eventInfo.min_team_size || 2);
      setMaxTeamSize(eventInfo.max_team_size || 5);
      setOrganisedBy(eventInfo.organised_by || []);
      setEventVisibility(eventInfo.event_visibility || "");
    }
  }, [eventInfo]);

  // load club options from backend
  const loadOptions = async (inputValue, callback) => {
    try {
      // backend returns [{ _id, name }]
      const options = clubInfo.clubs.map((club) => ({
        value: club._id,
        label: club.name,
      }));
      callback(options);
    } catch (err) {
      console.error("Failed to load clubs", err);
      callback([]);
    }
  };

  const handleChange = (selectedOptions) => {
    setOrganisedBy(selectedOptions || []);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: "1px solid",
      borderColor: state.isFocused ? "#ef4444" : "#e5e7eb", // red-500 or gray-200
      boxShadow: state.isFocused ? "0 0 0 2px rgba(239, 68, 68, 0.5)" : "none", // red focus ring
      padding: "0.5rem 0.75rem", // py-2 px-3
      borderRadius: "0.375rem", // rounded-md
      outline: "none",
      "&:hover": {
        borderColor: "#ef4444", // match hover to focus
      },
    }),
  };

  if (eventInfoLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }

  const handleEditBasicEventInfo = async () => {
    const data = {
      name: name,
      mode: mode,
      tagline: tagline,
      about: about,
      max_participants: maxParticipants,
      min_team_size: minTeamsize,
      max_team_size: maxTeamsize,
      organised_by: organisedBy,
      event_visibility: eventVisibility,
    };
    try {
      const res = await editBasicEventInfo({ data, admin, eventId }).unwrap();

      toast.success(`${res.message}`, {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(`${error.data.message}`, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Name of event
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Mode of the event */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Mode
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                >
                  <option value="" disabled>
                    -- Select Mode --
                  </option>
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                </select>
              </div>

              {/* Tagline */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Tagline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* About */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  About
                </label>
                <textarea
                  placeholder="Add about the event"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                />
              </div>

              {/* Max participants  */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Max participants
                </label>
                <input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* About You Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-6">
              {/* Min team size */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Min Team size
                </label>
                <input
                  type="number"
                  value={minTeamsize}
                  onChange={(e) => setMinTeamSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Max team size */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Max Team size
                </label>
                <input
                  type="number"
                  value={maxTeamsize}
                  onChange={(e) => setMaxTeamSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Organised by */}
              {clubInfoLoading ? (
                <SpinnerAnimation size="xl" color="failure" />
              ) : (
                <div className="max-w-md w-full space-y-2">
                  <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Organised By
                  </label>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                    isMulti
                    onChange={handleChange}
                    value={organisedBy}
                    placeholder="Search and select clubs..."
                    className="text-sm"
                    styles={customStyles}
                  />
                </div>
              )}

              {/* Event visibility */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Event visibility
                </label>
                <select
                  value={eventVisibility}
                  onChange={(e) => setEventVisibility(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                >
                  <option value="" disabled>
                    -- Select visibilty --
                  </option>
                  <option value="internal">Internal</option>
                  <option value="open to all">Open to all</option>
                </select>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleEditBasicEventInfo}
              className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-8 py-2 rounded-md font-medium transition-colors"
            >
              Save And Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBasicEventInfo;
