import { useState } from "react";

export default function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("this is a form");
    console.log("first name:", firstName);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Basic Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Basic information
            </h2>

            <div className="space-y-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Identity */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  I Identify As
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Phone number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* State  */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* City */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* About You Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              About you
            </h2>

            <div className="space-y-6">
              {/* Bio */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Bio
                </label>
                <textarea
                  placeholder="Add a bio..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                />
              </div>

              {/* README.MD */}

              {/* File Upload Area */}
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-8 py-2 rounded-md font-medium transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
