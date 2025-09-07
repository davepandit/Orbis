import { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrash,
  FaUser,
  FaCrown,
  FaGavel,
  FaMicrophone,
} from "react-icons/fa";
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

  const handleRemovePerson = (index) => {
    if (people.length > 1) {
      setPeople((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error("At least one person must be added", { autoClose: 2000 });
    }
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

  const roleOptions = [
    {
      value: "event-admin",
      label: "Event Admin",
      icon: FaCrown,
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "judge",
      label: "Judge",
      icon: FaGavel,
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "speaker",
      label: "Speaker",
      icon: FaMicrophone,
      color: "bg-green-100 text-green-800",
    },
  ];

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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Event People Management
            </h1>
            <p className="text-gray-600">
              Add and manage event administrators, judges, and speakers
            </p>
          </div>

          <div className="space-y-6">
            {people.map((person, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 bg-gray-50"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaUser className="text-red-500" />
                    Person {index + 1}
                  </h3>
                  {people.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePerson(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="Enter username"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  {/* Role Selection */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Roles
                    </label>
                    <div className="space-y-3">
                      {roleOptions.map((role) => {
                        const IconComponent = role.icon;
                        return (
                          <label
                            key={role.value}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={person.roles.includes(role.value)}
                              onChange={() =>
                                handleRoleChange(index, role.value)
                              }
                              className="accent-red-500 w-4 h-4"
                            />
                            <div
                              className={`flex items-center gap-2 px-3 py-2 rounded-full ${role.color}`}
                            >
                              <IconComponent className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                {role.label}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Selected Roles Display */}
                {person.roles.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Selected roles:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {person.roles.map((role) => {
                        const roleOption = roleOptions.find(
                          (r) => r.value === role
                        );
                        const IconComponent = roleOption?.icon;
                        return (
                          <span
                            key={role}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${roleOption?.color}`}
                          >
                            {IconComponent && (
                              <IconComponent className="w-3 h-3" />
                            )}
                            {roleOption?.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleAddPerson}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              >
                <FaPlus /> Add Another Person
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventPeople;
