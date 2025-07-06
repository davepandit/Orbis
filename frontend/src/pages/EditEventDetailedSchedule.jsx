import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEditEventScheduleMutation } from "../slices/eventSlice";
import { toast } from "react-toastify";

const EditEventDetailedSchedule = () => {
  const { admin, eventId } = useParams();
  const [editEventSchedule, { isLoading }] = useEditEventScheduleMutation();

  const [days, setDays] = useState([
    {
      date: "",
      items: [
        {
          start_time: "",
          end_time: "",
          title: "",
          description: "",
        },
      ],
    },
  ]);

  const handleAddDay = () => {
    setDays((prev) => [
      ...prev,
      {
        date: "",
        items: [
          {
            start_time: "",
            end_time: "",
            title: "",
            description: "",
          },
        ],
      },
    ]);
  };

  const handleAddSchedule = (dayIndex) => {
    const updated = [...days];
    updated[dayIndex].items.push({
      start_time: "",
      end_time: "",
      title: "",
      description: "",
    });
    setDays(updated);
  };

  const handleChange = (dayIndex, field, value) => {
    const updated = [...days];
    updated[dayIndex][field] = value;
    setDays(updated);
  };

  const handleItemChange = (dayIndex, itemIndex, field, value) => {
    const updated = [...days];
    updated[dayIndex].items[itemIndex][field] = value;
    setDays(updated);
  };

  const handleSave = async () => {
    console.log("Days:", days);

    try {
      const res = await editEventSchedule({ days, admin, eventId }).unwrap();

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
          <div className="space-y-8">
            {days.map((day, dayIndex) => (
              <div key={dayIndex} className="space-y-4 p-4">
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Date
                  </label>
                  <input
                    type="date"
                    value={day.date}
                    onChange={(e) =>
                      handleChange(dayIndex, "date", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Schedule Items */}
                {day.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Start Time
                      </label>
                      <input
                        type="text"
                        value={item.start_time}
                        onChange={(e) =>
                          handleItemChange(
                            dayIndex,
                            itemIndex,
                            "start_time",
                            e.target.value
                          )
                        }
                        placeholder="e.g. 08:00 AM"
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                        End Time
                      </label>
                      <input
                        type="text"
                        value={item.end_time}
                        onChange={(e) =>
                          handleItemChange(
                            dayIndex,
                            itemIndex,
                            "end_time",
                            e.target.value
                          )
                        }
                        placeholder="e.g. 10:00 AM"
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    <div className="col-span-2 space-y-2">
                      <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          handleItemChange(
                            dayIndex,
                            itemIndex,
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    <div className="col-span-2 space-y-2">
                      <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Description
                      </label>
                      <textarea
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(
                            dayIndex,
                            itemIndex,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      ></textarea>
                    </div>
                  </div>
                ))}

                {/* Add more schedules */}
                <button
                  type="button"
                  onClick={() => handleAddSchedule(dayIndex)}
                  className="flex items-center gap-2 text-sm text-red-600 hover:cursor-pointer mt-2"
                >
                  <FaPlus /> Add Schedule
                </button>
              </div>
            ))}

            {/* Add Another Day */}
            <button
              type="button"
              onClick={handleAddDay}
              className="flex items-center gap-2 text-sm text-red-600 hover:cursor-pointer"
            >
              <FaPlus /> Add Another Day
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-8 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventDetailedSchedule;
