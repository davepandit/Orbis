import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserSkills } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SkillsForm() {
  const dispatch = useDispatch();
  const { userSkills } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [skills, setSkills] = useState(userSkills ? userSkills : []);

  const [newSkill, setNewSkill] = useState("");
  const [newProficiency, setNewProficiency] = useState("");

  const proficiencyLevels = [
    { value: "Beginner", label: "Beginner", color: "bg-red-200", width: "25%" },
    {
      value: "Intermediate",
      label: "Intermediate",
      color: "bg-red-400",
      width: "50%",
    },
    { value: "Advanced", label: "Advanced", color: "bg-red-500", width: "75%" },
    { value: "Expert", label: "Expert", color: "bg-red-600", width: "100%" },
  ];

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      const skill = {
        id: Date.now(),
        skill: newSkill.trim(),
        proficiency: newProficiency,
      };
      setSkills([...skills, skill]);
      setNewSkill("");
      setNewProficiency("");

      // NOTE - Here if i try to print the skills(array of objects) then i will get the stale copy of that because react state updates are asynchronous and react batches updates, so immediately the skills is not updated
      // console.log("Skills:", skills);
    }
  };

  const removeSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const getProficiencyConfig = (proficiency) => {
    return proficiencyLevels.find((level) => level.value === proficiency);
  };

  const handleSaveSkills = async (e) => {
    console.log("All skills:", skills);
    // save to the redux store
    dispatch(setUserSkills([...skills]));

    toast.success("User details saved successfully!!!", {
      autoClose: 2000,
    });
    // navigate to the next page
    navigate("/profile/links");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Skills & Proficiency
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Add your skills and rate your proficiency level to help us
              understand your expertise.
            </p>
          </div>

          {/* Add New Skill Form */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Add New Skill
            </h3>
            <form
              onSubmit={addSkill}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter skill name (e.g., Python, Design, Marketing)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="sm:w-48">
                <select
                  value={newProficiency}
                  onChange={(e) => setNewProficiency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                >
                  <option value="" disabled>
                    -- Select Proficiency --
                  </option>
                  {proficiencyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Add Skill
              </button>
            </form>
          </div>

          {/* Skills List */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Your Skills ({skills.length})
            </h3>

            {skills.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">🎯</div>
                <p>No skills added yet. Add your first skill above!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => {
                  const proficiencyConfig = getProficiencyConfig(
                    skill.proficiency
                  );
                  return (
                    <div
                      key={skill.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-800 text-lg">
                          {skill.skill}
                        </h4>
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="text-gray-400 hover:text-red-500 hover:cursor-pointer transition-colors p-1"
                          title="Remove skill"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">
                            {skill.proficiency}
                          </span>
                          <span className="text-xs text-gray-500">
                            {proficiencyConfig?.width}
                          </span>
                        </div>

                        {/* Proficiency Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${proficiencyConfig?.color}`}
                            style={{ width: proficiencyConfig?.width }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Summary */}
          {skills.length > 0 && (
            <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
              <h3 className="text-lg font-medium text-red-800 mb-3">
                Skills Summary
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {proficiencyLevels.map((level) => {
                  const count = skills.filter(
                    (skill) => skill.proficiency === level.value
                  ).length;
                  return (
                    <div key={level.value} className="space-y-1">
                      <div
                        className={`w-8 h-8 ${level.color} rounded-full mx-auto flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {count}
                      </div>
                      <p className="text-sm text-red-700">{level.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="px-8 py-3 bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={handleSaveSkills}
            >
              Save Skills
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
