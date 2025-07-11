import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetSpecificEventDetailsQuery } from "../slices/eventSlice";
import { useParams } from "react-router-dom";
import SpinnerAnimation from "../utils/Spinner";
import { useCreateTeamMutation } from "../slices/teamSlice";
import { useGetUserTeamForEventQuery } from "../slices/teamSlice";
import { useJoinTeamMutation } from "../slices/teamSlice";
import { toast } from "react-toastify";

const Apply = () => {
  const { eventId } = useParams();
  const [teamName, setTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [createdTeamId, setCreatedTeamId] = useState(null);
  const [creating, setCreating] = useState(false);

  const [joinTeam, { isLoading: jointeamLoading }] = useJoinTeamMutation();
  const {
    data,
    isLoading: userteamLoading,
    isSuccess,
  } = useGetUserTeamForEventQuery(eventId);
  const {
    data: event,
    isLoading: eventInfoLoading,
    refetch,
  } = useGetSpecificEventDetailsQuery(eventId);

  const [createTeam, { isLoading }] = useCreateTeamMutation();

  useEffect(() => {
    if (isSuccess && data) {
      setCreatedTeamId(data.team_id);
      setTeamName(data.name);
    }
  }, [data, isSuccess]);

  const handleCreate = async () => {
    if (!teamName.trim()) return alert("Team name is required!");

    setCreating(true);
    try {
      const res = await createTeam({ name: teamName, eventId }).unwrap();
      setCreatedTeamId(res.team_id);
      setTeamName("");
      toast.success(`${res.message}`, {
        autoClose: 2000,
      });
    } catch (error) {
      console.log("Error:", error);
      // toast.error(`${error.data.message}`, {
      //   autoClose: 2000,
      // });
    } finally {
      setCreating(false);
    }
  };

  const handleJoin = async () => {
    if (!inviteCode.trim()) return alert("Please enter a valid invite code!");
    try {
      const res = await joinTeam(inviteCode).unwrap();
      toast.success(res.message);
    } catch (err) {
      console.log("Erorr:", err);
      toast.error(err?.data?.message || "Failed to join team");
    }
  };

  if (eventInfoLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }

  if (userteamLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }
  if (jointeamLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }

  return (
    <>
      <div className="text-center mt-3 text-red-500 hover:cursor-pointer font-bold text-2xl mb-11">
        <Link to="/">Orbis</Link>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-6 border border-gray-200">
          <p className="text-xs font-bold text-red-500 mb-5">
            Note: Min team size: {event.min_team_size} and Max team size:{" "}
            {event.max_team_size}
          </p>
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Team Registration
          </h2>

          {/* Create Team Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Create a New Team
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter team name"
                className="border border-gray-300 p-2 rounded-md flex-1"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
              <button
                onClick={handleCreate}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-red-600 transition"
                disabled={creating}
              >
                {creating ? "Creating..." : "Create Team"}
              </button>
            </div>
            {createdTeamId && (
              <div className="mt-4 bg-gray-100 p-3 rounded-md text-sm text-gray-700 border border-gray-300">
                Team created! Share this invite code with your teammates:{" "}
                <span className="font-semibold text-red-500">
                  {createdTeamId}
                </span>
              </div>
            )}
          </div>

          {/* Join Team Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Join an Existing Team
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter invite code"
                className="border border-gray-300 p-2 rounded-md flex-1"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
              <button
                onClick={handleJoin}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-red-600 transition"
              >
                Join Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Apply;
