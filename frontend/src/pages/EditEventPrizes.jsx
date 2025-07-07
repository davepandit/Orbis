import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useEditEventPrizesMutation } from "../slices/eventSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetEventPrizesQuery } from "../slices/eventSlice";

const EditEventPrizes = () => {
  const { admin, eventId } = useParams();
  const [editEventPrizes] = useEditEventPrizesMutation();
  const { data: prizeData, isLoading } = useGetEventPrizesQuery(eventId);
  const [prizes, setPrizes] = useState([{ position: "", prize_value: "" }]);

  useEffect(() => {
    if (prizeData && !isLoading) {
      setPrizes(prizeData); 
    }
  }, [prizeData, isLoading]);

  const handlePrizeChange = (index, field, value) => {
    const updatedPrizes = [...prizes];
    updatedPrizes[index][field] = value;
    setPrizes(updatedPrizes);
  };

  const addPrize = () => {
    setPrizes([...prizes, { position: "", prize_value: "" }]);
  };

  const removePrize = (index) => {
    const updatedPrizes = prizes.filter((_, i) => i !== index);
    setPrizes(updatedPrizes);
  };

  const handleSave = async () => {
    console.log("Prizes:", prizes);
    try {
      const res = await editEventPrizes({ prizes, admin, eventId }).unwrap();
      toast.success(`${res.message}`, {
        autoClose: 2000,
      });
    } catch (error) {
      console.log("Error:", error);
      toast.error(`${error.data.message}`, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            <h2 className="text-xl text-center font-semibold text-gray-800">
              Event Prizes
            </h2>

            {prizes.map((prize, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end p-4"
              >
                {/* Position Selector */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Position
                  </label>
                  <select
                    value={prize.position}
                    onChange={(e) =>
                      handlePrizeChange(index, "position", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="" disabled>
                      -- Select Position --
                    </option>
                    <option value="first">First</option>
                    <option value="second">Second</option>
                    <option value="third">Third</option>
                  </select>
                </div>

                {/* Prize Value */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Prize
                  </label>
                  <input
                    type="text"
                    value={prize.prize_value}
                    onChange={(e) =>
                      handlePrizeChange(index, "prize_value", e.target.value)
                    }
                    placeholder="e.g. ₹50,000 or Swag Kit"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Remove Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => removePrize(index)}
                    className="text-red-600 hover:text-red-800 hover:cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center">
              <button
                onClick={addPrize}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 hover:cursor-pointer"
              >
                + Add Prize
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-8 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Save And Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventPrizes;
