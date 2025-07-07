import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useEditEventPeopleMutation } from "../slices/eventSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useGetEventPeopleQuery } from "../slices/eventSlice";
import SpinnerAnimation from "../utils/Spinner";

const EditEventPeople = () => {
  const { admin, eventId } = useParams();
  const [editEventPeople] = useEditEventPeopleMutation();
  const { data: peopleData, isLoading } = useGetEventPeopleQuery(eventId);
  const [people, setPeople] = useState([
    {
      username: "",
      roles: [],
    },
  ]);

  useEffect(() => {
    if (peopleData?.people) {
      setPeople(peopleData.people); // people = useState([...])
    }
  }, [peopleData]);

  const handleAddPerson = () => {
    setPeople((prev) => [...prev, { username: "", roles: [] }]);
  };

  const handleUsernameChange = (index, value) => {
    const updated = [...people];
    updated[index].username = value;
    setPeople(updated);
  };

  const handleRoleChange = (index, value) => {
    const updated = [...people];
    if (updated[index].roles.includes(value)) {
      updated[index].roles = updated[index].roles.filter((r) => r !== value);
    } else {
      updated[index].roles.push(value);
    }
    setPeople(updated);
  };

  const roleOptions = ["event-admin", "judge", "speaker"];

  const handleSave = async () => {
    console.log("People data:", people);
    try {
      const res = await editEventPeople({ people, admin, eventId }).unwrap();
      toast.success(`${res.message}`, {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(`${error.data.message}`, {
        autoClose: 2000,
      });
    }
  };

  if (isLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-8">
            {people.map((person, index) => (
              <div key={index} className="space-y-4  p-4">
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Username
                  </label>
                  <input
                    type="text"
                    value={person.username}
                    onChange={(e) =>
                      handleUsernameChange(index, e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Roles
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {roleOptions.map((role) => (
                      <label key={role} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={person.roles.includes(role)}
                          onChange={() => handleRoleChange(index, role)}
                          className="accent-red-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {role}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddPerson}
              className="flex items-center gap-2 text-sm text-red-600 hover:cursor-pointer"
            >
              <FaPlus /> Add Person
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

export default EditEventPeople;
