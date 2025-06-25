import { useState } from "react"

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "Debajyoti",
    lastName: "Pandit",
    identity: "Male",
    tshirtSize: "L",
    dietaryPreference: "Non-Vegetarian",
    allergies: "Eggs, nuts, dairy products",
    bio: "",
    readme: "Hhh",
  })

  const [activeTab, setActiveTab] = useState("write")

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Basic information</h2>

            <div className="space-y-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Identity */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">I Identify As</label>
                <select
                  value={formData.identity}
                  onChange={(e) => handleInputChange("identity", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* T-shirt Size */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">T-shirt Size</label>
                <select
                  value={formData.tshirtSize}
                  onChange={(e) => handleInputChange("tshirtSize", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
                <button type="button" className="text-red-500 text-sm hover:underline">
                  Size chart - find your right fit
                </button>
              </div>

              {/* Dietary Preferences */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Dietary Preferences
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center space-x-2 border border-gray-200 rounded-md p-3 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="dietaryPreference"
                      value="Jain"
                      checked={formData.dietaryPreference === "Jain"}
                      onChange={(e) => handleInputChange("dietaryPreference", e.target.value)}
                      className="text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm">Jain</span>
                  </label>
                  <label className="flex items-center space-x-2 border border-gray-200 rounded-md p-3 cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="dietaryPreference"
                      value="Vegetarian"
                      checked={formData.dietaryPreference === "Vegetarian"}
                      onChange={(e) => handleInputChange("dietaryPreference", e.target.value)}
                      className="text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm">Vegetarian</span>
                  </label>
                  <label className="flex items-center space-x-2 border border-gray-200 rounded-md p-3 cursor-pointer hover:bg-gray-50 sm:col-span-2">
                    <input
                      type="radio"
                      name="dietaryPreference"
                      value="Non-Vegetarian"
                      checked={formData.dietaryPreference === "Non-Vegetarian"}
                      onChange={(e) => handleInputChange("dietaryPreference", e.target.value)}
                      className="text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm">Non-Vegetarian</span>
                  </label>
                </div>
              </div>

              {/* Allergies */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">Allergies</label>
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* About You Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">About you</h2>

            <div className="space-y-6">
              {/* Bio */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">Bio</label>
                <textarea
                  placeholder="Add a bio..."
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                />
              </div>

              {/* README.MD */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">README.MD</label>
                <div className="border border-gray-200 rounded-md">
                  <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setActiveTab("write")}
                        className={`text-sm px-3 py-1 font-medium ${
                          activeTab === "write"
                            ? "text-red-500 border-b-2 border-red-500"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        WRITE
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("preview")}
                        className={`text-sm px-3 py-1 font-medium ${
                          activeTab === "preview"
                            ? "text-red-500 border-b-2 border-red-500"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        PREVIEW
                      </button>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600">
                        <span className="text-sm font-bold">H</span>
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600">
                        <span className="text-sm font-bold">B</span>
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600">
                        <span className="text-sm italic">I</span>
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600">
                        <span className="text-sm">•</span>
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600">
                        <span className="text-sm">1.</span>
                      </button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-gray-600">
                        <span className="text-sm">🔗</span>
                      </button>
                    </div>
                  </div>
                  {activeTab === "write" ? (
                    <textarea
                      value={formData.readme}
                      onChange={(e) => handleInputChange("readme", e.target.value)}
                      rows={8}
                      className="w-full p-3 border-0 focus:outline-none resize-none"
                      placeholder="Write your README content here..."
                    />
                  ) : (
                    <div className="p-3 min-h-[200px] text-sm">{formData.readme || "Nothing to preview"}</div>
                  )}
                </div>
              </div>

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center hover:border-red-500 transition-colors cursor-pointer">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Attach files by dragging & dropping, selecting or pasting them</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-md font-medium transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
