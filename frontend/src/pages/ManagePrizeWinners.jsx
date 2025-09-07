import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetEligibleTeamsQuery,
  useMarkPrizeWinnerMutation,
  useRemovePrizeWinnerMutation,
  useGetPrizeWinnersQuery,
} from "../slices/eventSlice";
import SpinnerAnimation from "../utils/Spinner";
import { FaTrophy, FaCrown, FaMedal, FaTimes } from "react-icons/fa";

const ManagePrizeWinners = () => {
  const { admin, eventId } = useParams();
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [notes, setNotes] = useState("");

  const {
    data: eligibleTeamsData,
    isLoading: teamsLoading,
    refetch: refetchTeams,
  } = useGetEligibleTeamsQuery({ admin, eventId });

  const {
    data: winnersData,
    isLoading: winnersLoading,
    refetch: refetchWinners,
  } = useGetPrizeWinnersQuery(eventId);

  const [markPrizeWinner, { isLoading: markingWinner }] =
    useMarkPrizeWinnerMutation();
  const [removePrizeWinner, { isLoading: removingWinner }] =
    useRemovePrizeWinnerMutation();

  const positionOptions = [
    {
      value: "first",
      label: "First Place",
      icon: FaCrown,
      color: "text-yellow-600",
    },
    {
      value: "second",
      label: "Second Place",
      icon: FaMedal,
      color: "text-gray-600",
    },
    {
      value: "third",
      label: "Third Place",
      icon: FaTrophy,
      color: "text-orange-600",
    },
  ];

  const handleMarkWinner = async () => {
    if (!selectedTeam || !selectedPosition) {
      toast.error("Please select a team and position", { autoClose: 2000 });
      return;
    }

    try {
      const res = await markPrizeWinner({
        admin,
        eventId,
        team_id: selectedTeam,
        position: selectedPosition,
        notes: notes.trim(),
      }).unwrap();

      toast.success(res.message, { autoClose: 2000 });
      setSelectedTeam("");
      setSelectedPosition("");
      setNotes("");
      refetchTeams();
      refetchWinners();
    } catch (error) {
      toast.error(error.data?.message || "Failed to mark prize winner", {
        autoClose: 2000,
      });
    }
  };

  const handleRemoveWinner = async (winnerId) => {
    if (window.confirm("Are you sure you want to remove this prize winner?")) {
      try {
        const res = await removePrizeWinner({
          admin,
          eventId,
          winnerId,
        }).unwrap();

        toast.success(res.message, { autoClose: 2000 });
        refetchTeams();
        refetchWinners();
      } catch (error) {
        toast.error(error.data?.message || "Failed to remove prize winner", {
          autoClose: 2000,
        });
      }
    }
  };

  if (teamsLoading || winnersLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }

  const eligibleTeams = eligibleTeamsData?.teams || [];
  const winners = winnersData?.winners || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🏆 Prize Winners Management
            </h1>
            <p className="text-gray-600">
              Mark teams as prize winners for this event
            </p>
          </div>

          {/* Current Winners Section */}
          {winners.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Current Prize Winners
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {winners.map((winner) => {
                  const positionOption = positionOptions.find(
                    (p) => p.value === winner.position
                  );
                  const IconComponent = positionOption?.icon;

                  return (
                    <div
                      key={winner._id}
                      className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-yellow-50 to-orange-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {IconComponent && (
                            <IconComponent
                              className={`w-5 h-5 ${positionOption.color}`}
                            />
                          )}
                          <span className="font-semibold text-gray-800 capitalize">
                            {winner.position} Place
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveWinner(winner._id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          disabled={removingWinner}
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">
                        {winner.team.name}
                      </h3>
                      {winner.team.description && (
                        <p className="text-gray-600 text-sm mb-2">
                          {winner.team.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Awarded by: {winner.awarded_by}
                      </p>
                      {winner.notes && (
                        <p className="text-xs text-gray-600 mt-1 italic">
                          "{winner.notes}"
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mark New Winner Section */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Mark New Prize Winner
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Team Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Select Team
                </label>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">-- Select a team --</option>
                  {eligibleTeams.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.name} ({team.member_count} members)
                    </option>
                  ))}
                </select>
                {eligibleTeams.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No eligible teams available (all teams may have already won
                    prizes)
                  </p>
                )}
              </div>

              {/* Position Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Prize Position
                </label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">-- Select position --</option>
                  {positionOptions.map((position) => {
                    const IconComponent = position.icon;
                    const isAlreadyAwarded = winners.some(
                      (winner) => winner.position === position.value
                    );

                    return (
                      <option
                        key={position.value}
                        value={position.value}
                        disabled={isAlreadyAwarded}
                      >
                        {isAlreadyAwarded ? "✓ " : ""}
                        {position.label}
                        {isAlreadyAwarded ? " (Already Awarded)" : ""}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about this award..."
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                onClick={handleMarkWinner}
                disabled={!selectedTeam || !selectedPosition || markingWinner}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {markingWinner ? "Marking Winner..." : "Mark as Prize Winner"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePrizeWinners;
