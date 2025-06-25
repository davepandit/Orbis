import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserEducationCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EducationForm() {
  const dispactch = useDispatch();
  const { userEducationInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [instituteName, setInstituteName] = useState(
    userEducationInfo ? userEducationInfo.institution_name : ""
  );
  const [degree, setDegree] = useState(
    userEducationInfo ? userEducationInfo.degree : ""
  );
  const [fieldOfStudy, setFieldOfStudy] = useState(
    userEducationInfo ? userEducationInfo.field_of_study : ""
  );
  const [yearOfGraduation, setYearOfGraduation] = useState(
    userEducationInfo ? userEducationInfo.graduation_year : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = {
      institution_name: instituteName,
      degree: degree,
      field_of_study: fieldOfStudy,
      graduation_year: yearOfGraduation,
    };

    // save the details to redux store
    dispactch(setUserEducationCredentials({ ...res }));
    toast.success("User details saved successfully!!!", {
      autoClose: 2000,
    });

    // navigate to the next page
    navigate("/profile/experience");
  };

  const degreeTypes = [
    "High School",
    "Associate",
    "B.Tech",
    "M.Tech",
    "PhD",
    "Professional",
    "Other",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Education
            </h1>
            <p className="text-gray-600 leading-relaxed">
              The information you provide here helps us in performing analytics.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* No Formal Education Checkbox */}

            {/* Degree Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                Degree Type
              </label>
              <div className="relative">
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  {degreeTypes.map((degree) => (
                    <option key={degree} value={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Educational Institution */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                Educational Institution
              </label>
              <input
                type="text"
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your educational institution"
              />
            </div>

            {/* Currently Study Here Checkbox */}

            {/* Field of Study */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                Field of Study
              </label>
              <input
                type="text"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your field of study"
              />
            </div>

            {/* Expected Month of Graduation */}

            {/* Expected Year of Graduation */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                Expected Year of Graduation
              </label>
              <div className="relative">
                <select
                  value={yearOfGraduation}
                  onChange={(e) => setYearOfGraduation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-8 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Save And Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
